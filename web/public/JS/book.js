document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const bookingCalendarSection = document.querySelector(".bookingCalendar");
  const checkoutFormSection = document.querySelector(".checkoutForm");
  const nextPageButton = document.querySelector(".nextPage");
  const goBackButton = document.querySelector(".backButton");
  const serviceInfoText = document.querySelector(".serviceInfoText");
  const paymentInfoText = document.querySelector(".paymentInfoText");
  const serviceLocations = document.querySelector(".serviceLocations");
  const regionSelect = document.querySelector(".selectWheelRegion select");
  const selectedDate = document.getElementById("selectedDate");
  const pickupTime = document.getElementById("pickupTime");

  // Event listener for next page button
  nextPageButton.addEventListener("click", function () {
    // Validation (if needed)
    /* 
    if (
      regionSelect.value === "" ||
      selectedDate.innerText === "xx Januari 2024" ||
      pickupTime.value === ""
    ) {
      alert(
        "Se till att välja region, datum och tid innan du fortsätter till nästa steg."
      );
      return;
    }
    */

    // Hide booking calendar and show checkout form
    bookingCalendarSection.style.display = "none";
    checkoutFormSection.style.display = "block";

    // Hide service info text and locations, show payment info text
    serviceInfoText.style.display = "none";
    serviceLocations.style.display = "none";
    paymentInfoText.style.display = "block";
  });

  // Event listener for go back button
  goBackButton.addEventListener("click", function () {
    // Toggle display of checkout form and booking calendar sections
    if (checkoutFormSection.style.display === "block") {
      checkoutFormSection.style.display = "none";
      bookingCalendarSection.style.display = "grid"; // Assuming booking calendar is displayed as grid
    } else {
      checkoutFormSection.style.display = "block";
      bookingCalendarSection.style.display = "none";
    }
  });
});

// Function to confirm booking
function confirmBooking() {
  // Hide all sections except the thank you page
  document.querySelectorAll("section").forEach((section) => {
    if (!section.classList.contains("thankYouPage")) {
      section.style.display = "none";
    }
  });

  // Display the thank you page
  document.querySelector(".thankYouPage").style.display = "block";
}

// ----- Change html file name //

// Read the query parameter to get the selected service
const urlParams = new URLSearchParams(window.location.search);
const selectedBook = urlParams.get("book");

// Update the title based on the selected service
if (selectedBook) {
  document.title = `Limovia | ${selectedBook}`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the service parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const book = urlParams.get("book");

  // Update the book name based on the selected service
  updateBookName(book);
});

function updateBookName(book) {
  // Get the element with the id "bookName"
  const bookNameElement = document.getElementById("bookName");
  const bookNameElement2 = document.getElementById("bookName2");
  const bookNameElement3 = document.getElementById("bookName3");
  const bookNameElement4 = document.getElementById("bookName4");

  // Update the content based on the selected service
  if (book === "Privatleasing") {
    bookNameElement.textContent = "Privatleasing";
    bookNameElement2.textContent = "Privatleasing";
    bookNameElement3.textContent = "Privatleasing";
    bookNameElement4.textContent = "Privatleasing";
  } else if (book === "Abonnemang") {
    bookNameElement.textContent = "Abonnemang";
     bookNameElement2.textContent = "Abonnemang";
     bookNameElement3.textContent = "Abonnemang";
     bookNameElement4.textContent = "Abonnemang";
  } else if (book === "Flygplatstransfer") {
    bookNameElement.textContent = "Flygplatstransfer";
      bookNameElement2.textContent = "Flygplatstransfer";
      bookNameElement3.textContent = "Flygplatstransfer";
      bookNameElement4.textContent = "Flygplatstransfer";
  } else if (book === "Evenemangstransfer") {
    bookNameElement.textContent = "Evenemangstransfer";
    bookNameElement2.textContent = "Evenemangstransfer";
    bookNameElement3.textContent = "Evenemangstransfer";
    bookNameElement4.textContent = "Evenemangstransfer";
  } else if (book === "Timbokning") {
    bookNameElement.textContent = "Timbokning";
      bookNameElement2.textContent = "Timbokning";
      bookNameElement3.textContent = "Timbokning";
      bookNameElement4.textContent = "Timbokning";
  } else if (book === "Lokal Transfer") {
    bookNameElement.textContent = "Lokal Transfer";
    bookNameElement2.textContent = "Lokal Transfer";
    bookNameElement3.textContent = "Lokal Transfer";
    bookNameElement4.textContent = "Lokal Transfer";
  } else if (book === "Stad till Stad-transfer") {
    bookNameElement.textContent = "Stad till Stad-transfer";
     bookNameElement2.textContent = "Stad till Stad-transfer";
     bookNameElement3.textContent = "Stad till Stad-transfer";
     bookNameElement4.textContent = "Stad till Stad-transfer";
  }
}
