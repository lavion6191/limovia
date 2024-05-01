//Price random generator ------------------------------

document.addEventListener("DOMContentLoaded", function () {
  let selectedDayPrices = {};

  function updateDynamicPrice() {
    // If the selected date has a stored price, display it
    if (selectedDayPrices[selectedDay] !== undefined) {
      const priceElement = document.getElementById("dynamicPrice");
      priceElement.textContent =
        selectedDayPrices[selectedDay].toFixed(1) + " kr";
    } else {
      // Otherwise, generate a new random price between 1000 and 5000
      const randomPrice = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

      // Update the price in the HTML
      const priceElement = document.getElementById("dynamicPrice");
      priceElement.textContent = randomPrice.toFixed(1) + " kr";

      // Store the generated price for the selected date
      selectedDayPrices[selectedDay] = randomPrice;
    }
  }

  function selectDate(day) {
    selectedDay = day;
    updateCalendar();
    const selectedDateElement = document.getElementById("selectedDate");
    selectedDateElement.textContent = `${day} ${monthNames[currentMonth]} 2024`;

    // Call the function to update the dynamic price
    updateDynamicPrice();
  }
});

// Booking confirmation number
document.addEventListener("DOMContentLoaded", function () {
  // Function to generate a random 9-digit number
  function generateRandomBookingNumber() {
    return Math.floor(Math.random() * 900000000 + 100000000);
  }

  // Get the booking number element
  const bookingNumberElement = document.querySelector(".bookningNumber");

  // Update the booking number with a random value on page load
  if (bookingNumberElement) {
    bookingNumberElement.textContent = generateRandomBookingNumber();
  }
});
