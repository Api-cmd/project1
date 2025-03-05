document.getElementById('submit-btn').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const countryCode = document.getElementById('country-code').value;
  const phoneNumber = document.getElementById('phone-number').value || 'Not provided';
  const communicationMethod = document.getElementById('communication-method').value;
  const tripDays = document.getElementById('trip-days').value;
  const numPeople = document.getElementById('num-people').value;
  const tripDate = document.getElementById('trip-date').value;
  const preferences = Array.from(document.querySelectorAll('input[name="preferences"]:checked'))
                            .map(el => el.nextSibling.textContent.trim());
  const additionalNotes = document.getElementById('additional-notes').value;

  const confirmationSummary = document.getElementById('confirmation-summary');
  confirmationSummary.innerHTML = `
    <li><strong>Full Name:</strong> ${name}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>WhatsApp Number:</strong> ${countryCode} ${phoneNumber}</li>
    <li><strong>Preferred Communication:</strong> ${communicationMethod}</li>
    <li><strong>Number of Days:</strong> ${tripDays}</li>
    <li><strong>Number of People:</strong> ${numPeople}</li>
    <li><strong>Preferred Date:</strong> ${tripDate}</li>
    <li><strong>Preferences:</strong> ${preferences.join(', ') || 'None'}</li>
    <li><strong>Additional Notes:</strong> ${additionalNotes || 'None'}</li>
  `;

  document.getElementById('confirmation-modal').style.display = 'flex';
});

document.getElementById('confirm-edit').addEventListener('click', () => {
  document.getElementById('confirmation-modal').style.display = 'none';
});

document.getElementById('confirm-submit').addEventListener('click', () => {
  document.getElementById('form-body').style.display = 'none';
  document.getElementById('confirmation-modal').style.display = 'none';
  document.getElementById('thank-you').style.display = 'block';
});
