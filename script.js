const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');

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
        step.style.backgroundColor = ""; // clear highlight
    });

    // Only show "Shipped" step (2nd step, index 1)
steps[1].classList.add('show');

    // Highlight if correct tracking number
    if (trackingNumber === "Track-246800000") {
        steps[2].style.backgroundColor = "lightblue";
        shipmentContainer.style.display = "block";
    } else {
        shipmentContainer.style.display = "none";
        alert("Tracking number not found!");
    }
});
