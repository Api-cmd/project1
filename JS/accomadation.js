document.addEventListener('DOMContentLoaded', function() {
    const categories = ['silver', 'gold', 'platinum'];
    const autoPlayInterval = 5000; // 5 seconds between slides
    let autoPlayTimers = {};
    let touchStartX = 0;
    let touchEndX = 0;
    
    categories.forEach(category => {
        const track = document.getElementById(`${category}-track`);
        const images = track.querySelectorAll('.carousel-image');
        const card = track.closest('.category-card');
        const controls = card.querySelector('.carousel-controls');
        
        // Create dots
        const dotsContainer = controls.querySelector('.carousel-dots');
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(category, index));
            dotsContainer.appendChild(dot);
        });
        
        // Add arrow controls
        controls.querySelector('[data-control="prev"]').addEventListener('click', () => {
            stopAutoPlay(category);
            changeSlide(category, -1);
        });
        controls.querySelector('[data-control="next"]').addEventListener('click', () => {
            stopAutoPlay(category);
            changeSlide(category, 1);
        });

        // Add touch events
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoPlay(category);
        });

        track.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', () => {
            const touchDiff = touchStartX - touchEndX;
            if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
                if (touchDiff > 0) {
                    changeSlide(category, 1); // Swipe left
                } else {
                    changeSlide(category, -1); // Swipe right
                }
            }
            startAutoPlay(category);
        });

        // Mouse hover pause/resume
        card.addEventListener('mouseenter', () => stopAutoPlay(category));
        card.addEventListener('mouseleave', () => startAutoPlay(category));

        // Start autoplay
        startAutoPlay(category);
    });
});

let currentSlides = {
    silver: 0,
    gold: 0,
    platinum: 0
};

let autoPlayTimers = {};

function startAutoPlay(category) {
    stopAutoPlay(category);
    autoPlayTimers[category] = setInterval(() => {
        changeSlide(category, 1);
    }, 5000);
}

function stopAutoPlay(category) {
    if (autoPlayTimers[category]) {
        clearInterval(autoPlayTimers[category]);
        autoPlayTimers[category] = null;
    }
}

function changeSlide(category, direction) {
    const track = document.getElementById(`${category}-track`);
    const images = track.querySelectorAll('.carousel-image');
    const dots = track.closest('.category-card').querySelectorAll('.dot');
    
    // Remove active class from current slide
    images[currentSlides[category]].classList.remove('active');
    dots[currentSlides[category]].classList.remove('active');
    
    // Calculate new slide index
    currentSlides[category] = (currentSlides[category] + direction + images.length) % images.length;
    
    // Add active class to new slide
    images[currentSlides[category]].classList.add('active');
    dots[currentSlides[category]].classList.add('active');

    // Add fade effect
    updateSlide(category, images, dots);
}

function goToSlide(category, index) {
    const track = document.getElementById(`${category}-track`);
    const images = track.querySelectorAll('.carousel-image');
    const dots = track.closest('.category-card').querySelectorAll('.dot');
    
    if (index !== currentSlides[category]) {
        stopAutoPlay(category);
        currentSlides[category] = index;
        updateSlide(category, images, dots);
        startAutoPlay(category);
    }
}

function updateSlide(category, images, dots) {
    // Remove all active classes
    images.forEach(img => {
        img.style.opacity = '0';
        img.classList.remove('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active classes and fade in
    const currentImage = images[currentSlides[category]];
    const currentDot = dots[currentSlides[category]];
    
    currentImage.classList.add('active');
    currentDot.classList.add('active');
    
    // Force reflow for animation
    void currentImage.offsetWidth;
    
    // Fade in new slide
    currentImage.style.opacity = '1';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        categories.forEach(category => {
            stopAutoPlay(category);
            changeSlide(category, -1);
            startAutoPlay(category);
        });
    } else if (e.key === 'ArrowRight') {
        categories.forEach(category => {
            stopAutoPlay(category);
            changeSlide(category, 1);
            startAutoPlay(category);
        });
    }
});

// Pause autoplay when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        categories.forEach(category => stopAutoPlay(category));
    } else {
        categories.forEach(category => startAutoPlay(category));
    }
});

// Prevent image drag
document.querySelectorAll('.carousel-image').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});