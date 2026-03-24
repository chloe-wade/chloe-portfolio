const fs = require('fs');
const courses = [
  "Consumer Psychology and Culture", "Advanced Market Research", "Digital Marketing and Social Media", 
  "Marketing Ethics and Social Responsibility", "Marketing in a Global World", "Marketing & Innovation", 
  "Digital Marketing Strategy", "UX/UI Web Design", "Short Video Metrics", "Digital Ads", 
  "E-Commerce", "Marketing Automation", "Web and Mobile Analytics", "Data Visualization", 
  "Python", "R", "AI and Machine Learning", "Causal Inference in Marketing", 
  "Social and Ethical Implications of Emerging Technologies"
];
const pills = courses.map(c => `<span class="course-pill">${c}</span>`).join('');

let about = fs.readFileSync('/Users/chloewade/.gemini/antigravity/scratch/about.html', 'utf8');

// Update Styles - add .course-pill
if (!about.includes('.course-pill')) {
    const coursePillStyle = `
    .course-pill {
      display: inline-block;
      background: var(--bg-card2);
      color: var(--text-muted);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      margin: 0.2rem 0.2rem 0.2rem 0;
      border: 1px solid var(--border);
      white-space: nowrap;
    }
`;
    about = about.replace('</style>', coursePillStyle + '</style>');
}

// Update Bio
const oldBio = `
        <p class="about-intro-text fade-up delay-1">
          Chloe Wade is a rare kind of marketing professional. <strong>Trained as a designer at Parsons School of Design</strong>, she crossed disciplines to become a marketer who builds systems. She reads data while designing the story.
        </p>
        <p class="about-intro-text fade-up delay-2">
          She believes the creative and analytical brain are complementary. At every stage of her career, she has brought both perspectives to the table. This includes building WIP dashboards alongside lookbooks and leading teams with creative briefs.
        </p>
        <p class="about-intro-text fade-up delay-3">
          Currently she is completing an <strong>MSc in Digital Marketing & Analytics at TBS Education</strong> in Barcelona (May 2026). This program deepens her quantitative skills while she continues to leverage the design intuition that makes her work effective.
        </p>`;

const newBio = `
        <p class="about-intro-text fade-up delay-1">
          I am a strategic marketer and data analyst with a foundation in fine arts and fashion design. My career has transitioned from creative apparel development to data-driven growth strategy.
        </p>
        <p class="about-intro-text fade-up delay-2">
          Currently pursuing my <strong>MSc in Digital Marketing and Analytics at TBS Education</strong>, I leverage my aesthetic background from <strong>Parsons</strong> with technical skills in Python, R, and SQL to help brands optimize their digital footprint.
        </p>
        <p class="about-intro-text fade-up delay-3">
          I believe the creative and analytical brain are complementary. At every stage of my career, I have brought both perspectives to the table—from building WIP dashboards alongside lookbooks to leading teams with precision-targeted creative briefs.
        </p>`;

about = about.replace(oldBio, newBio);

// Update Coursework
const oldCoursework = /<p style="font-size: 0\.9rem; line-height: 1\.6; color: var\(--text-muted\);">[\s\S]*?<\/p>/;
about = about.replace(oldCoursework, `<div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap;">${pills}</div>`);

fs.writeFileSync('/Users/chloewade/.gemini/antigravity/scratch/about.html', about);
console.log('About page updated with first-person bio and course pills');
