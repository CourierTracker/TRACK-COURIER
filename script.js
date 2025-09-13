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

    // Validate format
    const regex = /^Track-\d{6,10}$/i;
    if (!regex.test(trackingNumber)) {
        alert("Invalid tracking number! Use format: Track-246800000");
        return;
    }

    // Reset
    shipmentContainer.style.display = "none";
    statusDiv.textContent = "";
    const steps = trackingSteps.querySelectorAll('li');
    steps.forEach(step => step.classList.remove('in-transit'));
    trackingSteps.classList.remove('hidden');

    // Show spinner
    spinner.style.display = "block";
    let dots = 0;
    statusDiv.textContent = "🔍 Tracking your package";
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        statusDiv.textContent = "🔍 Tracking your package" + ".".repeat(dots);
    }, 500);

    // Sequential step highlighting
    setTimeout(() => steps[0].classList.add('in-transit'), 2000); // Placed
    setTimeout(() => steps[1].classList.add('in-transit'), 4000); // Shipped
    setTimeout(() => {
        clearInterval(loadingInterval);
        spinner.style.display = "none";
        if (trackingNumber === correctTrackingNumber) {
            steps[2].classList.add('in-transit'); // In Transit
            shipmentContainer.style.display = "block";
            statusDiv.textContent = "✅ Shipment found!";
        } else {
            statusDiv.textContent = "❌ No results for this tracking number.";
        }
    }, 6000);
    setTimeout(() => steps[3].classList.add('in-transit'), 8000); // Delivered
});

// =======================
// Translation Logic
// =======================
async function loadLanguage(lang) {
    try {
        const response = await fetch("languages.json");
        const translations = await response.json();
        const t = translations[lang];

        // Header
        document.getElementById("site-title").textContent = t.title;
        document.getElementById("site-subtitle").textContent = t.subtitle;
        document.getElementById("nav-home").textContent = t.navHome;
        document.getElementById("nav-about").textContent = t.navAbout;
        document.getElementById("nav-contact").textContent = t.navContact;

        // reCAPTCHA overlay
        document.getElementById("welcome-title").textContent = t.welcomeTitle;
        document.getElementById("welcome-text").textContent = t.welcomeText;

        // Tracking steps
        document.querySelector("#step-placed span").textContent = t.stepPlaced;
        document.querySelector("#step-shipped span").textContent = t.stepShipped;
        document.querySelector("#step-transit span").textContent = t.stepTransit;
        document.querySelector("#step-delivered span").textContent = t.stepDelivered;

        // Tracking labels
        document.getElementById("label-tracking").textContent = t.labelTracking;
        document.getElementById("label-sender").textContent = t.labelSender;
        document.getElementById("label-receiver").textContent = t.labelReceiver;
        document.getElementById("label-estimated").textContent = t.labelEstimated;

        // Buttons
        document.getElementById("track-btn").textContent = t.trackBtn;

        // Extra texts
        document.getElementById("tip-text").textContent = t.tipText;
        document.getElementById("special-text").textContent = t.specialText;
        document.getElementById("premium-text").textContent = t.premiumText;

        // Products
        document.getElementById("products-title").textContent = t.productsTitle;
        document.getElementById("prod1-title").textContent = t.prod1Title;
        document.getElementById("prod1-text").textContent = t.prod1Text;
        document.getElementById("prod1-btn").textContent = t.prod1Btn;
        document.getElementById("prod2-title").textContent = t.prod2Title;
        document.getElementById("prod2-text").textContent = t.prod2Text;
        document.getElementById("prod2-btn").textContent = t.prod2Btn;
        document.getElementById("prod3-title").textContent = t.prod3Title;
        document.getElementById("prod3-text").textContent = t.prod3Text;
        document.getElementById("prod3-btn").textContent = t.prod3Btn;
        document.getElementById("prod4-title").textContent = t.prod4Title;
        document.getElementById("prod4-text").textContent = t.prod4Text;
        document.getElementById("prod4-btn").textContent = t.prod4Btn;

        // About
        document.getElementById("about-title").textContent = t.aboutTitle;
        document.getElementById("about-text").textContent = t.about;

        // Contact
        document.getElementById("contact-title").textContent = t.contactTitle;
        document.getElementById("contact-text").textContent = t.contact;
        document.getElementById("whatsapp-btn").textContent = t.whatsappBtn;
        document.getElementById("email-btn").textContent = t.emailBtn;

        // Footer
        document.getElementById("footer-text").textContent = t.footer;
    } catch (error) {
        console.error("Error loading language:", error);
    }
}

document.getElementById("languageSelect").addEventListener("change", function () {
    loadLanguage(this.value);
});
