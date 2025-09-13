// =======================
// Tracking Logic
// =======================
const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const statusDiv = document.getElementById('status');

const correctTrackingNumber = "Track-246800000";

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = trackingNumberInput.value.trim();

    // Validate format
    const regex = /^Track-\d{6,10}$/i;
    if (!regex.test(trackingNumber)) {
        alert("Invalid tracking number! Use format: Track-246800000");
        trackingNumberInput.classList.add('vibrate');
        setTimeout(() => trackingNumberInput.classList.remove('vibrate'), 500);
        return;
    }

    // Reset UI
    shipmentContainer.style.display = "none";
    statusDiv.textContent = "";
    const steps = trackingSteps.querySelectorAll('li');
    steps.forEach(step => step.style.backgroundColor = "");
    trackingSteps.classList.remove('hidden');

    if (trackingNumber !== correctTrackingNumber) {
        // Wrong tracking number → vibrate input + show error
        trackingNumberInput.classList.add('vibrate');
        setTimeout(() => trackingNumberInput.classList.remove('vibrate'), 500);
        statusDiv.textContent = "❌ Tracking number not found!";
        return;
    }

    // Correct tracking number → show shipment container
    shipmentContainer.style.display = "block";

    // Sequential highlighting function
    const delays = [3000, 3000, 4000]; // Order Placed, Shipped, In Transit
    steps.forEach((step, index) => {
        const delay = delays.slice(0, index + 1).reduce((a, b) => a + b, 0);
        setTimeout(() => {
            step.style.backgroundColor = "lightblue";
            step.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, delay);
    });
});
