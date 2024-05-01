// Read the query parameter to get the selected service
const urlParams = new URLSearchParams(window.location.search);
const selectedService = urlParams.get("service");

// Update the title based on the selected service
if (selectedService) {
  document.title = `Limovia | ${selectedService}`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the service parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get("service");

  // Update the service name based on the selected service
  updateServiceName(service);
});

function updateServiceName(service) {
  // Get the element with the id "serviceName"
  const serviceNameElement = document.getElementById("serviceName");

  // Update the content based on the selected service
  if (service === "Privatleasing") {
    serviceNameElement.textContent = "Privatleasing";
  } else if (service === "Abonnemang") {
    serviceNameElement.textContent = "Abonnemang";
  } else if (service === "Flygplatstransfer") {
    serviceNameElement.textContent = "Flygplatstransfer";
  } else if (service === "Evenemangstransfer") {
    serviceNameElement.textContent = "Evenemangstransfer";
  } else if (service === "Timbokning") {
    serviceNameElement.textContent = "Timbokning";
  } else if (service === "Lokal Transfer") {
    serviceNameElement.textContent = "Lokal Transfer";
  } else if (service === "Stad till Stad-transfer") {
    serviceNameElement.textContent = "Stad till Stad-transfer";
  }
}

// JavaScript for the slideshow functionality
const slideshowContainers = document.querySelectorAll(".slideshow-container");
let intervalID;

function showSlides(containerIndex) {
  return function () {
    let i;
    const slides =
      slideshowContainers[containerIndex].getElementsByClassName("mySlides");
    const dots =
      slideshowContainers[containerIndex].getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  };
}

function currentSlide(n, containerIndex) {
  clearInterval(intervalID); // Clear the interval when a dot is clicked
  slideIndex = n;
  showSlides(containerIndex)();
  setTimeout(() => {
    intervalID = setInterval(() => {
      slideIndex++;
      if (slideIndex > 4) {
        slideIndex = 1;
      }
      slideshowContainers.forEach((container, index) => {
        showSlides(index)();
      });
    }, 2000);
  }, 5000); // Pause for 10 seconds
}

let slideIndex = 1;

// Initialize each slideshow
slideshowContainers.forEach((container, containerIndex) => {
  showSlides(containerIndex)();
});

// Automatic slideshow change
intervalID = setInterval(() => {
  slideIndex++;
  if (slideIndex > 4) {
    slideIndex = 1;
  }
  slideshowContainers.forEach((container, containerIndex) => {
    showSlides(containerIndex)();
  });
}, 3000);
