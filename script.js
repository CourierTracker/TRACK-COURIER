function searchTracking() {
  const trackingInput = document.getElementById('trackingInput').value.trim();
  const shipmentContainer = document.getElementById('shipmentContainer');
  const trackingSteps = document.getElementById('trackingSteps');
  const status = document.getElementById('status');

  if (trackingInput === "Track-246800000") {
    // Show shipment details
    shipmentContainer.style.display = "block";
    
    // Show tracking steps
    trackingSteps.classList.remove("hidden");

    // Reset steps first
    const steps = trackingSteps.querySelectorAll("li");
    steps.forEach(step => step.classList.remove("completed"));

    // Mark "In Transit" as completed
    steps[2].classList.add("completed"); // index 2 = In Transit

    status.textContent = "Your package is in transit!";
    status.style.color = "green";
  } else {
    shipmentContainer.style.display = "none";
    trackingSteps.classList.add("hidden");
    status.textContent = "Tracking number not found.";
    status.style.color = "red";
  }
}
