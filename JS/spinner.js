// Show spinner immediately when the page starts reloading
window.addEventListener('load', () => {
    const spinnerContainer = document.querySelector('.spinner-container');

    // Show the spinner if not already visible
    spinnerContainer.classList.remove('hidden');

    // Simulate a delay to hide the spinner after content is loaded
    setTimeout(() => {
        spinnerContainer.classList.add('hidden'); // Hide the spinner after 3 seconds
    }, 3000); // Adjust this time as per your needs
});
