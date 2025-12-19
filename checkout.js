// checkout.js
const nameInput = document.getElementById('customerName');
const emailInput = document.getElementById('customerEmail');
const addressInput = document.getElementById('customerAddress');
const payButtons = Array.from(document.querySelectorAll('.paystack-btn'));
const PAYSTACK_PUBLIC_KEY = 'pk_live_410ea0d7cf10bc1c518a2f1d96872cfab0231be7'; // your public key

// Helper: check if form is valid
function isFormValid() {
  return nameInput.value.trim() !== '' &&
         addressInput.value.trim() !== '' &&
         emailInput.checkValidity();
}

// Click handler for each pay button
payButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Check form fields individually
    if (nameInput.value.trim() === '') {
      alert('Please enter your Shipping details!');
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInput.focus();
      return;
    }

    if (!emailInput.checkValidity()) {
      alert('Please enter a valid email!');
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailInput.focus();
      return;
    }

    if (addressInput.value.trim() === '') {
      alert('Please enter your address!');
      addressInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      addressInput.focus();
      return;
    }

    // All fields are valid → proceed to Paystack
    const amount = parseInt(btn.dataset.amount, 10);
    const product = btn.dataset.product || 'Product';
    payWithPaystack(amount, emailInput.value.trim(), product);
  });
});

// Function to trigger Paystack payment
function payWithPaystack(amount, email, productName) {
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: amount,
    currency: 'NGN',
    metadata: {
      custom_fields: [
        { display_name: "Name", variable_name: "name", value: name },
        { display_name: "Address", variable_name: "address", value: address },
        { display_name: "Product", variable_name: "product", value: productName }
      ]
    },
    callback: function(response){
      alert('Payment complete! Reference: ' + response.reference + '. Verifying on server...');
      // Optional: send reference to your server for verification
      fetch('/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: response.reference })
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          alert('Payment verified! Thank you.');
        } else {
          alert('Payment could not be verified. Contact support with reference: ' + response.reference);
        }
      })
      .catch(err => {
        console.error('Verification error', err);
        alert('Error verifying payment. Contact support with reference: ' + response.reference);
      });
    },
    onClose: function(){
      alert('Payment cancelled.');
    }
  });

  handler.openIframe();
}
