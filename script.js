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

  const trackingNumberDemo = "PKG-123456789"; // Demo tracking number

  const trackingSteps = [
    { status: "Order Placed", time: "2025-09-05 09:00" },
    { status: "Shipped", time: "2025-09-06 12:00" },
    { status: "In Transit", time: "2025-09-07 15:00" },
    { status: "Delivered", time: "2025-09-08 10:00" },
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload
    const trackingNumber = input.value.trim();
    resultBox.innerHTML = "";

    if (trackingNumber === "") {
      resultBox.textContent = "❌ Please enter a tracking number.";
      resultBox.style.color = "red";
      resultBox.style.display = "block";
      return;
    }

    if (trackingNumber === trackingNumberDemo) {
      trackingSteps.forEach((step, index) => {
        const stepColor = index === 0 ? "blue" : index === trackingSteps.length - 1 ? "green" : "gray";
        const p = document.createElement("p");
        p.style.color = stepColor;
        p.textContent = `${step.status} - ${step.time}`;
        resultBox.appendChild(p);
      });
      resultBox.style.display = "block";
    } else {
      resultBox.innerHTML = "<p style='color:red'>Tracking number not found.</p>";
      resultBox.style.display = "block";
    }
  });
});
