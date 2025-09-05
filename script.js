const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page refresh

    const trackingNumber = trackingNumberInput.value.trim();

    if(trackingNumber === "") {
        alert("Please enter a tracking number.");
        return;
    }

    // Show tracking steps after searching
    trackingSteps.classList.remove('hidden');

    // Highlight last step (Delivered) in green
    const steps = trackingSteps.querySelectorAll('li');
    steps.forEach(step => step.style.borderColor = '#3498db'); // reset all to blue
    steps[steps.length - 1].style.borderColor = '#2ecc71'; // green for Delivered
});
