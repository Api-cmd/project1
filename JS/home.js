document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.hero-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let isTransitioning = false;
    const transitionDuration = 1500; // Match this with CSS animation duration
    const intervalDuration = 5000;

    function updateImage() {
        if (isTransitioning) return;

        isTransitioning = true;

        // Remove active class from current image and indicator
        images[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');

        // Update index
        currentIndex = (currentIndex + 1) % images.length;

        // Add active class to new image and indicator
        images[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');

        // Reset isTransitioning after transition duration
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDuration);
    }

    // Start the interval
    setInterval(updateImage, intervalDuration);
});
