const fs = require('fs');
const path = require('path');
const dir = '/Users/chloewade/.gemini/antigravity/scratch';
const files = ['index.html', 'about.html', 'skills.html', 'experience.html', 'contact.html'];

const favicon = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white'/><text x='50' y='75' fill='%23DB2763' font-size='60' font-family='Georgia, serif' font-weight='bold' text-anchor='middle'>C.</text></svg>">`;

files.forEach(file => {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');

  // Favicon
  if (!content.includes('rel="icon"')) {
    content = content.replace('</head>', `  ${favicon}\n</head>`);
  }

  // Header Branding
  if (content.includes('Chloe<span>.</span>')) {
    content = content.replace(/Chloe<span>\.<\/span>/g, 'Chloe Wade');
  }

  // LinkedIn
  if (content.includes('>LinkedIn<')) {
    content = content.replace(/href="#"([^>]*>LinkedIn)/g, 'href="https://www.linkedin.com/in/chloe-wade-a02747185/"$1');
  }

  // Nav Projects
  if (!content.includes('href="projects.html"')) {
    content = content.replace(/<li><a href="experience\.html"([^>]*)>Experience<\/a><\/li>/g, `<li><a href="experience.html"$1>Experience</a></li>\n    <li><a href="projects.html">Projects</a></li>`);
    content = content.replace(/<a href="experience\.html"([^>]*)>Experience<\/a>\s*<a href="contact\.html"/g, `<a href="experience.html"$1>Experience</a>\n  <a href="projects.html">Projects</a>\n  <a href="contact.html"`);
  }

  // Unsplash Placeholder replacement (except avatar if it was marked)
  // Converting .img-placeholder divs to Unsplash imgs where applicable.
  // Profile placeholder is replaced with a standard Unsplash image here, unless avatar image file exists.
  content = content.replace(
    /<div class="img-placeholder" style="margin-bottom:1rem;">Profile Placeholder<\/div>/g, 
    '<img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Professional Headshot" style="margin-bottom:1rem;">'
  );
  content = content.replace(
    /<div class="img-placeholder" style="margin-bottom:1rem;">Skills Placeholder<\/div>/g, 
    '<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Data Analytics Screens" style="margin-bottom:1rem;">'
  );
  content = content.replace(
    /<div class="img-placeholder" style="margin-bottom:1rem;">Experience Placeholder<\/div>/g, 
    '<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Marketing Strategy Meeting" style="margin-bottom:1rem;">'
  );

  // Scroll animations fix (prefers-reduced-motion)
  if (content.includes('const obs = new IntersectionObserver(') && !content.includes('prefers-reduced-motion')) {
    const oldObsRegex = /const obs = new IntersectionObserver\([\s\S]+?obs\.observe\(el\)\);/g;
    const newObs = `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }`;
    content = content.replace(oldObsRegex, newObs);
    // Remove the .visible class from CSS dependency since we are styling directly or keep it but I applied direct style above.
    // Actually simpler to just use classList.add('visible')
    content = content.replace(/e\.target\.style\.opacity = 1; e\.target\.style\.transform = 'translateY\(0\)';/g, "e.target.classList.add('visible');");
  }

  // Hero custom elements for index.html only
  if (file === 'index.html') {
    // Availability BADGE
    if (!content.includes('Open to roles from June 2026')) {
        content = content.replace(
            '<div class="hero-eyebrow">', 
            `<div class="hero-eyebrow">\n        <div style="display:inline-flex; align-items:center; gap:0.5rem; background:var(--bg-card); border:1px solid var(--border); border-radius:999px; padding:0.25rem 0.75rem; font-size:0.75rem; font-weight:600; color:var(--text-muted);"><span style="width:6px; height:6px; border-radius:50%; background:#28a745; display:inline-block;"></span>Open to roles from June 2026</div>`
        );
    }
    // Download CV ghost button
    if (!content.includes('Download CV')) {
        content = content.replace(
            '<a href="about.html" class="btn btn-outline">Meet Chloe</a>',
            '<a href="#" class="btn btn-outline" style="color:#DB2763; border-color:#DB2763;">Download CV</a>'
        );
    }
  }

  fs.writeFileSync(fp, content);
});
console.log('Step 1 complete');
