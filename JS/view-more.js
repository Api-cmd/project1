
// Modal functionality
const modal = document.getElementById('accommodationModal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');

const accommodations = {
    silver: {
        title: 'Silver Tier Accommodation',
        image: '../../HomeImage/Accomodation/silver1.jpg',
        description: `
            <h3>Essential Comfort</h3>
            <p>Our Silver Tier accommodations offer comfortable lodging with all essential amenities. Perfect for travelers who appreciate authenticity and good value.</p>
            <ul>
                <li>Comfortable private rooms</li>
                <li>En-suite bathrooms</li>
                <li>Daily housekeeping</li>
                <li>Restaurant and bar facilities</li>
                <li>Wi-Fi in common areas</li>
            </ul>
        `
    },
    gold: {
        title: 'Gold Tier Accommodation',
        image: '../../HomeImage/Accomodation/gold1.jpg',
        description: `
            <h3>Premium Experience</h3>
            <p>Gold Tier accommodations provide enhanced comfort with additional amenities and services for a more luxurious safari experience.</p>
            <ul>
                <li>Spacious rooms with premium furnishings</li>
                <li>Private balcony or terrace</li>
                <li>Swimming pool access</li>
                <li>Full-service spa</li>
                <li>24/7 room service</li>
            </ul>
        `
    },
    platinum: {
        title: 'Platinum Tier Accommodation',
        image: '../../HomeImage/Accomodation/platinum1.jpg',
        description: `
            <h3>Ultimate Luxury</h3>
            <p>Experience the height of luxury with our Platinum Tier accommodations, featuring exclusive services and premium amenities.</p>
            <ul>
                <li>Luxury suites with panoramic views</li>
                <li>Private plunge pools</li>
                <li>Personal butler service</li>
                <li>Gourmet dining options</li>
                <li>Exclusive game drive vehicles</li>
            </ul>
        `
    }
};

function showAccommodation(tier) {
    const accommodation = accommodations[tier];
    modalTitle.textContent = accommodation.title;
    modalImage.src = accommodation.image;
    modalDescription.innerHTML = accommodation.description;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}


// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Show More button functionality
const showMoreButton = document.querySelector('.show-more-btn');
const hiddenRegions = document.querySelectorAll('.region.hidden');

showMoreButton.addEventListener('click', () => {
    hiddenRegions.forEach(region => {
        region.classList.toggle('hidden');
    });
    showMoreButton.textContent = showMoreButton.textContent === 'Show More' ? 'Show Less' : 'Show More';
});


