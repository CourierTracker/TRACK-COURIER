const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const spinner = document.getElementById('spinner');

const correctTrackingNumber = "Track-246800000";

trackingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const trackingNumber = trackingNumberInput.value.trim();

  // Validate format
  const regex = /^Track-\d{6,10}$/i;
  if (!regex.test(trackingNumber)) {
    trackingNumberInput.classList.add("shake");
    setTimeout(() => trackingNumberInput.classList.remove("shake"), 500);
    alert("Invalid tracking number! Use format: Track-246800000");
    return;
  }

  // Show spinner
  spinner.style.display = "block";
  shipmentContainer.style.display = "none";
  trackingSteps.classList.remove("hidden");

  const steps = trackingSteps.querySelectorAll('li');
  steps.forEach(step => step.classList.remove('show'));

  // After 7 seconds, show In Transit if correct
  setTimeout(() => {
    spinner.style.display = "none";
    if (trackingNumber === correctTrackingNumber) {
      steps[2].classList.add('show');
      shipmentContainer.style.display = "block";
    } else {
      alert("Tracking number not found!");
    }
  }, 7000);
});
