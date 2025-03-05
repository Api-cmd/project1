function toggleActivities(targetId, btn) {
    const cards = document.querySelectorAll(`#${targetId} .activity-card:nth-child(n+7)`);

    if (btn.textContent === 'Show More') {
        cards.forEach(card => {
            card.style.display = 'block';
        });
        btn.textContent = 'Show Less';
    } else {
        cards.forEach(card => {
            card.style.display = 'none';
        });
        btn.textContent = 'Show More';
    }
}

window.addEventListener('load', () => {
    // Handle "Show More" buttons
    const showMoreBtns = document.querySelectorAll('.show-more-btn');
    showMoreBtns.forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        const cards = document.querySelectorAll(`#${targetId} .activity-card`);
        const totalCards = cards.length;

        if (totalCards <= 6) {
            btn.style.display = 'none'; // Hide button if there are 6 or fewer cards
        } else {
            cards.forEach((card, index) => {
                if (index >= 6) {
                    card.style.display = 'none'; // Hide cards beyond the 6th one
                }
            });
        }

        btn.addEventListener('click', () => {
            toggleActivities(targetId, btn);
        });
    });
// Animate counters only when they become visible
const counters = document.querySelectorAll('.stat-value');

const animateCounter = (counter) => {
    const updateCount = () => {
        // Extract numeric part from data-target
        const targetString = counter.getAttribute('data-target');
        const target = parseFloat(targetString.replace(/[^0-9.]/g, '')); // Remove non-numeric characters
        const suffix = targetString.replace(/[0-9.]/g, ''); // Extract suffix like 'm' or '+'

        const count = parseFloat(counter.innerText.replace(/[^0-9.]/g, '')) || 0; // Start value as number
        const increment = target / 200; // Control the speed of animation

        if (count < target) {
            counter.innerText = `${Math.ceil(count + increment)}${suffix}`;
            setTimeout(updateCount, 10); // Recursive call
        } else {
            counter.innerText = `${target.toLocaleString()}${suffix}`; // Format with commas and suffix
        }
    };
    updateCount();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            counterObserver.unobserve(counter); // Stop observing after animation
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// Ensure grid layout for activity sections is responsive
const activitySections = document.querySelectorAll('.activities');
activitySections.forEach(section => {
    const cardCount = section.querySelectorAll('.activity-card').length;

    if (cardCount === 1) {
        section.style.gridTemplateColumns = '1fr'; // Single column for one activity
    } else if (cardCount === 2) {
        section.style.gridTemplateColumns = 'repeat(2, 1fr)'; // Two columns for two activities
    } else {
        section.style.gridTemplateColumns = 'repeat(3, 1fr)'; // Default three columns for three or more
    }

    // Add a responsive class for media query compatibility
    section.classList.add('grid-responsive');
});


});
