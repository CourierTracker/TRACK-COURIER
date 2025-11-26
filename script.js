// -------------------------
// On page load
// -------------------------
window.onload = function() {
  document.getElementById('recaptcha-overlay').classList.remove('hidden');
};

// -------------------------
// Elements
// -------------------------
const trackingForm = document.getElementById('trackingForm');
const trackingSteps = document.getElementById('trackingSteps');
const trackingNumberInput = document.getElementById('tracking-number');
const shipmentContainer = document.getElementById('shipmentContainer');
const spinner = document.getElementById('spinner');

// Only this tracking number is valid
const correctTrackingNumber = "Track-246800000";

// -------------------------
// Translations
// -------------------------
const translations = {
  "en": { /* ... your English JSON content ... */ },
  "fr": { /* ... your French JSON content ... */ },
  "es": { /* ... your Spanish JSON content ... */ },
  "de": { /* ... your German JSON content ... */ },
  "zh": { /* ... your Chinese JSON content ... */ }
};

// -------------------------
// Language switching
// -------------------------
  function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Header / Nav
  setText('nav-home', t.navHome);
  setText('nav-about', t.navAbout);
  setText('nav-services', t.navServices);
  setText('nav-contact', t.navContact);

  // Welcome overlay
  setText('welcome-title', t.welcomeTitle);
  setText('welcome-text', t.welcomeText);

  // Tracking tips
  setText('tip-text', t.tipText);
  setText('special-text', t.specialText);
  setText('track-btn', t.trackBtn);

  // Tracking steps (update the <span> inside each li)
  document.getElementById('step-placed')?.querySelector('span')?.textContent = t.stepPlaced;
  document.getElementById('step-shipped')?.querySelector('span')?.textContent = t.stepShipped;
  document.getElementById('step-transit')?.querySelector('span')?.textContent = t.stepTransit;
  document.getElementById('step-delivered')?.querySelector('span')?.textContent = t.stepDelivered;

  // Tracking form labels
  const emailLabel = document.querySelector("label[for='customerEmail']");
  if (emailLabel) emailLabel.textContent = t.emailLabel;

  // Products
  setText('products-title', t.productsTitle);
  setText('prod1-title', t.prod1Title);
  setText('prod1-text', t.prod1Text);
  setText('prod2-title', t.prod2Title);
  setText('prod2-text', t.prod2Text);
  setText('prod3-title', t.prod3Title);
  setText('prod3-text', t.prod3Text);
  setText('prod4-title', t.prod4Title);
  setText('prod4-text', t.prod4Text);

  // About & Contact
  setText('about-title', t.aboutTitle);
  setText('about-text', t.about);
  setText('contact-title', t.contactTitle);
  setText('contact-text', t.contact);

  // Buttons
  setText('whatsapp-float', t.whatsappBtn);
  setText('email-btn', t.emailBtn);

  // Footer
  setText('footer-text', t.footer);
}

// Set default language
setLanguage('en');

// Listen to language selector
const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
  languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
}

// -------------------------
// Tracking form logic
// -------------------------
trackingForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const trackingNumber = trackingNumberInput.value.trim();

  // Validate format
  const regex = /^Track-\d{6,10}$/i;
  if (!regex.test(trackingNumber)) {
    showError("❌ Invalid tracking number! Please try again.");
    return;
  }

  // Reset UI
  trackingSteps.classList.add('hidden');
  shipmentContainer.style.display = "none";
  trackingSteps.querySelectorAll('li').forEach(step => {
    step.classList.remove('show');
    step.style.backgroundColor = "";
    step.style.fontWeight = "normal";
  });

  // Show spinner
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";

    if (trackingNumber === correctTrackingNumber) {
      trackingSteps.classList.remove('hidden');
      const steps = trackingSteps.querySelectorAll('li');

      setTimeout(() => { steps[0].classList.add('show'); steps[0].style.backgroundColor = "lightblue"; }, 3000);
      setTimeout(() => { steps[1].classList.add('show'); steps[1].style.backgroundColor = "lightblue"; }, 6000);
      setTimeout(() => { 
        steps[2].classList.add('show'); 
        steps[2].style.backgroundColor = "lightblue"; 
        steps[2].style.fontWeight = "bold";
        shipmentContainer.style.display = "block";
        shipmentContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 10000);

    } else {
      showError("❌ Invalid tracking number! Please try again.");
    }

  }, 500);
});

// -------------------------
// Helper: Shake input and show error
// -------------------------
function shakeInput() {
  trackingNumberInput.classList.add("shake");
  setTimeout(() => trackingNumberInput.classList.remove("shake"), 500);
}

function showError(message) {
  shakeInput();
  alert(message);
}

function onRecaptchaSuccess(token) {
  const overlay = document.getElementById('recaptcha-overlay');
  if (overlay) overlay.style.display = 'none';
}
