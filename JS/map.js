document.addEventListener('DOMContentLoaded', function() {
    // Initialize map with error handling
    let map;
    try {
        map = L.map('map', {
            center: [-6.369028, 34.888822],
            zoom: 6,
            zoomControl: true,
            scrollWheelZoom: false // Prevent accidental zooming
        });
    } catch (error) {
        console.error('Map initialization failed:', error);
        return;
    }

    // Add OpenStreetMap tiles with fallback
    try {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            errorTileUrl: 'path/to/fallback-tile.png' // Add a fallback tile image
        }).addTo(map);
    } catch (error) {
        console.error('Tile layer failed:', error);
    }

    // Custom icon creation with type-specific styling
    function createCustomIcon(type, temp) {
        const iconColors = {
            'national-park': { bg: '#80ff80', border: '#008000', text: '#008000' },
            'mountain': { bg: '#d3d3d3', border: '#808080', text: '#808080' },
            'beach': { bg: '#add8e6', border: '#000080', text: '#000080' },
            'attraction': { bg: '#ffa500', border: '#805000', text: '#805000' }
        };
        
        const colors = iconColors[type] || iconColors['attraction'];
        
        return L.divIcon({
            className: `custom-icon ${type}`,
            iconSize: [35, 35],
            html: `
                <div class="custom-icon-container" style="background: ${colors.bg}; border-color: ${colors.border}; color: ${colors.text}">
                    ${type[0].toUpperCase()}
                    <span class="weather-badge">${temp}°C</span>
                </div>
            `
        });
    }

    // Location data
    const locations = [/* ... same location data as before ... */];
    
    // Marker management with layer group
    const markerLayer = L.layerGroup().addTo(map);
    const markers = new Map();

    // DOM elements
    const locationList = document.querySelector('.location-list');
    const searchBox = document.querySelector('.search-box');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toggleButton = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const resetBtn = document.createElement('button');

    // Initialize UI components
    function initializeUI() {
        // Reset button
        resetBtn.className = 'filter-btn reset-btn';
        resetBtn.textContent = 'Reset Filters';
        document.querySelector('.location-filter').appendChild(resetBtn);

        // Populate markers and list
        locations.forEach(location => {
            const marker = L.marker([location.lat, location.lon], {
                icon: createCustomIcon(location.type, location.temperature),
                title: location.name
            });
            
            marker.bindPopup(createPopupContent(location), {
                closeButton: true,
                autoClose: false,
                closeOnClick: false
            });
            
            markers.set(location.name, marker);
            markerLayer.addLayer(marker);
            
            locationList.appendChild(createLocationItem(location, marker));
        });
    }

    // Create popup content
    function createPopupContent(location) {
        return `
            <div class="popup-content">
                <h3>${location.name}</h3>
                <p>${location.description}</p>
                <div class="popup-info">
                    <span>Type: ${location.type.replace('-', ' ')}</span>
                    <span>Temp: ${location.temperature}°C</span>
                </div>
            </div>
        `;
    }

    // Create location list item
    function createLocationItem(location, marker) {
        const item = document.createElement('div');
        item.className = `location-item ${location.type}`;
        item.innerHTML = `
            <div class="location-info">
                <span class="location-name">${location.name}</span>
                <span class="location-temp">${location.temperature}°C</span>
            </div>
            <span class="location-type">${location.type.replace('-', ' ')}</span>
        `;
        
        item.addEventListener('click', () => {
            map.flyTo([location.lat, location.lon], 10, {
                duration: 1
            });
            marker.openPopup();
            item.classList.add('active');
            setTimeout(() => item.classList.remove('active'), 1000);
        });
        
        return item;
    }

    // Debounced search
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Filter and search handlers
    const updateDisplay = () => {
        const searchTerm = searchBox.value.toLowerCase();
        const activeTypes = Array.from(filterButtons)
            .filter(btn => btn.classList.contains('active'))
            .map(btn => btn.dataset.type);

        locations.forEach(location => {
            const marker = markers.get(location.name);
            const item = locationList.querySelector(`.location-item:has(.location-name:contains("${location.name}"))`);
            const matchesSearch = location.name.toLowerCase().includes(searchTerm);
            const matchesFilter = activeTypes.length === 0 || activeTypes.includes(location.type);

            if (matchesSearch && matchesFilter) {
                markerLayer.addLayer(marker);
                item.style.display = 'flex';
            } else {
                markerLayer.removeLayer(marker);
                item.style.display = 'none';
            }
        });
    };

    // Event listeners
    searchBox.addEventListener('input', debounce(updateDisplay, 300));
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            updateDisplay();
        });
    });

    resetBtn.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.add('active'));
        searchBox.value = '';
        updateDisplay();
    });

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        toggleButton.textContent = sidebar.classList.contains('hidden') ? '☰ Show' : '☰ Hide';
        setTimeout(() => map.invalidateSize(), 300);
    });

    // Initialize
    initializeUI();
    updateDisplay();
});