document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm2');
    const bookingSection = document.getElementById('bookingSection');
    const appreciationSection = document.getElementById('appreciationSection');

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animate form submission
        bookingSection.style.opacity = '0';
        bookingSection.style.transform = 'translateY(-20px)';
        
        // Show appreciation section
        appreciationSection.setAttribute('aria-hidden', 'false');
        
        // Optional: Submit form data via AJAX
        const formData = new FormData(bookingForm);
        fetch('save_Packages.php', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).catch(error => {
            console.error('Error:', error);
        });
    });
});

function resetBooking(event) {
    event.preventDefault();
    
    const bookingSection = document.getElementById('bookingSection');
    const appreciationSection = document.getElementById('appreciationSection');
    const bookingForm = document.getElementById('bookingForm2');
    
    // Hide appreciation section
    appreciationSection.setAttribute('aria-hidden', 'true');
    
    // Reset and show booking form
    bookingForm.reset();
    bookingSection.style.opacity = '1';
    bookingSection.style.transform = 'translateY(0)';
    
    // Smooth scroll to booking section
    bookingSection.scrollIntoView({ behavior: 'smooth' });
}

// Add form validation and interactive feedback
const formInputs = document.querySelectorAll('.cta-form input, .cta-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.closest('.form-group').classList.remove('focused');
        }
    });
});