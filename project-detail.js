// ====== Quick personalization ======
const LINKS = {
  resume: 'Diego_Solorzano_Resume.pdf',
  github: 'https://github.com/diegoasolo',
  linkedin: 'https://www.linkedin.com/in/diegoasolo/',
  email: 'diegoasolo12@gmail.com'
};

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

// ====== Get project ID from URL ======
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// ====== Find project ======
const project = PROJECTS.find(p => p.id === projectId);

if (!project) {
  // If project not found, redirect to projects page
  window.location.href = 'projects.html';
} else {
  // ====== Render project header ======
  document.getElementById('projectTitle').textContent = project.title;
  document.title = `${project.title} — Diego Solorzano`;
  
  const tagsContainer = document.getElementById('projectTags');
  project.tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'tag';
    tagEl.textContent = tag;
    tagsContainer.appendChild(tagEl);
  });

  // ====== Render project description ======
  document.getElementById('projectDescription').innerHTML = project.description;

  // ====== Carousel functionality ======
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselIndicators = document.getElementById('carouselIndicators');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  let currentIndex = 0;
  const mediaItems = project.media || [];

  // Render media items
  mediaItems.forEach((media, index) => {
    // Create slide
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.setAttribute('data-index', index);
    
    if (media.type === 'image') {
      const img = document.createElement('img');
      img.src = media.url;
      img.alt = media.alt || `Project image ${index + 1}`;
      img.loading = index === 0 ? 'eager' : 'lazy';
      slide.appendChild(img);
    } else if (media.type === 'video') {
      const video = document.createElement('video');
      video.src = media.url;
      video.controls = true;
      video.preload = index === 0 ? 'auto' : 'metadata';
      if (media.thumbnail) {
        video.poster = media.thumbnail;
      }
      slide.appendChild(video);
    }
    
    carouselTrack.appendChild(slide);

    // Create indicator
    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    indicator.addEventListener('click', () => goToSlide(index));
    if (index === 0) indicator.classList.add('active');
    carouselIndicators.appendChild(indicator);
  });

  // Update carousel position
  function updateCarousel() {
    const slideWidth = 100; // Percentage
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    
    // Update indicators
    document.querySelectorAll('.carousel-indicator').forEach((ind, idx) => {
      ind.classList.toggle('active', idx === currentIndex);
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === mediaItems.length - 1;
  }

  // Navigate to specific slide
  function goToSlide(index) {
    if (index >= 0 && index < mediaItems.length) {
      currentIndex = index;
      updateCarousel();
    }
  }

  // Previous/Next buttons
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < mediaItems.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    } else if (e.key === 'ArrowRight' && currentIndex < mediaItems.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Auto-play carousel (optional - cycles every 5 seconds)
  // Only enable if there are multiple items
  if (mediaItems.length > 1) {
    let autoPlayInterval;
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        if (currentIndex < mediaItems.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    }

    // Pause auto-play on hover or interaction
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoPlay);
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
      // Start auto-play initially
      startAutoPlay();
    }
  } else {
    // Hide navigation buttons and indicators if only one item
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (carouselIndicators) carouselIndicators.style.display = 'none';
  }

  // Initialize carousel
  updateCarousel();

  // ====== Navigation to next/previous projects ======
  const currentProjectIndex = PROJECTS.findIndex(p => p.id === projectId);
  const prevProject = PROJECTS[currentProjectIndex - 1];
  const nextProject = PROJECTS[currentProjectIndex + 1];

  if (prevProject) {
    const prevLink = document.getElementById('prevProject');
    prevLink.href = `project-detail.html?id=${prevProject.id}`;
    prevLink.style.display = 'inline-flex';
  }

  if (nextProject) {
    const nextLink = document.getElementById('nextProject');
    nextLink.href = `project-detail.html?id=${nextProject.id}`;
    nextLink.style.display = 'inline-flex';
  }
}

