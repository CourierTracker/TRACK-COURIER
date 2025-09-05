const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const trackingNumber = trackingNumberInput.value.trim();

    if(trackingNumber === "") {
        alert("Please enter a tracking number.");
        return;
    }

    // Show steps container
    trackingSteps.classList.remove('hidden');
    const steps = trackingSteps.querySelectorAll('li');

    // Reset steps
    steps.forEach(step => {
        step.classList.remove('show', 'delivered');
    });

    // Animate each step
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('show');
            if (index === steps.length - 1) {
                step.classList.add('delivered'); // last step green
            }
        }, index * 900);
    });
});
