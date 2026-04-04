/* ============================================================
   CHLOE WADE PORTFOLIO — CHAT WIDGET LOGIC
   ============================================================
   Frontend chat widget that sends messages to the /api/chat
   serverless endpoint. No API key required on the client side.
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
    <div class="pop-msg assistant">Hi, I'm Chloe's AI assistant. Ask me anything about her experience, skills, or background!</div>
  </div>
  <div class="chat-popup-footer">
    <div style="display:flex; gap:0.5rem;">
      <input type="text" id="popInput" placeholder="Ask about Chloe's experience..." 
             style="flex:1; border:1px solid var(--border); border-radius:20px; padding:0.6rem 1rem; font-size:0.85rem; outline:none;">
      <button id="popSend" style="background:var(--accent); border:none; border-radius:50%; width:36px; height:36px; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1rem; transition: opacity 0.2s;">➔</button>
    </div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', CHAT_WIDGET_HTML);

const popTrigger = document.getElementById('chatTrigger');
const popPopup   = document.getElementById('chatPopup');
const popClose   = document.getElementById('chatClose');
const popBody    = document.getElementById('chatPopBody');
const popInput   = document.getElementById('popInput');
const popSend    = document.getElementById('popSend');

let isSending = false;

popTrigger.addEventListener('click', () => popPopup.classList.toggle('active'));
popClose.addEventListener('click', () => popPopup.classList.remove('active'));

function setInputEnabled(enabled) {
  popInput.disabled = !enabled;
  popSend.disabled = !enabled;
  popSend.style.opacity = enabled ? '1' : '0.5';
}

async function sendPopMsg() {
  const text = popInput.value.trim();
  if (!text || isSending) return;

  isSending = true;
  setInputEnabled(false);
  popInput.value = '';
  
  // Render user message
  const uMsg = document.createElement('div');
  uMsg.className = 'pop-msg user';
  uMsg.textContent = text;
  popBody.appendChild(uMsg);
  popBody.scrollTop = popBody.scrollHeight;

  // Show typing indicator
  const tMsg = document.createElement('div');
  tMsg.className = 'pop-msg assistant';
  tMsg.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
  popBody.appendChild(tMsg);
  popBody.scrollTop = popBody.scrollHeight;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    if (!response.ok) {
      tMsg.textContent = data.error || 'Something went wrong. Please try again.';
    } else {
      tMsg.textContent = data.reply;
    }
  } catch (err) {
    tMsg.textContent = 'Unable to connect. Please try again later.';
  } finally {
    isSending = false;
    setInputEnabled(true);
    popInput.focus();
    popBody.scrollTop = popBody.scrollHeight;
  }
}

popSend.addEventListener('click', sendPopMsg);
popInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendPopMsg();
});

/* ── Typing dots animation (injected via CSS) ──────────────── */
const typingStyle = document.createElement('style');
typingStyle.textContent = `
  .typing-dots {
    display: inline-flex;
    gap: 2px;
  }
  .typing-dots span {
    animation: typingBounce 1.4s infinite ease-in-out;
    font-size: 1.4rem;
    line-height: 1;
    color: var(--text-muted);
  }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-6px); opacity: 1; }
  }
`;
document.head.appendChild(typingStyle);
