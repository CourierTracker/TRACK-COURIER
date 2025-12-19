alert("JavaScript is working");

document.querySelectorAll('.paystack-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert("Button clicked");
  });
});
