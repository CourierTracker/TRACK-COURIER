const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = trackingNumberInput.value.trim();

    // Validate format: Track- followed by digits
    const regex = /^Track-\d{6,10}$/i;
    if (!regex.test(trackingNumber)) {
        alert("Invalid tracking number! Use format: Track-123456789");
        return;
    }

    // Show steps container
    trackingSteps.classList.remove('hidden');
    const steps = trackingSteps.querySelectorAll('li');

    // Hide all steps first
    steps.forEach(step => step.classList.remove('show', 'delivered'));

    // Only show "In Transit" step (3rd step)
    const inTransitStep = steps[2]; // 0 = Order Placed, 1 = Shipped, 2 = In Transit
    inTransitStep.classList.add('show');
});
