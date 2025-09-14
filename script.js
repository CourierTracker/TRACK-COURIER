const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const spinner = document.getElementById('spinner');

const correctTrackingNumber = "Track-246800000";

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = trackingNumberInput.value.trim();

    // Validate format: Track- followed by digits
    const regex = /^Track-\d{6,10}$/i;
    if (!regex.test(trackingNumber)) {
        shakeInput();
        return;
    }

    // Reset UI
    trackingSteps.classList.add('hidden');
    shipmentContainer.style.display = "none";

    // Show spinner
    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display = "none";
        trackingSteps.classList.remove('hidden');

        const steps = trackingSteps.querySelectorAll('li');
        steps.forEach(step => {
            step.classList.remove('show');
            step.style.backgroundColor = "";
        });

        if (trackingNumber === correctTrackingNumber) {
            // Sequential highlight
            setTimeout(() => {
                steps[0].classList.add('show');
                steps[0].style.backgroundColor = "lightblue";
            }, 1000);

            setTimeout(() => {
                steps[1].classList.add('show');
                steps[1].style.backgroundColor = "lightblue";
            }, 4000);

            setTimeout(() => {
                steps[2].classList.add('show');
                steps[2].style.backgroundColor = "lightblue";
                shipmentContainer.style.display = "block";
            }, 8000);

        } else {
            // Wrong number → shake only
            shakeInput();
        }
    }, 1000); // spinner time
});

function shakeInput() {
    trackingNumberInput.classList.add("shake");
    setTimeout(() => {
        trackingNumberInput.classList.remove("shake");
    }, 500);
}
