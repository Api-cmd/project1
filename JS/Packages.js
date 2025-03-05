const tours = [
    {
        id: 1,
        title: "4-Day Tanzania Safari Extension",
        price: 2926,
        duration: 4,
        tripType: "safari",
        image: "../HomeImage/lion-on-tree2.jpg",
        route: "",
        features: ["24/7 service", "All accommodations"],
         viewUrl: "../Home/View-more/4-days-general.html",
        bookUrl: "../Home/book-now.html"
    },
    {
        id: 2,
        title: "7 Days Safari Tanzania",
        price: 2926,
        duration: 7,
        tripType: "safari",
        image: "../HomeImage/lions.jpg",
        route: "Arusha ➤ Lake Manyara ➤ Serengeti ➤ Ngorongoro ➤ Moshi",
        features: ["24/7 service", "All accommodations"],
          viewUrl: "../Home/View-more/7-days-general.html",
        bookUrl: "../Home/book-now.html"
    },
    {
        id: 3,
        title: "8 Days Tanzania Holiday",
        price: 2926,
        duration: 8,
        tripType: "safari",
        image: "../HomeImage/game-reserve-serengeti.jpg",
        route: "Arusha ➤ Tarangire ➤ Serengeti ➤ Ngorongoro ➤ Moshi",
        features: ["24/7 service", "All accommodations"],
        viewUrl: "../Home/View-more/8-days-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 4,
        title: "8-Day Kilimanjaro Climb – Marangu Route (5-Day)",
        price: 2926,
        duration: 8,
        tripType: "climbing",
        image: "../HomeImage/Mount Kilimanjaro National Park trekking.jpg",
        route: "",
        features: ["24/7 service", "All accommodations","Park fees","Pickup and transfer airpot"],
        viewUrl: "../Home/View-more/8-days-kilimanjaro.machame-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 5,
        title: "9-Day Kilimanjaro Climb – Marangu Route (5-Day)",
        price: 2926,
        duration: 9,
        tripType: "climbing",
        image: "../HomeImage/Mount Kilimanjaro National Park tents.jpg",
        route: "",
        features: ["24/7 service", "All accommodations","Park fees","Pickup and transfer airpot"],
        viewUrl: "../Home/View-more/9-days-kilimanjaro-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 6,
        title: "9-Day Kilimanjaro Climb – Lemosho-Shira Route (6-Day)",
        price: 2926,
        duration: 9,
        tripType: "climbing",
        image: "../HomeImage/Mount Kilimanjaro National Park hiking to Kibo.jpg",
        route: "",
        features: ["24/7 service", "All accommodations","Park fees","Pickup and transfer airpot"],
        viewUrl: "../Home/View-more/9-days-kilimanjaro.lemosho-general.html",
      bookUrl: "../Home/book-now.html"
        
    },
    {
        id: 7,
        title: "9 Days Safari Vacation [Includes Wildebeest Migration]",
        price: 2926,
        duration: 9,
        tripType: "safari",
        image: "../HomeImage/wild b.jpg",
        route: "",
        features: ["24/7 service", "All accommodations","Park fees","Pickup and transfer airpot"],
        viewUrl: "../Home/View-more/9-days-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 8,
        title: "9 Days Safari Vacation [Witness the famous Wildebeest Migration at Mara River crossing.]",
        price: 2926,
        duration: 9,
        tripType: "safari",
        image: "../HomeImage/Lion2car.jpg",
        route: " Arusha ➤ Tarangire ➤ Serengeti ➤ Ngorongoro ➤ Moshi ",
        
        features: ["24/7 service", "All accommodations"],
        viewUrl: "../Home/View-more/9sec-days-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 9,
        title: "10-Day Kilimanjaro Climb – Machame Route (7-Day)",
        price: 2926,
        duration: 10,
        tripType: "climbing",
        image: "../HomeImage/Mount Kilimanjaro National Park peak.jpg",
        route: "",
        features: ["24/7 service", "All accommodations","Park fees","Pickup and transfer airpot"],
        viewUrl: "../Home/View-more/10-days-kilimanjaro-machame-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 10,
        title: "10 Days Safari Vacation [Witness the famous Wildebeest Migration at Mara River crossing.]",
        price: 2926,
        duration: 10,
        tripType: "safari",
        image: "../HomeImage/Lion-N.jpg",
        route: "2 days Arusha ➤ Tarangire ➤ Lake Manyara ➤3 days Central Serengeti ➤ Ngorongoro ➤2 days Moshi",
        features: ["24/7 service", "All accommodations"],
        viewUrl: "../Home/View-more/10 Days-Tanzania-safari-all-northern-parks-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 11,
        title: "12 Days Safari & Beach",
        price: 2926,
        duration: 12,
        tripType: "zanzibar",
        image: "../HomeImage/activities/Zanzibar/beach-coconut-1.jpg",
        route: "  Arusha ➤ Tarangire ➤ Serengeti ➤ Zanzibar",
        features: ["24/7 service", "All accommodations"],
        viewUrl: "../Home/View-more/12-days-safari-and-beach-general.html",
      bookUrl: "../Home/book-now.html"
    },
    {
        id: 12,
        title: "13 Days Safari + Zanzibar ",
        price: 2926,
        duration: 13,
        tripType: "zanzibar",
        image: "../HomeImage/activities/Zanzibar/boat.jpg",
        route: "4 days Arusha ➤ Tarangire ➤2 days Central Serengeti ➤Ngorongoro ➤ 5 days Zanzibar",
        features: ["24/7 service", "All accommodations"],
        viewUrl: "../Home/View-more/13 DAYS-SAFARI + ZANZIBAR-GENERAL.html",
      bookUrl: "../Home/book-now.html"
    }
    
    
];
// Filter state
const filters = {
    duration: [],
    tripType: []
};

