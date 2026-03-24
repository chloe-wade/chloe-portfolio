const fs = require('fs');
const fp = '/Users/chloewade/.gemini/antigravity/scratch/projects.html';
let content = fs.readFileSync(fp, 'utf8');

const project1CSS = `
    /* Project 1 Layout */
    .proj-section {
      position: relative;
      padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem);
      max-width: 1400px;
      margin: 0 auto;
      z-index: 1;
    }
    .watermark-number {
      position: absolute;
      top: 0; left: 0;
      font-family: var(--serif);
      font-size: clamp(120px, 15vw, 160px);
      font-weight: 300;
      color: var(--accent);
      opacity: 0.07;
      z-index: -1;
      pointer-events: none;
      line-height: 0.8;
      user-select: none;
    }
    .proj-header { margin-bottom: 4rem; position: relative; z-index: 1; }
    .tag-row {
      display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;
    }
    .pill-tag {
      font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.04em; background: var(--bg-card);
      border: 1px solid rgba(0,0,0,0.06); padding: 0.3rem 0.8rem;
      border-radius: 999px; color: var(--text-muted);
    }
    .proj-header h2 { font-size: clamp(2rem, 4vw, 3.5rem); margin: 0; max-width: 800px; }
    
    .proj-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(4rem, 8vw, 8rem);
      align-items: start;
    }
    @media (max-width: 900px) { .proj-grid { grid-template-columns: 1fr; } }
    
    .pull-quote {
      border-left: 4px solid var(--accent);
      background: var(--bg-card);
      padding: 1.5rem 2rem;
      font-size: 1.15rem;
      color: var(--text);
      line-height: 1.7;
    }

    .outcome-block {
      position: relative;
      margin-top: 5rem;
      padding: 3rem 0;
      text-align: center;
    }
    .outcome-quote-mark {
      position: absolute;
      top: -2rem; left: 50%; transform: translateX(-50%);
      font-family: var(--serif);
      font-size: 100px;
      color: var(--accent);
      opacity: 0.15;
      line-height: 1;
    }
    .outcome-block p {
      font-family: var(--serif);
      font-size: 1.6rem;
      font-weight: 400;
      color: var(--black);
      line-height: 1.5;
      position: relative;
      z-index: 1;
    }

    /* Vertical Timeline */
    .timeline {
      position: relative;
      padding-left: 2.5rem;
    }
    .timeline::before {
      content: ''; position: absolute;
      left: 15px; top: 0; bottom: 0;
      width: 2px;
      background: rgba(219, 39, 99, 0.2);
    }
    .time-step {
      position: relative;
      margin-bottom: 2.5rem;
    }
    .time-step:last-child { margin-bottom: 0; }
    .step-cir {
      position: absolute;
      left: -2.5rem; top: 0;
      width: 32px; height: 32px;
      background: var(--accent);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 0.75rem; font-weight: 700;
      transition: filter 0.3s, transform 0.3s;
    }
    .time-step:hover .step-cir { filter: brightness(1.2); transform: scale(1.1); }
    .step-title { font-weight: 600; color: var(--black); font-size: 1rem; margin-bottom: 0.3rem; }
    .step-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

    /* Mock Scorecard Table */
    .mock-table-container {
      overflow-x: auto;
      margin-top: 4rem;
      border: 1px solid var(--border);
      border-radius: 8px;
    }
    .mock-table {
      width: 100%; border-collapse: collapse; min-width: 600px;
    }
    .mock-table th {
      background: #111; color: var(--white);
      text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em;
      text-align: left; padding: 1rem;
    }
    .mock-table th.num, .mock-table td.num { text-align: right; font-family: monospace; font-size: 0.9rem; }
    .mock-table td { padding: 1rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; color: var(--text); }
    .mock-table tr:nth-child(even) { background: var(--bg-card); }
    .mock-table tr.top-row td { border-left: 3px solid var(--accent); }
    .score-cell { position: relative; padding-right: 1rem !important; }
    .score-bar {
      display: block; height: 4px; background: rgba(219,39,99,0.6);
      border-radius: 2px; margin-top: 6px;
    }

    /* Mock Shiny App */
    .app-mock {
      background: var(--bg); border: 1px solid var(--border);
      border-radius: 10px; overflow: hidden; margin-top: 5rem;
      box-shadow: var(--shadow);
    }
    .app-chrome {
      background: var(--bg-card2); padding: 0.75rem 1rem;
      display: flex; align-items: center; gap: 0.5rem;
      border-bottom: 1px solid var(--border);
    }
    .chrome-dot { width: 10px; height: 10px; border-radius: 50%; opacity: 0.8; }
    .app-url { margin-left:1rem; font-size:0.75rem; color:var(--text-subtle); background:var(--bg); padding:0.2rem 1rem; border-radius:12px; font-family:monospace; }
    .app-body { padding: 2rem; }
    .app-header { font-size: 1.1rem; font-weight: 700; color: var(--black); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
    .app-header::before { content: ''; width: 4px; height: 16px; background: var(--accent); display: block; border-radius:2px;}
    .app-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
    .app-select { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; font-family: var(--sans); font-size: 0.9rem; color: var(--text); background: var(--bg); }
    .app-btn { width: 100%; padding: 0.8rem; background: var(--accent); color: var(--white); border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    .app-btn:hover { background: var(--accent-dark); }
    .app-results { padding-top: 1.5rem; border-top: 1px dashed var(--border); display: flex; flex-direction: column; gap: 0.8rem; }
    .res-card { padding: 1rem; border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between; }
    .res-card strong { display: block; color: var(--black); margin-bottom: 0.25rem; font-size: 0.95rem; }
    .res-badge { font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase; }
    .tier-1 { background: #d4edda; color: #155724; }
    .tier-2 { background: #fff3cd; color: #856404; }

    /* Divider */
    .proj-divider { width: 100%; height: 1px; background: var(--border); margin: 6rem 0; opacity: 0.6; }
`;

