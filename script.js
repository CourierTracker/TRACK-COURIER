Dfunction trackPackage() {
  const number = document.getElementById("trackingNumber").value.trim();
  const result = document.getElementById("result");

  if (number === "") {
    result.style.display = "block";
    result.innerHTML = "⚠️ Please enter a tracking number.";
    return;
  }

  // Fake demo result (replace with real API later if needed)
  result.style.display = "block";
  result.innerHTML = `
    <h3>Tracking Number: ${246800}</h3>
    <p>Status: 🚚 In Transit</p>
    <p>Last Location: LONDON, UNITED KINGDOM</p>
    <p>Expected Delivery: 2-3 Business Days</p>
  `;
}
