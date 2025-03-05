emailForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const packageName = document.getElementById('packageName').textContent;

    const mailtoLink = `mailto:info@yourwebsite.com?subject=Request for ${packageName}&body=Email: ${email}%0A%0A${message}`;
    window.location.href = mailtoLink;
});


