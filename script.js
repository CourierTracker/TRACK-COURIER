const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');

// Read current step from hidden input
const currentStepInput = document.getElementById('currentStep');

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
        step.style.backgroundColor = "";
    });

    // 🔹 Read value from hidden input
    const currentStep = parseInt(currentStepInput.value);

    // Highlight all steps up to currentStep
    for (let i = 0; i < currentStep; i++) {
        steps[i].classList.add('show');
        steps[i].style.backgroundColor = "lightblue";
    }

    // Show shipment details only for the correct tracking number
    if (trackingNumber === "Track-246800000") {
        shipmentContainer.style.display = "block";
    } else {
        shipmentContainer.style.display = "none";
        alert("Tracking number not found!");
    }
});
