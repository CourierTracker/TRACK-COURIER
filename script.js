const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = trackingNumberInput.value.trim();

    // Validate format: Track- followed by digits
    const regex = /^Track-\d{6,10}$/i;
    if (!regex.test(trackingNumber)) {
        alert("Invalid tracking number! Use format: Track-246800000");
        return;
    }

    // Show steps container
    trackingSteps.classList.remove('hidden');
    const steps = trackingSteps.querySelectorAll('li');

    // Reset all steps
    steps.forEach(step => {
        step.classList.remove('show');
        step.style.backgroundColor = ""; // clear previous highlight
    });

    // Only show "In Transit" step (3rd step)
    steps[2].classList.add('show');

    // Highlight "In Transit" if correct tracking number
    if (trackingNumber === "Track-246800000") {
        steps[2].style.backgroundColor = "lightblue";
    }
});

function searchTracking() {
  const input = document.getElementById('trackingInput').value.trim();
  const container = document.getElementById('shipmentContainer');
  
  // Replace this with the tracking number you want to match
  const correctTracking = "Track-246800000";
  
  if (input === correctTracking) {
    container.style.display = "block";

    // Also highlight "In Transit" step when found
    const steps = trackingSteps.querySelectorAll('li');
    if (steps[2]) {
      steps[2].style.backgroundColor = "lightblue";
    }
  } else {
    container.style.display = "none";
    alert("Tracking number not found!");
  }
}
