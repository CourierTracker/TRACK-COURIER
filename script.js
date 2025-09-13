// =======================
// Tracking Logic
// =======================
const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const spinner = document.getElementById('spinner');
const statusDiv = document.getElementById('status');

const correctTrackingNumber = "Track-246800000";

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = trackingNumberInput.value.trim();

    // Reset
    shipmentContainer.style.display = "none";
    statusDiv.classList.remove('shake');
    const steps = trackingSteps.querySelectorAll('li');
    steps.forEach(step => step.classList.remove('in-transit'));
    trackingSteps.classList.remove('hidden');

    // Wrong tracking number -> shake
    if (trackingNumber !== correctTrackingNumber) {
        statusDiv.textContent = "❌ Invalid tracking number. Please try again.";
        statusDiv.classList.add('shake');
        setTimeout(() => statusDiv.classList.remove('shake'), 500);
        return;
    }

    // Correct tracking number -> show spinner and simulate tracking
    spinner.style.display = "block";
    let dots = 0;
    statusDiv.textContent = "🔍 Tracking your package";
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        statusDiv.textContent = "🔍 Tracking your package" + ".".repeat(dots);
    }, 500);

    // Sequential steps with 7 seconds total delay before "In Transit"
    setTimeout(() => steps[0].classList.add('in-transit'), 2000); // Order Placed
    setTimeout(() => steps[1].classList.add('in-transit'), 4000); // Shipped
    setTimeout(() => {
        clearInterval(loadingInterval);
        spinner.style.display = "none";
        steps[2].classList.add('in-transit'); // In Transit
        shipmentContainer.style.display = "block";
        document.getElementById('trackingNumber').textContent = trackingNumber;
        statusDiv.textContent = "✅ Package status updated!";
    }, 7000);
    setTimeout(() => steps[3].classList.add('in-transit'), 9000); // Delivered
});
