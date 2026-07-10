//links
const LINKS = {
  resume: './Images/CV_diego_solorzano.pdf',
  github: 'https://github.com/diegoasolo',
  linkedin: 'https://www.linkedin.com/in/diegoasolo/',
  email: 'diegoasolo12@gmail.com'
};

// toggle theme
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// links and year
document.getElementById('resumeLink').href = LINKS.resume;
document.getElementById('year').textContent = new Date().getFullYear();

// get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// find project
const project = PROJECTS.find(p => p.id === projectId);

if (!project) {
  // if project not found, redirect to projects page
  window.location.href = 'projects.html';
} else {
  // render project header
  document.getElementById('projectTitle').textContent = project.title;
  document.title = `${project.title} — Diego Solorzano`;
  
  const tagsContainer = document.getElementById('projectTags');
  project.tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'tag';
    tagEl.textContent = tag;
    tagsContainer.appendChild(tagEl);
  });

  // render project description
  document.getElementById('projectDescription').innerHTML = project.description;

  // carousel functionality
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselIndicators = document.getElementById('carouselIndicators');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  let currentIndex = 0;
  const mediaItems = project.media || [];

  // render media items
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
      video.muted = true; // Required for autoplay to work in most browsers
      video.playsInline = true; // Ensures autoplay works on mobile devices
      video.loop = true; // Loop the video
      video.preload = index === 0 ? 'auto' : 'metadata';
      if (media.thumbnail) {
        video.poster = media.thumbnail;
      }
      // Only autoplay the first video if it's the first slide
      if (index === 0) {
        video.autoplay = true;
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

  // update carousel position
  function updateCarousel() {
    const slideWidth = 100; // Percentage
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    
    // update indicators
    document.querySelectorAll('.carousel-indicator').forEach((ind, idx) => {
      ind.classList.toggle('active', idx === currentIndex);
    });

    // update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === mediaItems.length - 1;
    
    // Handle video play/pause
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, idx) => {
      const video = slide.querySelector('video');
      if (video) {
        if (idx === currentIndex) {
          // Play video on current slide
          video.play().catch(e => {
            // Autoplay may be blocked, but that's okay
            console.log('Video autoplay blocked:', e);
          });
        } else {
          // Pause videos on other slides
          video.pause();
          video.currentTime = 0; // Reset to beginning
        }
      }
    });
  }

  // navigate to specific slide
  function goToSlide(index) {
    if (index >= 0 && index < mediaItems.length) {
      currentIndex = index;
      updateCarousel();
    }
  }

  // previous/next buttons
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

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    } else if (e.key === 'ArrowRight' && currentIndex < mediaItems.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // auto-play carousel 4 seconds
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
      }, 4000);
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

