// ====== Quick personalization ======
const LINKS = {
  resume: './Images/CV_diego_solorzano.pdf',
  email: 'diegoasolo12@gmail.com'
};

const SKILLS = ['Table Top Optics','FDTD/Lumerical','COMSOL','PCB Design (Altium)','MATLAB','Python','C/C++','Embedded Systems','Raspberry Pi', 'Arduino', 'Oscilloscope'];

// ====== Theme ======
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ====== Links & year ======
document.getElementById('resumeLink').href = LINKS.resume;
document.getElementById('year').textContent = new Date().getFullYear();

// ====== Skills render ======
const skillsEl = document.getElementById('skills');
SKILLS.forEach(s => {
  const el = document.createElement('div');
  el.className = 'skill';
  el.textContent = s;
  skillsEl.appendChild(el);
});

// ====== Easter egg: click "piano" to play a clip ======
const pianoEgg = document.getElementById('pianoEgg');
if (pianoEgg) {
  const pianoAudio = new Audio('./Images/piano-easter-egg.wav');
  pianoEgg.addEventListener('click', () => {
    pianoAudio.currentTime = 0;
    pianoAudio.play();
  });
}

// ====== Photography carousel ======
(function photoCarousel(){
  const track = document.getElementById('photoCarouselTrack');
  const indicatorsEl = document.getElementById('photoCarouselIndicators');
  const prevBtn = document.getElementById('photoCarouselPrev');
  const nextBtn = document.getElementById('photoCarouselNext');
  if (!track || !indicatorsEl || !prevBtn || !nextBtn) return;

  const PHOTOS = [
    { url: './Images/photo-ducks.jpg', alt: 'Ducks swimming in turquoise water' },
    { url: './Images/photo-beach.jpg', alt: 'Two people walking across a wide tidal beach' },
    { url: './Images/photo-skate.png', alt: 'Skateboarder grinding a ledge, motion blur' },
    { url: './Images/photo-hands.png', alt: 'Close-up of clasped hands' },
    { url: './Images/photo-architecture.png', alt: 'Looking up at modern concrete and glass architecture' }
  ];

  let currentIndex = 0;

  PHOTOS.forEach((photo, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = photo.alt;
    img.loading = index === 0 ? 'eager' : 'lazy';
    slide.appendChild(img);
    track.appendChild(slide);

    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('aria-label', `Go to photo ${index + 1}`);
    indicator.addEventListener('click', () => goToSlide(index));
    if (index === 0) indicator.classList.add('active');
    indicatorsEl.appendChild(indicator);
  });

  function updateCarousel(){
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicatorsEl.querySelectorAll('.carousel-indicator').forEach((ind, idx) => {
      ind.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index){
    if (index >= 0 && index < PHOTOS.length) {
      currentIndex = index;
      updateCarousel();
    }
  }

  prevBtn.addEventListener('click', () => { currentIndex = currentIndex > 0 ? currentIndex - 1 : PHOTOS.length - 1; updateCarousel(); });
  nextBtn.addEventListener('click', () => { currentIndex = currentIndex < PHOTOS.length - 1 ? currentIndex + 1 : 0; updateCarousel(); });

  let autoPlayInterval;
  function startAutoPlay(){
    autoPlayInterval = setInterval(() => {
      currentIndex = currentIndex < PHOTOS.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    }, 4000);
  }
  function stopAutoPlay(){ if (autoPlayInterval) clearInterval(autoPlayInterval); }

  const container = document.querySelector('.carousel-container');
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  startAutoPlay();

  updateCarousel();
})();
