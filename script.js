// script.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");

  // Create a result box
  const resultBox = document.createElement("div");
  resultBox.style.marginTop = "20px";
  resultBox.style.padding = "15px";
  resultBox.style.borderRadius = "10px";
  resultBox.style.backgroundColor = "#ffffff";
  resultBox.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  resultBox.style.fontSize = "16px";
  resultBox.style.lineHeight = "1.5";
  resultBox.style.fontFamily = "Arial, sans-serif";
  resultBox.style.display = "none"; // hidden at first
  form.parentNode.appendChild(resultBox);

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload
    const trackingNumber = input.value.trim();

    if (trackingNumber === "") {
      resultBox.textContent = "❌ Please enter a tracking number.";
      resultBox.style.color = "red";
      resultBox.style.display = "block";
      return;
    }

    // Fake tracking results
    const fakeStatuses = [
      "📦 Package received at facility.",
      "🚚 Package in transit.",
      "🏙️ Package arrived at destination city.",
      "📬 Out for delivery.",
      "✅ Package delivered successfully!"
    ];

    // Pick a random status to show
    const randomStatus = fakeStatuses[Math.floor(Math.random() * fakeStatuses.length)];

    resultBox.innerHTML = `
      <strong>Tracking Number:</strong> ${trackingNumber}<br>
      <strong>Status:</strong> ${randomStatus}
    `;
    resultBox.style.color = "#333";
    resultBox.style.display = "block";
  });
});