// Filter labels for display
const filterLabels = {
    '1-5-days': '1 to 5 days',
    '6-11-days': '6 to 11 days',
    '12-plus-days': '12+ Days',
    'safari': 'Safari',
    'climbing': 'Climbing',
    'zanzibar': 'Zanzibar & Beach'
};

// Track current price filter
let currentPrice = 5000;

// Get DOM elements
const toursContainer = document.querySelector('.tours-grid');  // Changed this line
const activeFiltersContainer = document.getElementById('activeFilters');
const resetButton = document.getElementById('resetBtn');  // Changed this line
const priceRange = document.getElementById('priceRange');  // Changed this line
const priceValue = document.getElementById('priceValue');

// Filter tours based on selected criteria
function filterTours() {
    const filteredTours = tours.filter(tour => {
        // Price filter
        if (tour.price > currentPrice) return false;

        // Duration filter
        if (filters.duration.length > 0) {
            const durationMatch = filters.duration.some(range => {
                switch (range) {
                    case '1-5-days':
                        return tour.duration >= 1 && tour.duration <= 5;
                    case '6-11-days':
                        return tour.duration >= 6 && tour.duration <= 11;
                    case '12-plus-days':
                        return tour.duration >= 12;
                    default:
                        return false;
                }
            });
            if (!durationMatch) return false;
        }

        // Trip type filter
        if (filters.tripType.length > 0 && !filters.tripType.includes(tour.tripType)) {
            return false;
        }

        return true;
    });

    displayTours(filteredTours);
}

// Display filtered tours
function displayTours(filteredTours) {
    if (filteredTours.length === 0) {
        toursContainer.innerHTML = `
            <div class="no-results">
                <p>No tours match your criteria. Please adjust your filters.</p>
            </div>
        `;
        return;
    }

    toursContainer.innerHTML = filteredTours.map(tour => `
    <div class="tour-card">
        <div class="tour-image">
            <img src="${tour.image}" alt="${tour.title}">
            <div class="price-badge">
                <i class="fas fa-tag"></i> FROM $${tour.price} USD
            </div>
        </div>
        <div class="tour-content">
            <span class="tour-type">${tour.tripType}</span>
            <h2 class="tour-title">${tour.title}</h2>
            <ul class="tour-features">
                ${tour.features.map(feature => `
                    <li>
                        <i class="fas fa-check"></i>
                        ${feature}
                    </li>
                `).join('')}
                <li>
                    <i class="fas fa-route"></i>
                    ${tour.route}
                </li>
            </ul>
            <div class="tour-actions">
                <a href="${tour.viewUrl}" class="btn btn-primary">
                    <i class="fas fa-eye"></i> View Trip
                </a>
                <a href="${tour.bookUrl}" class="btn btn-outline">Book Now</a>
            </div>
        </div>
    </div>
`).join('');


    }

// Event Listeners
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const category = e.target.dataset.category;
        const value = e.target.id;  // Changed this line to use id instead of value
        
        if (e.target.checked) {
            filters[category].push(value);
        } else {
            filters[category] = filters[category].filter(item => item !== value);
        }
        
        updateActiveFilters();
    });
});

// Create filter tag element
function createFilterTag(category, value, displayText = filterLabels[value]) {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    
    const text = document.createTextNode(displayText);
    tag.appendChild(text);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-tag';
    removeButton.innerHTML = '×';
    
    removeButton.onclick = () => {
        if (category === 'price') {
            currentPrice = 5000;
            priceRange.value = 5000;
            priceValue.textContent = `Up to $${currentPrice}`;
        } else {
            filters[category] = filters[category].filter(item => item !== value);
            const checkbox = document.getElementById(value);
            if (checkbox) checkbox.checked = false;
        }
        updateActiveFilters();
    };

    tag.appendChild(removeButton);
    return tag;
}

// Update active filters display
function updateActiveFilters() {
    activeFiltersContainer.innerHTML = '';

    // Add filter tags for each selected filter
    Object.entries(filters).forEach(([category, selectedFilters]) => {
        selectedFilters.forEach(filter => {
            const filterTag = createFilterTag(category, filter);
            activeFiltersContainer.appendChild(filterTag);
        });
    });

    // Add price filter tag if not at maximum
    if (currentPrice < 5000) {
        const priceTag = createFilterTag('price', currentPrice, `Up to $${currentPrice}`);
        activeFiltersContainer.appendChild(priceTag);
    }

    // Show/hide reset button
    resetButton.style.display = 
        (Object.values(filters).some(arr => arr.length > 0) || currentPrice < 5000)
            ? 'block'
            : 'none';

    // Apply filters
    filterTours();
}

priceRange.addEventListener('input', (e) => {
    currentPrice = parseInt(e.target.value);
    priceValue.textContent = `Up to $${currentPrice}`;
    updateActiveFilters();
});

resetButton.addEventListener('click', () => {
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset filters object
    Object.keys(filters).forEach(key => {
        filters[key] = [];
    });

    // Reset price
    currentPrice = 5000;
    priceRange.value = 5000;
    priceValue.textContent = `Up to $${currentPrice}`;

    updateActiveFilters();
});

// Initialize
updateActiveFilters(); 
