document.getElementById('trackingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const trackingInput = document.getElementById('tracking-number').value.trim();
  const statusDiv = document.getElementById('status');
  const shipmentInfo = document.getElementById('shipmentInfo');

  if (trackingInput === "") {
    statusDiv.textContent = "⚠️ Please enter a tracking number.";
    shipmentInfo.classList.add('hidden');
    return;
  }

  // For demo, we assume Track-246800000 is valid
  if (trackingInput === "Track-246800000") {
    statusDiv.textContent = "✅ Tracking number found!";
    shipmentInfo.classList.remove('hidden');
  } else {
    statusDiv.textContent = "❌ Tracking number not found.";
    shipmentInfo.classList.add('hidden');
  }
});
