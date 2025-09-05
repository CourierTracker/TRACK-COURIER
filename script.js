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

    // Hide steps first
    trackingSteps.classList.remove('hidden');
    const steps = trackingSteps.querySelectorAll('li');
    steps.forEach(step => {
        step.style.display = 'none'; // hide all steps
        step.style.borderColor = '#3498db'; // reset color
    });

    // Animate steps one by one
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.display = 'block';
            // Last step in green
            if(index === steps.length - 1) {
                step.style.borderColor = '#2ecc71';
            }
        }, index * 800); // 800ms between steps
    });
});
