document.addEventListener("DOMContentLoaded", function () {
    function toggleNavDisplay() {
        const navLinks = document.querySelector(".nav-links");
        const navSelectContainer = document.getElementById("nav-select-container");

        if (!navLinks || !navSelectContainer) {
            console.error("Navigation elements not found");
            return;
        }

        if (window.innerWidth <= 768) {
            navLinks.classList.remove("active"); // Ensure it's hidden initially
            navSelectContainer.style.display = "block"; // Show select input
        } else {
            navLinks.classList.remove("active"); // Remove any active class on large screens
            navLinks.style.display = "flex"; // Ensure links are shown on large screens
            navSelectContainer.style.display = "none"; // Hide select input
        }
    }

    function setSelectOptionBasedOnPage() {
        const currentPath = window.location.pathname;
        const selectInput = document.getElementById("nav-select");

        for (let i = 0; i < selectInput.options.length; i++) {
            if (selectInput.options[i].value === currentPath.substring(currentPath.lastIndexOf("/") + 1)) {
                selectInput.selectedIndex = i;
                break;
            }
        }
    }

    function reduceVideoSpeed() {
        const bgVideo = document.getElementById("bgVideo");
        if (bgVideo) {
            bgVideo.playbackRate = 0.5;
        }
    }

    // Toggle menu visibility on small devices
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active"); // Toggle visibility
    
            // Toggle icon change
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });
    }
    
    // Run functions on load
    toggleNavDisplay();
    setSelectOptionBasedOnPage();
    reduceVideoSpeed();

    // Run toggleNavDisplay on window resize
    window.addEventListener("resize", toggleNavDisplay);
});
