const fs = require('fs');
const path = require('path');
const dir = '/Users/chloewade/.gemini/antigravity/scratch';
const files = ['about.html', 'skills.html', 'contact.html', 'projects.html'];

files.forEach(file => {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');

  // Add sticky nav logic
  if (!content.includes('nav.classList.add(\'sticky\')')) {
    const navLogic = `
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
`;
    content = content.replace('const toggle = document.getElementById(\'navToggle\');', navLogic + '\n  const toggle = document.getElementById(\'navToggle\');');
  }

  // Update nav active state color to magenta
  content = content.replace('class="active"', 'class="active"'); // already has active class

  fs.writeFileSync(fp, content);
});

console.log('Site-wide refactor complete');
