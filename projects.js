// ====== Quick personalization ======
const LINKS = {
  resume: 'Diego_Solorzano_Resume.pdf',
  github: 'https://github.com/diegoasolo',
  linkedin: 'https://www.linkedin.com/in/diegoasolo/',
  email: 'diegoasolo12@gmail.com'
};

const PROJECTS = [
  {
    title: 'FogHacks — Adaptive Imaging Through Fog',
    tags: ['Computational Optics','Neural Netowrks','Image Corection'],
    description: 'Computational imaging pipeline using phase modulation and PSF deconvolution; GPU-accelerated diffraction sims.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1520975922284-8f31b0d0b9b5?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'hBN Quantum Emitters — PL Enhancement',
    tags: ['Nanophotonics','hBN','FDTD'],
    description: 'Gold nanorods + alumina spacer cavity to boost Purcell factor and control polarization for spin-defect readout.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'RushBot — Autonomous Recruitment Rover',
    tags: ['Robotics','SLAM','Embedded'],
    description: 'Interactive rover with SLAM navigation, manipulator arm, and on-device voice/chat interface for event engagement.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
  }
];

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
  el.innerHTML = `
    <img src="${p.image}" alt="Project thumbnail" loading="lazy"/>
    <div class="p">
      <h3 style="margin:0; font-size:18px">${p.title}</h3>
      <p class="muted" style="margin:8px 0 0">${p.description}</p>
      <div class="tags">${p.tags.map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
      <div style="margin-top:10px"><a class="btn" href="${p.link}">Details →</a></div>
    </div>`;
  return el;
}
PROJECTS.forEach(p => grid.appendChild(projCard(p)));

