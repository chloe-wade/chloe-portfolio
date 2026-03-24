const fs = require('fs');
const path = require('path');
const dir = '/Users/chloewade/.gemini/antigravity/scratch';
const files = ['index.html', 'about.html', 'skills.html', 'experience.html', 'contact.html'];

const favicon = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white'/><text x='50' y='65' fill='%23DB2763' font-size='50' font-family='Georgia, serif' font-weight='bold' text-anchor='middle'>CW</text></svg>">`;

files.forEach(file => {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');

  // Favicon
  if (!content.includes('rel="icon"')) {
    content = content.replace('</head>', `  ${favicon}\n</head>`);
  }

  // Header Branding
  content = content.replace(/Chloe<span>\.<\/span>/g, 'Chloe Wade');

  // LinkedIn
  content = content.replace(/href="#"([^>]*>LinkedIn)/g, 'href="https://www.linkedin.com/in/chloe-wade-a02747185/"$1');

  // Nav Projects - Desktop
  if (!content.includes('href="projects.html"')) {
    content = content.replace(/<li><a href="experience\.html"([^>]*)>Experience<\/a><\/li>/g, `<li><a href="experience.html"$1>Experience</a></li>\n    <li><a href="projects.html">Projects</a></li>`);
    content = content.replace(/<a href="experience\.html"([^>]*)>Experience<\/a>\s*<a href="contact\.html"/g, `<a href="experience.html"$1>Experience</a>\n  <a href="projects.html">Projects</a>\n  <a href="contact.html"`);
  }

  // Image Placeholders Unsplash Fix
  content = content.replace(
    /<div class="img-placeholder" style="margin-bottom:1rem;">Profile Placeholder<\/div>/g, 
    '<img src="https://images.unsplash.com/photo-1542435503-956c24b914b1?q=80&w=800&auto=format&fit=crop" alt="Chloe Wade Working" style="margin-bottom:1rem;">'
  );
  content = content.replace(
    /<div class="img-placeholder" style="margin-bottom:1rem;">Skills Placeholder<\/div>/g, 
    '<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Data Analytics Screens" style="margin-bottom:1rem;">'
  );
  content = content.replace(
    /<div class="img-placeholder" style="margin-bottom:1rem;">Experience Placeholder<\/div>/g, 
    '<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Marketing Strategy Meeting" style="margin-bottom:1rem;">'
  );

  // Scroll animations fix
  const oldObs = /const obs = new IntersectionObserver\([\s\S]+?obs\.observe\(el\)\);/g;
  const newObs = `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach(el => { el.classList.add('visible'); el.style.transition = 'none'; });
  }`;
  if (content.match(oldObs)) {
    content = content.replace(oldObs, newObs);
  }

  fs.writeFileSync(fp, content);
});

console.log('Site patched');
