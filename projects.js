// ====== Quick personalization ======
const LINKS = {
  resume: './Images/CV_diego_solorzano.pdf',
  github: 'https://github.com/diegoasolo',
  linkedin: 'https://www.linkedin.com/in/diegoasolo/',
  email: 'diegoasolo12@gmail.com'
};

// Projects data is loaded from projects-data.js

// ====== Theme ======
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
if ((savedTheme === 'dark') || (!savedTheme && prefersDark)) document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ====== Links & year ======
document.getElementById('resumeLink').href = LINKS.resume;
document.getElementById('year').textContent = new Date().getFullYear();

// ====== Projects render ======
const grid = document.getElementById('projectGrid');
function projCard(p){
  const el = document.createElement('article');
  el.className = 'card';
  const thumbnail = p.thumbnail || (p.media && p.media[0] && p.media[0].url) || '';
  el.innerHTML = `
    <img src="${thumbnail}" alt="Project thumbnail" loading="lazy"/>
    <div class="p">
      <h3 style="margin:0; font-size:18px">${p.title}</h3>
      <p class="muted" style="margin:8px 0 0">${p.shortDescription || p.description}</p>
      <div class="tags">${p.tags.map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
      <div style="margin-top:10px"><a class="btn" href="project-detail.html?id=${p.id}">Details →</a></div>
    </div>`;
  return el;
}
PROJECTS.forEach(p => grid.appendChild(projCard(p)));

