// script.js
// Create the map centered on Tanzania
var map = L.map('map').setView([-6.369028, 34.888822], 6); // Coordinates for Tanzania center and zoom level

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adding markers for popular tourist attractions in Tanzania
var attractions = [
    { lat: -3.07085, lng: 37.35572, title: "Serengeti National Park" },
    { lat: -3.2237, lng: 35.3963, title: "Ngorongoro Crater" },
    { lat: -3.0674, lng: 37.3558, title: "Mount Kilimanjaro" },
    { lat: -6.4923, lng: 39.3032, title: "Zanzibar Island" },
    { lat: -7.9601, lng: 39.2673, title: "Selous Game Reserve" }
];

// Loop through attractions to add markers
attractions.forEach(function(location) {
    L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup("<b>" + location.title + "</b>")
        .openPopup();
});
