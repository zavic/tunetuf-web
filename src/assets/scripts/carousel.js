let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.carousel-indicator');
let autoAdvanceTimer;
let touchStartX = 0;
let touchEndX = 0;
const carousel = document.querySelector('.carousel-track');
const prevButton = document.querySelector('#carousel-prev');
const nextButton = document.querySelector('#carousel-next');

// Add click handlers for next and previous buttons
prevButton?.addEventListener('click', async () => {
  prevSlide();
});
nextButton?.addEventListener('click', async () => {
  nextSlide();
});

// Add touch events for swipe
carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.className = 'carousel-item absolute top-0 left-0 w-full h-full';
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index === (currentSlide + 1) % slides.length) {
            slide.classList.add('next');
        } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('hidden');
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.className = `w-8 sm:w-12 h-1 sm:h-1.5 rounded-full transition-colors ${index === currentSlide ? 'bg-white/40' : 'bg-white/20'
            } hover:bg-white/60`;
    });
}

function resetAutoAdvance() {
    clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = setInterval(nextSlide, 5000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
    resetAutoAdvance();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
    resetAutoAdvance();
}

// Add click handlers to indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateSlides();
        resetAutoAdvance();
    });
});

// Initialize auto advance
resetAutoAdvance();

// Initialize slides
updateSlides();