let currentDay = 1;

function showDetails(day) {
    // Remove active class from all days and details
    document.querySelectorAll('.day').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.day-details').forEach(el => el.classList.remove('active'));

    // Add active class to selected day and details
    document.querySelector(`.day:nth-child(${day})`).classList.add('active');
    document.querySelector(`#day-${day}`).classList.add('active');
    
    currentDay = day;

    // Trigger animation
    const details = document.querySelector(`#day-${day}`);
    details.style.animation = 'fadeSlideIn 0.5s ease forwards';
}

function nextDay() {
    if (currentDay < 4) {
        showDetails(currentDay + 1);
    }
}

function prevDay() {
    if (currentDay > 1) {
        showDetails(currentDay - 1);
    }
}

// Initialize first day as active
document.addEventListener('DOMContentLoaded', () => {
    showDetails(1);
});

