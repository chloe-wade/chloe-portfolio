/* ============================================================
   CHLOE WADE PORTFOLIO — CHAT API ROUTE (Vercel Serverless)
   ============================================================
   This serverless function proxies chat requests to Anthropic's
   Claude API. The API key is read from environment variables
   and never exposed to the client.
   ============================================================ */

const SYSTEM_PROMPT = `You are Chloe Wade's personal portfolio AI assistant. Your job is to answer questions about Chloe in a warm, confident, and professional tone. Use only the information below. If asked something not covered, recommend reaching out to Chloe directly via the contact page.

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
CONTACT: Visit the contact page or connect on LinkedIn.`;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers for same-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Please add ANTHROPIC_API_KEY to your Vercel environment variables.' });
  }

  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // Rate-limit: cap message length
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long. Please keep it under 1000 characters.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message.trim() }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', response.status, errorData);
      return res.status(502).json({ error: 'AI service temporarily unavailable. Please try again.' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'I wasn\'t able to generate a response. Please try again.';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
