// Time--------------------------------------------

// Function to update the time based on the input
function updateTime() {
  // Get the value of the time input
  const inputTime = document.getElementById("pickupTime").value;

  // Update the time element in the "bookingCalendarRight" section based on the input time
  const timeElementBookingRight = document.querySelector(
    ".bookingCalendarRight .time"
  );
  timeElementBookingRight.textContent = inputTime || "00:00"; // Use "00:00" if the input is empty
}

// Attach the updateTime function to the input event of the time field
document.getElementById("pickupTime").addEventListener("input", updateTime);

// Time wheel -----------------------------------

// Function to update the time based on the input
function updateTime() {
  // Get the value of the time input
  const inputTime = document.getElementById("pickupTime").value;

  // Update the time elements with the selected time
  document.getElementById("pickupTime2").textContent = inputTime || "00:00"; // Use "00:00" if the input is empty
  document.getElementById("pickupTime3").textContent = inputTime || "00:00"; // Use "00:00" if the input is empty
  document.getElementById("pickupTime4").textContent = inputTime || "00:00"; // Use "00:00" if the input is empty
}

// Attach the updateTime function to the input event of the time field
document.getElementById("pickupTime").addEventListener("input", updateTime);
