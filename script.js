// =======================
// Tracking Logic
// =======================
const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const spinner = document.getElementById('spinner');
const statusDiv = document.getElementById('status');

trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = trackingNumberInput.value.trim();

    // Validate format: Track- followed by digits
    const regex = /^Track-\d{6,10}$/i;
    if (!regex.test(trackingNumber)) {
        alert("Invalid tracking number! Use format: Track-246800000");
        return;
    }

    // Show spinner
    spinner.style.display = "block";
    statusDiv.textContent = "";

    setTimeout(() => {
        spinner.style.display = "none";
        trackingSteps.classList.remove('hidden');
        const steps = trackingSteps.querySelectorAll('li');

        // Reset all steps
        steps.forEach(step => {
            step.classList.remove('show');
            step.style.backgroundColor = "";
        });

        // Only show "In Transit" step (3rd step)
        steps[2].classList.add('show');

        if (trackingNumber === "Track-246800000") {
            steps[2].style.backgroundColor = "lightblue";
            shipmentContainer.style.display = "block";
            statusDiv.textContent = "✅ Shipment found!";
        } else {
            shipmentContainer.style.display = "none";
            alert("Tracking number not found!");
            statusDiv.textContent = "❌ No results for this tracking number.";
        }
    }, 2000); // simulate loading
});

// =======================
// Translation Logic
// =======================
async function loadLanguage(lang) {
    try {
        const response = await fetch("languages.json");
        const translations = await response.json();

        // Header
        document.getElementById("site-title").textContent = translations[lang].title;
        document.getElementById("site-subtitle").textContent = translations[lang].subtitle;
        document.getElementById("nav-home").textContent = translations[lang].navHome;
        document.getElementById("nav-about").textContent = translations[lang].navAbout;
        document.getElementById("nav-contact").textContent = translations[lang].navContact;

        // About
        document.getElementById("about-title").textContent = translations[lang].aboutTitle;
        document.getElementById("about-text").textContent = translations[lang].about;

        // Contact
        document.getElementById("contact-title").textContent = translations[lang].contactTitle;
        document.getElementById("contact-text").textContent = translations[lang].contact;

        // Products
        document.getElementById("products-title").textContent = translations[lang].productsTitle;
        document.getElementById("prod1-title").textContent = translations[lang].prod1Title;
        document.getElementById("prod1-text").textContent = translations[lang].prod1Text;
        document.getElementById("prod1-btn").textContent = translations[lang].prod1Btn;

        document.getElementById("prod2-title").textContent = translations[lang].prod2Title;
        document.getElementById("prod2-text").textContent = translations[lang].prod2Text;
        document.getElementById("prod2-btn").textContent = translations[lang].prod2Btn;

        document.getElementById("prod3-title").textContent = translations[lang].prod3Title;
        document.getElementById("prod3-text").textContent = translations[lang].prod3Text;
        document.getElementById("prod3-btn").textContent = translations[lang].prod3Btn;

        document.getElementById("prod4-title").textContent = translations[lang].prod4Title;
        document.getElementById("prod4-text").textContent = translations[lang].prod4Text;
        document.getElementById("prod4-btn").textContent = translations[lang].prod4Btn;

        // Footer
        document.getElementById("footer-text").textContent = translations[lang].footer;
    } catch (error) {
        console.error("Error loading language:", error);
    }
}

document.getElementById("languageSelect").addEventListener("change", function () {
    loadLanguage(this.value);
});
