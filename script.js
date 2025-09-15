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
// Language handling
// -------------------------
let translations = {};

// Load languages.json
fetch('languages.json')
  .then(response => response.json())
  .then(data => {
    translations = data;
    applyLanguage('en'); // default language
  })
  .catch(err => console.error("Error loading languages.json:", err));

document.getElementById('languageSelect').addEventListener('change', function() {
  applyLanguage(this.value);
});

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  // Header & nav
  document.getElementById('site-title').textContent = t.title;
  document.getElementById('site-subtitle').textContent = t.subtitle;
  document.getElementById('nav-home').textContent = t.navHome;
  document.getElementById('nav-about').textContent = t.navAbout;
  document.getElementById('nav-contact').textContent = t.navContact;

  // Welcome / ReCAPTCHA
  document.getElementById('welcome-title').textContent = t.welcomeTitle;
  document.getElementById('welcome-text').textContent = t.welcomeText;

  // Tracking form & tips
  trackingNumberInput.placeholder = t.labelTracking;
  document.getElementById('tip-text').textContent = t.tipText;
  document.getElementById('special-text').textContent = t.specialText;
  document.getElementById('track-btn').textContent = t.trackBtn;

  // Tracking steps
  document.getElementById('step-placed').querySelector('span').textContent = t.stepPlaced;
  document.getElementById('step-shipped').querySelector('span').textContent = t.stepShipped;
  document.getElementById('step-transit').querySelector('span').textContent = t.stepTransit;
  document.getElementById('step-delivered').querySelector('span').textContent = t.stepDelivered;

  // Shipment labels
  document.getElementById('label-tracking').textContent = t.labelTracking;
  document.getElementById('label-sender').textContent = t.labelSender;
  document.getElementById('label-receiver').textContent = t.labelReceiver;
  document.getElementById('label-estimated').textContent = t.labelEstimated;

  // Products
  document.getElementById('products-title').textContent = t.productsTitle;
  document.getElementById('prod1-title').textContent = t.prod1Title;
  document.getElementById('prod1-text').textContent = t.prod1Text;
  document.getElementById('prod1-btn').textContent = t.prod1Btn;
  document.getElementById('prod2-title').textContent = t.prod2Title;
  document.getElementById('prod2-text').textContent = t.prod2Text;
  document.getElementById('prod2-btn').textContent = t.prod2Btn;
  document.getElementById('prod3-title').textContent = t.prod3Title;
  document.getElementById('prod3-text').textContent = t.prod3Text;
  document.getElementById('prod3-btn').textContent = t.prod3Btn;
  document.getElementById('prod4-title').textContent = t.prod4Title;
  document.getElementById('prod4-text').textContent = t.prod4Text;
  document.getElementById('prod4-btn').textContent = t.prod4Btn;

  // About
  document.getElementById('about-title').textContent = t.aboutTitle;
  document.getElementById('about-text').textContent = t.about;

  // Contact
  document.getElementById('contact-title').textContent = t.contactTitle;
  document.getElementById('contact-text').textContent = t.contact;
  document.getElementById('whatsapp-btn').textContent = t.whatsappBtn;
  document.getElementById('email-btn').textContent = t.emailBtn;

  // Footer
  document.getElementById('footer-text').textContent = t.footer;
}

// -------------------------
// Tracking form logic
// -------------------------
trackingForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const trackingNumber = trackingNumberInput.value.trim();

  // Validate format: Track- followed by 6-10 digits
  const regex = /^Track-\d{6,10}$/i;
  if (!regex.test(trackingNumber)) {
    shakeInput();
    return;
  }

  // Reset UI
  trackingSteps.classList.add('hidden');
  shipmentContainer.style.display = "none";
  trackingSteps.querySelectorAll('li').forEach(step => {
    step.classList.remove('show');
    step.style.backgroundColor = "";
  });

  // Show spinner
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";

    if (trackingNumber === correctTrackingNumber) {
      trackingSteps.classList.remove('hidden');

      // Sequential highlight
      const steps = trackingSteps.querySelectorAll('li');
      setTimeout(() => { steps[0].classList.add('show'); steps[0].style.backgroundColor="lightblue"; }, 500);
      setTimeout(() => { steps[1].classList.add('show'); steps[1].style.backgroundColor="lightblue"; }, 1500);
      setTimeout(() => { steps[2].classList.add('show'); steps[2].style.backgroundColor="lightblue"; shipmentContainer.style.display="block"; }, 2500);
      setTimeout(() => { steps[3].classList.add('show'); steps[3].style.backgroundColor="lightblue"; }, 3500);

      // Fill tracking number in table
      document.getElementById('trackingNumber').textContent = trackingNumber;
    } else {
      shakeInput();
    }

  }, 1000);
});

// Shake animation for wrong input
function shakeInput() {
  trackingNumberInput.classList.add("shake");
  setTimeout(() => {
    trackingNumberInput.classList.remove("shake");
  }, 500);
}
