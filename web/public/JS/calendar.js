document.addEventListener("DOMContentLoaded", function () {
  let currentDate = new Date(); // Get the current date
  let currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)
  let selectedDay = 0; // This should be declared only once, in the global scope
  const monthNames = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  function updateCalendar() {
    const currentMonthElement = document.getElementById("currentMonth");
    currentMonthElement.textContent =
      monthNames[currentMonth] + " " + currentDate.getFullYear(); // Update the current month with the current year

    const calendarMonth = document.getElementById("calendarMonth");
    calendarMonth.innerHTML = ""; // Clear previous month's days

    // Only create weekdays if they are not already present
    if (!document.querySelector(".weekdays")) {
      const weekdaysContainer = document.createElement("div");
      weekdaysContainer.classList.add("weekdays");

      // Display the days of the week
      for (let i = 0; i < 7; i++) {
        const weekdayElement = document.createElement("div");
        weekdayElement.textContent = [
          "Sön",
          "Mon",
          "Tis",
          "Ons",
          "Tor",
          "Fre",
          "Lör",
        ][i];
        weekdayElement.classList.add("weekday");
        weekdaysContainer.appendChild(weekdayElement);
      }

      calendarMonth.appendChild(weekdaysContainer);
    }

    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();

    // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayOfWeek = new Date(
      currentDate.getFullYear(),
      currentMonth,
      1
    ).getDay();

    // Create placeholders for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const placeholder = document.createElement("div");
      placeholder.classList.add("day", "placeholder");
      calendarMonth.appendChild(placeholder);
    }

    // Create the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.textContent = day;
      dayElement.classList.add("day");
      if (day === selectedDay) {
        dayElement.classList.add("active");
      }
      dayElement.addEventListener("click", function () {
        selectDate(day);
      });
      calendarMonth.appendChild(dayElement);
    }
  }

  function selectDate(day) {
    console.log(`Date selected: ${day}`);
    selectedDay = day;
    updateCalendar();

    // Update the first selectedDate element
    const selectedDateElement = document.getElementById("selectedDate");
    if (selectedDateElement) {
      selectedDateElement.textContent = `${day} ${
        monthNames[currentMonth]
      } ${currentDate.getFullYear()}`;
    }

    // Update the second selectedDate element
    const selectedDateElement2 = document.getElementById("selectedDate2");
    if (selectedDateElement2) {
      selectedDateElement2.textContent = `${day} ${
        monthNames[currentMonth]
      } ${currentDate.getFullYear()}`;
    }

    // Update the third selectedDate element
    const selectedDateElement3 = document.getElementById("selectedDate3");
    if (selectedDateElement3) {
      selectedDateElement3.textContent = `${day} ${
        monthNames[currentMonth]
      } ${currentDate.getFullYear()}`;
    }

    // Call the function to update the dynamic price
    updateDynamicPrice();
  }

  function prevMonth() {
    // Update the current month
    currentDate.setMonth(currentDate.getMonth() - 1);

    // Update the calendar without triggering selectDate
    updateCalendar();

    // Update the selected date to the last day of the previous month
    selectedDay = new Date(
      currentDate.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();

    // Update the dynamic price
    updateDynamicPrice();
  }

  function nextMonth() {
    // Update the current month
    currentDate.setMonth(currentDate.getMonth() + 1);

    // Update the calendar without triggering selectDate
    updateCalendar();

    // Update the selected date to the last day of the next month
    selectedDay = new Date(
      currentDate.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();

    // Update the dynamic price
    updateDynamicPrice();
  }

  document
    .getElementById("prevMonthButton")
    .addEventListener("click", prevMonth);
  document
    .getElementById("nextMonthButton")
    .addEventListener("click", nextMonth);

  // Initial update
  updateCalendar();

  // Random price generator
  let selectedDayPrices = {};

  function updateDynamicPrice() {
    // If the selected date has a stored price, display it
    if (selectedDayPrices[selectedDay] !== undefined) {
      const priceElement = document.getElementById("dynamicPrice");
      const priceElement2 = document.getElementById("dynamicPrice2");
      const priceElement3 = document.getElementById("dynamicPrice3");
      const priceElement4 = document.getElementById("dynamicPrice4");
      const priceElement5 = document.getElementById("dynamicPrice5");
      const priceElement6 = document.getElementById("dynamicPrice6");
      const priceElement7 = document.getElementById("dynamicPrice7");

      priceElement.textContent =
        selectedDayPrices[selectedDay].toFixed(1) + " kr";

      priceElement2.textContent =
        selectedDayPrices[selectedDay].toFixed(1) + " kr";

      priceElement3.textContent =
        selectedDayPrices[selectedDay].toFixed(1) + " kr";

      priceElement4.textContent =
        selectedDayPrices[selectedDay].toFixed(1) + " kr";

      priceElement5.textContent =
        selectedDayPrices[selectedDay].toFixed(1) + " kr";

      const vatPrice = (price * 0.25).toFixed(1);
      priceElement6.textContent = vatPrice + " kr";

      priceElement7.textContent =
        selectedDayPrices[selectedDay].toFixed(1) + " kr";
    } else {
      // Otherwise, generate a new random price between 1000 and 5000
      const randomPrice = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

      // Update the price in the HTML
      const priceElement = document.getElementById("dynamicPrice");
      priceElement.textContent = randomPrice.toFixed(1) + " kr";

      const priceElement2 = document.getElementById("dynamicPrice2");
      priceElement2.textContent = randomPrice.toFixed(1) + " kr";

      const priceElement3 = document.getElementById("dynamicPrice3");
      priceElement3.textContent = randomPrice.toFixed(1) + " kr";

      const priceElement4 = document.getElementById("dynamicPrice4");
      priceElement4.textContent = randomPrice.toFixed(1) + " kr";

      const priceElement5 = document.getElementById("dynamicPrice5");
      priceElement5.textContent = randomPrice.toFixed(1) + " kr";

      const vatPrice = (randomPrice * 0.25).toFixed(1);
      const priceElement6 = document.getElementById("dynamicPrice6");
      priceElement6.textContent = vatPrice + " kr";

      const priceElement7 = document.getElementById("dynamicPrice7");
      priceElement7.textContent = randomPrice.toFixed(1) + " kr";

      // Store the generated price for the selected date
      selectedDayPrices[selectedDay] = randomPrice;
    }
  }
});
