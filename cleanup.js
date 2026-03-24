const fs = require('fs');
const path = require('path');
const dir = '/Users/chloewade/.gemini/antigravity/scratch';
const files = ['index.html', 'about.html', 'skills.html', 'experience.html', 'contact.html', 'projects.html'];

files.forEach(file => {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');

  // Fix double Wade
  content = content.replace(/Chloe WadeWade/g, 'Chloe Wade');
  content = content.replace(/Chloe Wade Wade/g, 'Chloe Wade');

  // Ensure Download CV button is ghost #DB2763
  // Prompt: ghost/outline button in #DB2763 to complement the primary CTA
  // My previous patch used: style="color:var(--accent); border-color:var(--accent);"
  // But I should make sure it has the right hover behavior too.
  // I will add a class .btn-ghost-accent or just target it.
  
  if (content.includes('Download CV')) {
    // Add hover style for ghost accent buttons if not present
    if (!content.includes('.btn-ghost-accent')) {
        const styleTag = '<style>';
        const ghostStyle = `
    .btn-ghost-accent {
      background: transparent !important;
      color: #DB2763 !important;
      border: 2px solid #DB2763 !important;
    }
    .btn-ghost-accent:hover {
      background: rgba(219, 39, 99, 0.05) !important;
      transform: translateY(-2px);
    }
  `;
        if (content.includes('</style>')) {
            content = content.replace('</style>', ghostStyle + '</style>');
        }
    }
    content = content.replace(/class="btn btn-outline" style="color:(var\(--accent\)|#DB2763); border-color:(var\(--accent\)|#DB2763);"/g, 'class="btn btn-ghost-accent"');
  }

  fs.writeFileSync(fp, content);
});
console.log('Cleanup complete');
