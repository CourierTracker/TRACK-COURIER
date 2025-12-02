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

function payWithPaystack(amount) {
  const email = document.getElementById('customerEmail').value;
  const address = document.getElementById('customerAddress').value;

  if (!email || !address) {
    alert("Please enter your email AND shipping address before payment!");
    if (!email) document.getElementById("customerEmail").focus();
    else document.getElementById("customerAddress").focus();
    return;
  }

  // Continue with your existing Paystack setup here...
}

