// Payment
document.addEventListener("DOMContentLoaded", function () {
  const paymentWheel = document.querySelector(".paymentWheel");
  const cardPayment = document.querySelector(".cardPayment");
  const invoicePayment = document.querySelector(".invoicePayment");

  const selectPaymentWheel = document.querySelector(
    ".selectPaymentWheel select"
  );

  selectPaymentWheel.addEventListener("change", function () {
    const selectedOption = selectPaymentWheel.value;

    // Hide both sections initially
    cardPayment.classList.add("hidden");
    invoicePayment.classList.add("hidden");

    // Show the selected section based on the value
    if (selectedOption === "payNow") {
      cardPayment.classList.remove("hidden");
    } else if (selectedOption === "invoice") {
      invoicePayment.classList.remove("hidden");
    }
  });
});
