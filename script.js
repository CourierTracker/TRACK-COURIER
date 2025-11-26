window.onload = function() {
  document.getElementById('recaptcha-overlay').classList.remove('hidden');
};// -------------------------
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

      // Sequential highlight with delays
      setTimeout(() => { 
        steps[0].classList.add('show'); 
        steps[0].style.backgroundColor = "lightblue"; 
      }, 3000); // 3 sec

      setTimeout(() => { 
        steps[1].classList.add('show'); 
        steps[1].style.backgroundColor = "lightblue"; 
      }, 6000); // 6 sec

      setTimeout(() => { 
       steps[2].classList.add('show'); 
       steps[2].style.backgroundColor = "lightblue"; 
       steps[2].style.fontWeight = "bold"; // bold In Transit

      // Show the tracking table
    shipmentContainer.style.display = "block"; 

      // Scroll smoothly to the tracking table
    shipmentContainer.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });

  }, 10000); // 10 sec total

      // Delivered step remains untouched
    } else {
      showError("❌ Invalid tracking number! Please try again.");
    }

  }, 500); // spinner initial delay
});

// -------------------------
// Helper: Shake input and show error
// -------------------------
function shakeInput() {
  trackingNumberInput.classList.add("shake");
  setTimeout(() => {
    trackingNumberInput.classList.remove("shake");
  }, 500);
}

function showError(message) {
  shakeInput();
  alert(message); // You can replace this with a div to show error on page
}                
function onRecaptchaSuccess(token) {
  document.getElementById('recaptcha-overlay').style.display = 'none';
}

// Assuming your JSON is stored in a variable called 'translations'
const translations = {
  "en": { /* ... your JSON English content ... */ },
  "fr": { /* ... your JSON French content ... */ },
  "es": { /* ... your JSON Spanish content ... */ },
  "de": { /* ... your JSON German content ... */ },
  "zh": { /* ... your JSON Chinese content ... */ }
};

// Function to update all text content based on selected language
function setLanguage(lang) {
  const t = translations[lang];

  if (!t) return;

  // Header / Nav
  document.getElementById('nav-home').textContent = t.navHome;
  document.getElementById('nav-about').textContent = t.navAbout;
  document.getElementById('nav-services').textContent = t.navServices;
  document.getElementById('nav-contact').textContent = t.navContact;

  // Welcome overlay
  document.getElementById('welcome-title').textContent = t.welcomeTitle;
  document.getElementById('welcome-text').textContent = t.welcomeText;

  // Tracking tips
  document.getElementById('tip-text').textContent = t.tipText;
  document.getElementById('special-text').textContent = t.specialText;

  // Tracking steps
  document.getElementById('step-placed').querySelector('span').textContent = t.stepPlaced;
  document.getElementById('step-shipped').querySelector('span').textContent = t.stepShipped;
  document.getElementById('step-transit').querySelector('span').textContent = t.stepTransit;
  document.getElementById('step-delivered').querySelector('span').textContent = t.stepDelivered;

  // Tracking form labels
  document.querySelector("label[for='customerEmail']").textContent = t.emailLabel;

  // Products
  document.getElementById('products-title').textContent = t.productsTitle;
  document.getElementById('prod1-title').textContent = t.prod1Title;
  document.getElementById('prod1-text').textContent = t.prod1Text;
  document.getElementById('prod1-title').nextElementSibling.textContent = t.prod1Btn; // optional, if button text next to title
  document.getElementById('prod2-title').textContent = t.prod2Title;
  document.getElementById('prod2-text').textContent = t.prod2Text;
  document.getElementById('prod3-title').textContent = t.prod3Title;
  document.getElementById('prod3-text').textContent = t.prod3Text;
  document.getElementById('prod4-title').textContent = t.prod4Title;
  document.getElementById('prod4-text').textContent = t.prod4Text;

  // About & Contact
  document.getElementById('aboutTitle')?.textContent && (document.getElementById('aboutTitle').textContent = t.aboutTitle);
  document.getElementById('about')?.textContent && (document.getElementById('about').textContent = t.about);
  document.getElementById('contact-title').textContent = t.contactTitle;
  document.getElementById('contact-text').textContent = t.contact;

  // Buttons
  document.getElementById('whatsapp-float').title = t.whatsappBtn;
  document.getElementById('email-btn').textContent = t.emailBtn;

  // Footer
  document.getElementById('footer-text').textContent = t.footer;
}

// Set default language
let defaultLang = 'en';
setLanguage(defaultLang);

// Listen to the language selector
document.getElementById('languageSelect').addEventListener('change', (e) => {
  setLanguage(e.target.value);
});
