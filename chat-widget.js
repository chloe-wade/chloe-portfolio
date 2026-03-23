/* ============================================================
   CHLOE WADE PORTFOLIO — CHAT WIDGET LOGIC
   ============================================================ */

const CHAT_WIDGET_HTML = `
<div class="chat-widget-trigger" id="chatTrigger">
  <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
</div>
<div class="chat-popup" id="chatPopup">
  <div class="chat-popup-header">
    <span style="font-weight:700; font-family:var(--serif);">Ask Chloe</span>
    <span class="chat-popup-close" id="chatClose">✕</span>
  </div>
  <div class="chat-popup-body" id="chatPopBody">
    <div class="pop-msg assistant">Hi, I'm Chloe's AI assistant. Ask me anything about her experience or skills.</div>
    <div style="font-size:0.75rem; color:var(--text-subtle); margin-top:0.5rem; text-align:center;">
      Note: This requires an Anthropic API Key.
    </div>
    <input type="password" id="popApiKey" placeholder="sk-ant-..." 
           style="width:100%; border:1px solid var(--border); border-radius:8px; padding:0.5rem; font-size:0.8rem; margin-top:0.5rem;">
  </div>
  <div class="chat-popup-footer">
    <div style="display:flex; gap:0.5rem;">
      <input type="text" id="popInput" placeholder="Tape your question..." 
             style="flex:1; border:1px solid var(--border); border-radius:20px; padding:0.6rem 1rem; font-size:0.85rem; outline:none;">
      <button id="popSend" style="background:var(--accent); border:none; border-radius:50%; width:36px; height:36px; color:#fff; cursor:pointer;">➔</button>
    </div>
  </div>
</div>
`;

const SYSTEM_PROMPT = `You are Chloe Wade's personal portfolio AI assistant. Your job is to answer questions about Chloe in a warm, confident, and professional tone. Use only the information below. If asked something not covered, recommend reaching out to Chloe directly at chloevwade@gmail.com.

ABOUT CHLOE:
- Marketing strategist blending creative design with data analytics
- MSc in Digital Marketing & Analytics, TBS Education, Barcelona (May 2026)
- BFA in Fashion Design (Honors), Parsons School of Design (2023)
- Based in New York City

KEY ACHIEVEMENTS:
- Increased ROAS by 20% via Google Ads optimization at Meg by Meghan Kinney
- Delivered 98% on-time product launch rate at H.I.S International
- Managed 40+ team members at Target
- Built WIP dashboards and data tracking tools that improved cross-team visibility

SKILLS:
- Analytical: Google Analytics, SQL, Python, Tableau, Power BI, Looker Studio, HubSpot, SEMRush, A/B Testing, KPI Frameworks, Marketing Funnel Analysis
- Creative: Adobe Creative Suite, Canva, Email Marketing, Brand Strategy, Content, UX-Informed Design, Social Media, Visual Storytelling

CERTIFICATIONS: HubSpot Marketing Hub, Google Analytics, Google Ads Search & Display, SQL for Data Science, Data Visualization (Excel & IBM Cognos)

EXPERIENCE:
- H.I.S International: Associate Product Development Manager (2023–2024)
- Meg by Meghan Kinney: Marketing & E-Commerce Manager / Assistant Designer (2021–2023)
- Proenza Schouler: Design Intern (2022)
- Target: Customer Service & Cash Office Manager (2016–2021)

LANGUAGES: English (Native), Spanish (B1)
CONTACT: chloevwade@gmail.com | New York City`;

document.body.insertAdjacentHTML('beforeend', CHAT_WIDGET_HTML);

const popTrigger = document.getElementById('chatTrigger');
const popPopup   = document.getElementById('chatPopup');
const popClose   = document.getElementById('chatClose');
const popBody    = document.getElementById('chatPopBody');
const popInput   = document.getElementById('popInput');
const popSend    = document.getElementById('popSend');
const popApiKey  = document.getElementById('popApiKey');

let isSending = false;

popTrigger.addEventListener('click', () => popPopup.classList.toggle('active'));
popClose.addEventListener('click', () => popPopup.classList.remove('active'));

async function sendPopMsg() {
  const text = popInput.value.trim();
  const apiKey = popApiKey.value.trim();
  if (!text || !apiKey || isSending) return;

  isSending = true;
  popInput.value = '';
  
  // Render user message
  const uMsg = document.createElement('div');
  uMsg.className = 'pop-msg user';
  uMsg.textContent = text;
  popBody.appendChild(uMsg);
  popBody.scrollTop = popBody.scrollHeight;

  // Show typing
  const tMsg = document.createElement('div');
  tMsg.className = 'pop-msg assistant';
  tMsg.textContent = '...';
  popBody.appendChild(tMsg);
  popBody.scrollTop = popBody.scrollHeight;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'messages-2023-12-15'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: text }]
      })
    });

    const data = await response.json();
    tMsg.textContent = data.content?.[0]?.text || 'I encountered an error.';
  } catch (err) {
    tMsg.textContent = 'Error connecting to the AI. Please check your API key.';
  } finally {
    isSending = false;
    popBody.scrollTop = popBody.scrollHeight;
  }
}

popSend.addEventListener('click', sendPopMsg);
popInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendPopMsg();
});
