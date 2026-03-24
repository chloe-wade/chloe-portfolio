const fs = require('fs');
const fp = '/Users/chloewade/.gemini/antigravity/scratch/projects.html';
let content = fs.readFileSync(fp, 'utf8');

const project2CSS = `
    /* Project 2 Layout - Gallery Grid */
    .gallery-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .gallery-card {
      border: 1px solid var(--border);
      border-top: 3px solid var(--accent);
      background: var(--bg);
      display: flex;
      flex-direction: column;
      transition: border-color 0.3s;
    }
    .gallery-card:hover {
      border-color: var(--accent);
    }
    .gallery-card:last-child {
      grid-column: span 2;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
    }
    @media (max-width: 900px) {
      .gallery-grid { grid-template-columns: 1fr; }
      .gallery-card:last-child { grid-column: span 1; grid-template-columns: 1fr; }
    }

    .placeholder-box {
      width: 100%;
      position: relative;
      background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #f5f5f5 10px, #f5f5f5 20px);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .placeholder-box span {
      font-family: monospace;
      color: var(--text-subtle);
      font-size: 0.8rem;
      z-index: 1;
    }

    .aspect-landscape { padding-top: 62.5%; } /* 800x500 */
    .aspect-portrait { padding-top: 133.33%; } /* 600x800 */
    
    .placeholder-inner {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-content { padding: 2.5rem; }
    .card-content h3 { font-size: 1.6rem; margin-bottom: 1.5rem; color: var(--black); }
    
    .card-meta { margin-bottom: 2rem; }
    .card-meta dl { display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1.5rem; }
    .card-meta dt { 
      font-size: 0.65rem; font-weight: 700; text-transform: uppercase; 
      letter-spacing: 0.1em; color: var(--text-subtle); 
    }
    .card-meta dd { font-size: 0.95rem; margin: 0; color: var(--text); }

    .design-decision {
      border-left: 2px solid var(--accent);
      padding-left: 1.25rem;
      margin-top: 1.5rem;
    }
    .decision-label {
      font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--text-subtle);
      margin-bottom: 0.4rem; display: block;
    }
    .decision-text {
      font-style: italic; font-size: 0.9rem; color: var(--text-muted);
      line-height: 1.6;
    }

    /* Footer CTA Band */
    .footer-cta-band {
      background: var(--bg-card);
      padding: 6rem 2rem;
      text-align: center;
      border-top: 1px solid var(--border);
    }
    .cta-band-inner { max-width: 600px; margin: 0 auto; }
    .footer-cta-band h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    .footer-cta-band p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2.5rem; }
    .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
`;

content = content.replace('/* Divider */', project2CSS + '\n    /* Divider */');

const project2HTML = `
  <section id="marketing" class="proj-section">
    <div class="watermark-number" aria-hidden="true">02</div>
    
    <div class="proj-header fade-up">
      <div class="tag-row">
        <span class="pill-tag">Creative Direction</span>
        <span class="pill-tag">Email Marketing</span>
        <span class="pill-tag">Adobe Creative Suite</span>
        <span class="pill-tag">Canva</span>
        <span class="pill-tag">Campaign Management</span>
      </div>
      <h2>Marketing & Visual Identity</h2>
      <p style="font-size: 0.9rem; color: var(--text-subtle); margin-top: 1rem;">Campaign creative and e-commerce marketing from Meg by Meghan Kinney.</p>
    </div>

    <div class="gallery-grid">
      <!-- Card A -->
      <article class="gallery-card fade-up">
        <div class="placeholder-box aspect-landscape">
          <div class="placeholder-inner">
            <span>800 × 500</span>
            <!-- INSERT IMAGE: meg-landing-page.jpg -->
          </div>
        </div>
        <div class="card-content">
          <h3>E-Commerce Landing Page Redesign</h3>
          <div class="card-meta">
            <dl>
              <dt>Brand</dt><dd>Meg by Meghan Kinney</dd>
              <dt>Brief</dt><dd>Reduce bounce rate and improve conversion pathway</dd>
              <dt>Tools</dt><dd>Hotjar, Google Analytics, Canva</dd>
            </dl>
          </div>
          <div class="design-decision">
            <span class="decision-label">Design decision</span>
            <p class="decision-text">"I moved the primary CTA above the fold after heatmap data showed users weren't scrolling past the hero image."</p>
          </div>
        </div>
      </article>

      <!-- Card B -->
      <article class="gallery-card fade-up">
        <div class="placeholder-box aspect-landscape">
          <div class="placeholder-inner">
            <span>800 × 500</span>
            <!-- INSERT IMAGE: meg-google-ads.jpg -->
          </div>
        </div>
        <div class="card-content">
          <h3>Google Ads Campaign Creative</h3>
          <div class="card-meta">
            <dl>
              <dt>Brand</dt><dd>Meg by Meghan Kinney</dd>
              <dt>Brief</dt><dd>Increase ROAS through better ad-to-landing-page message match</dd>
              <dt>Tools</dt><dd>Google Ads, Adobe Illustrator</dd>
            </dl>
          </div>
          <div class="design-decision">
            <span class="decision-label">Design decision</span>
            <p class="decision-text">"I aligned ad headline copy directly with the landing page H1 to improve Quality Score and reduce cost per click."</p>
          </div>
        </div>
      </article>

      <!-- Card C -->
      <article class="gallery-card fade-up">
        <div class="placeholder-box aspect-portrait" style="height: 100%;">
          <div class="placeholder-inner">
            <span>600 × 800</span>
            <!-- INSERT IMAGE: meg-email-sequence.jpg -->
          </div>
        </div>
        <div class="card-content">
          <h3>Email Marketing Sequence</h3>
          <div class="card-meta">
            <dl>
              <dt>Brand</dt><dd>Meg by Meghan Kinney</dd>
              <dt>Brief</dt><dd>Re-engage lapsed customers with a 3-part drip sequence</dd>
              <dt>Tools</dt><dd>Email platform, Canva, Adobe</dd>
            </dl>
          </div>
          <div class="design-decision">
            <span class="decision-label">Design decision</span>
            <p class="decision-text">"I used behavioral segmentation to trigger the sequence based on last purchase date rather than blasting the full list."</p>
          </div>
        </div>
      </article>
    </div>
  </section>
`;

const footerCTABand = `
  <section class="footer-cta-band fade-up">
    <div class="cta-band-inner">
      <h2>Want to see what I'd build for you?</h2>
      <p>I'm open to roles and freelance projects from June 2026.</p>
      <div class="cta-btns">
        <a href="contact.html" class="btn btn-primary">Get in touch &rarr;</a>
        <a href="experience.html" class="btn btn-outline">View experience</a>
      </div>
    </div>
  </section>
`;

content = content.replace('<div id="project-2-slot"></div>', project2HTML);
content = content.replace('<div id="cta-footer-slot"></div>', footerCTABand);

fs.writeFileSync(fp, content);
console.log('Step 4 integrated into projects.html');
