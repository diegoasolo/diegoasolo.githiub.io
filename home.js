
//links
const LINKS = {
  resume: './Images/CV_diego_solorzano.pdf',
  github: 'https://github.com/diegoasolo',
  linkedin: 'https://www.linkedin.com/in/diegoasolo/',
  email: 'diegoasolo12@gmail.com'
};

// Projects data is loaded from projects-data.js

const SKILLS = ['Table Top Optics','FDTD/Lumerical','COMSOL','PCB Design (Altium)','MATLAB','Python','C/C++','Embedded Systems','Raspberry Pi', 'Arduino', 'Oscilloscope'];

// toggle theme
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
if ((savedTheme === 'dark') || (!savedTheme && prefersDark)) document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// links and year
document.getElementById('resumeLink').href = LINKS.resume;
document.getElementById('githubLink').href = LINKS.github;
document.getElementById('linkedinLink').href = LINKS.linkedin;
document.getElementById('emailLink').href = `mailto:${LINKS.email}`;
document.getElementById('mailtoDirect').href = `mailto:${LINKS.email}`;
document.getElementById('year').textContent = new Date().getFullYear();

// projects render
const grid = document.getElementById('projectGrid');
if (grid) {
  // Show only first 3 projects on home page
  const projectsToShow = PROJECTS.slice(0, 3);
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
  projectsToShow.forEach(p => grid.appendChild(projCard(p)));
}

// skills render
const skillsEl = document.getElementById('skills');
SKILLS.forEach(s => {
  const li = document.createElement('div');
  li.className = 'skill';
  li.textContent = s;
  skillsEl.appendChild(li);
});

// contact handling
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const subject = encodeURIComponent('Portfolio inquiry from ' + data.name);
  const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name} <${data.email}>`);
  // Mailto fallback (no backend needed)
  window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
});

// smooth scroll (no frameworks)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    }
  });
});