if(!content.includes('/* Project 1 Layout */')) {
  content = content.replace('</style>', project1CSS + '\n  </style>');
}

const project1HTML = `
  <section id="factory-allocation" class="proj-section">
    <div class="watermark-number" aria-hidden="true">01</div>
    
    <div class="proj-header fade-up">
      <div class="tag-row">
        <span class="pill-tag">Data Analytics</span>
        <span class="pill-tag">Operations</span>
        <span class="pill-tag">SQL</span>
        <span class="pill-tag">Power BI</span>
        <span class="pill-tag">R/Shiny</span>
      </div>
      <h2>Factory Allocation Optimization Model</h2>
    </div>

    <div class="proj-grid">
      <!-- Left Column -->
      <div class="fade-up delay-1">
        <div class="pull-quote">
          The product development team was allocating orders to factories without a standardized performance framework, leading to late deliveries and cost overruns.
        </div>
        
        <!-- Scorecard Table -->
        <div class="mock-table-container">
          <table class="mock-table">
            <thead>
              <tr>
                <th>Factory</th>
                <th class="num">On-Time</th>
                <th class="num">Cost Acc.</th>
                <th class="num">Quality</th>
                <th class="num">Remake</th>
                <th class="num">Weighted</th>
              </tr>
            </thead>
            <tbody>
              <tr class="top-row">
                <td>Sunrise Apparel</td>
                <td class="num">94%</td><td class="num">91%</td><td class="num">97%</td><td class="num">2%</td>
                <td class="num score-cell">93.1<span class="score-bar" style="width: 93%;"></span></td>
              </tr>
              <tr>
                <td>Delta Garments</td>
                <td class="num">88%</td><td class="num">85%</td><td class="num">93%</td><td class="num">5%</td>
                <td class="num score-cell">87.6<span class="score-bar" style="width: 87%;"></span></td>
              </tr>
              <tr>
                <td>Apex Textile</td>
                <td class="num">76%</td><td class="num">90%</td><td class="num">89%</td><td class="num">8%</td>
                <td class="num score-cell">83.2<span class="score-bar" style="width: 83%;"></span></td>
              </tr>
              <tr>
                <td>Crestline Mfg</td>
                <td class="num">82%</td><td class="num">78%</td><td class="num">85%</td><td class="num">11%</td>
                <td class="num score-cell">80.1<span class="score-bar" style="width: 80%;"></span></td>
              </tr>
              <tr>
                <td>Orion Fashions</td>
                <td class="num">71%</td><td class="num">74%</td><td class="num">80%</td><td class="num">14%</td>
                <td class="num score-cell">74.0<span class="score-bar" style="width: 74%;"></span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="outcome-block">
          <div class="outcome-quote-mark">&ldquo;</div>
          <p>This framework replaced ad-hoc allocation decisions with a repeatable, data-driven system, giving the sourcing team a clear methodology for evaluating factory risk before committing orders.</p>
        </div>
      </div>

      <!-- Right Column -->
      <div class="fade-up delay-2">
        <h3 style="margin-bottom: 2rem; font-family: var(--sans);">The Approach</h3>
        <div class="timeline">
          <div class="time-step">
            <div class="step-cir">01</div>
            <div class="step-title">Define the Objective</div>
            <div class="step-desc">Reduce late deliveries and cost overruns by routing orders to factories with the strongest track record on comparable product types.</div>
          </div>
          <div class="time-step">
            <div class="step-cir">02</div>
            <div class="step-title">Identify Data Sources</div>
            <div class="step-desc">Historical costing tables, on-time delivery rates by factory and product category, sample quality rejection logs, quoted vs. actual cost variance, remake cost records.</div>
          </div>
          <div class="time-step">
            <div class="step-cir">03</div>
            <div class="step-title">Clean and Join the Data</div>
            <div class="step-desc">SQL joins on factory ID and product category; flagged nulls, standardized date fields, removed duplicates.</div>
          </div>
          <div class="time-step">
            <div class="step-cir">04</div>
            <div class="step-title">Build a Scorecard</div>
            <div class="step-desc">Weighted factory performance score: On-time rate (40%) &middot; Cost accuracy (30%) &middot; Quality rate (20%) &middot; Remake frequency (10%).</div>
          </div>
          <div class="time-step">
            <div class="step-cir">05</div>
            <div class="step-title">Visualize in Power BI</div>
            <div class="step-desc">Dashboard showing factory rankings by product type, high-risk allocation flags, filterable by season and category.</div>
          </div>
          <div class="time-step">
            <div class="step-cir">06</div>
            <div class="step-title">Build a Shiny App</div>
            <div class="step-desc">Interactive R/Shiny app where user inputs lead time and product category to surface the best-matched factory.</div>
          </div>
          <div class="time-step">
            <div class="step-cir">07</div>
            <div class="step-title">Present Recommendations</div>
            <div class="step-desc">Mapped factory scores to the order book and proposed tiered allocation: Tier 1 factories for priority programs, Tier 2 for simpler or less time-sensitive orders.</div>
          </div>
        </div>

        <!-- Shiny App Mockup -->
        <div class="app-mock">
          <div class="app-chrome">
            <span class="chrome-dot" style="background:#ff5f56;"></span>
            <span class="chrome-dot" style="background:#ffbd2e;"></span>
            <span class="chrome-dot" style="background:#27c93f;"></span>
            <span class="app-url">factory-tool.shinyapps.io</span>
          </div>
          <div class="app-body">
            <div class="app-header">Factory Recommendation Tool</div>
            <div class="app-controls">
              <select class="app-select">
                <option>Tops</option>
                <option>Bottoms</option>
                <option>Outerwear</option>
                <option>Accessories</option>
              </select>
              <select class="app-select">
                <option>Under 1 week</option>
                <option>1-2 weeks</option>
                <option>3-4 weeks</option>
                <option>4+ weeks</option>
              </select>
            </div>
            <button class="app-btn" id="mockAppBtn">Find Best Match</button>
            <div class="app-results" id="mockAppResults">
              <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Top Recommended Factories</div>
              
              <div class="res-card">
                <div>
                  <strong>Sunrise Apparel</strong>
                  <span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 93.1</span>
                  <span class="score-bar" style="width:93%; margin-top:4px;"></span>
                </div>
                <span class="res-badge tier-1">Tier 1</span>
              </div>
              <div class="res-card">
                <div>
                  <strong>Delta Garments</strong>
                  <span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 87.6</span>
                  <span class="score-bar" style="width:87%; margin-top:4px;"></span>
                </div>
                <span class="res-badge tier-1">Tier 1</span>
              </div>
              <div class="res-card">
                <div>
                  <strong>Apex Textile</strong>
                  <span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 83.2</span>
                  <span class="score-bar" style="width:83%; margin-top:4px;"></span>
                </div>
                <span class="res-badge tier-2">Tier 2</span>
              </div>
            </div>
          </div>
        </div>
        <script>
          const btn = document.getElementById('mockAppBtn');
          const res = document.getElementById('mockAppResults');
          const states = [
            \`<div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Top Recommended Factories</div>
             <div class="res-card"><div><strong>Sunrise Apparel</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 93.1</span><span class="score-bar" style="width:93%; margin-top:4px;"></span></div><span class="res-badge tier-1">Tier 1</span></div>
             <div class="res-card"><div><strong>Delta Garments</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 87.6</span><span class="score-bar" style="width:87%; margin-top:4px;"></span></div><span class="res-badge tier-1">Tier 1</span></div>
             <div class="res-card"><div><strong>Apex Textile</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 83.2</span><span class="score-bar" style="width:83%; margin-top:4px;"></span></div><span class="res-badge tier-2">Tier 2</span></div>\`,

            \`<div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Top Recommended Factories</div>
             <div class="res-card"><div><strong>Delta Garments</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 87.6</span><span class="score-bar" style="width:87%; margin-top:4px;"></span></div><span class="res-badge tier-1">Tier 1</span></div>
             <div class="res-card"><div><strong>Crestline Mfg</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 80.1</span><span class="score-bar" style="width:80%; margin-top:4px;"></span></div><span class="res-badge tier-2">Tier 2</span></div>
             <div class="res-card"><div><strong>Orion Fashions</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 74.0</span><span class="score-bar" style="width:74%; margin-top:4px;"></span></div><span class="res-badge tier-2">Tier 2</span></div>\`,

            \`<div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Top Recommended Factories</div>
             <div class="res-card"><div><strong>Apex Textile</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 83.2</span><span class="score-bar" style="width:83%; margin-top:4px;"></span></div><span class="res-badge tier-2">Tier 2</span></div>
             <div class="res-card"><div><strong>Crestline Mfg</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 80.1</span><span class="score-bar" style="width:80%; margin-top:4px;"></span></div><span class="res-badge tier-2">Tier 2</span></div>
             <div class="res-card"><div><strong>Delta Garments</strong><span style="font-family:monospace; font-size:0.85rem; color:var(--text-subtle);">Score: 87.6</span><span class="score-bar" style="width:87%; margin-top:4px;"></span></div><span class="res-badge tier-1">Tier 1</span></div>\`
          ];
          let cur = 0;
          btn.addEventListener('click', () => { cur = (cur + 1) % 3; res.innerHTML = states[cur]; });
        </script>
      </div>
    </div>
  </section>

  <div class="proj-divider"></div>
`;

content = content.replace('<div id="project-1-slot"></div>', project1HTML);
fs.writeFileSync(fp, content);
console.log('Step 3 integrated into projects.html');
