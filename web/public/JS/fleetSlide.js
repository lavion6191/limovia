document.addEventListener("DOMContentLoaded", function () {
  var slides = document.querySelectorAll(".carousel-slide");
  var currentSlide = 0;
  var autoPlayTimer;

  function showSlide(index) {
    slides.forEach(function (slide, i) {
      if (i === index) {
        slide.style.display = "flex";
      } else {
        slide.style.display = "none";
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    startAutoPlay();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    startAutoPlay();
  }

  function startAutoPlay() {
    // Clear the existing timer if it exists
    clearTimeout(autoPlayTimer);

    // Set a new timer for automatic slideshow every 2 seconds
    autoPlayTimer = setTimeout(function () {
      nextSlide();
    }, 5000); // 2 seconds
  }

  // Initial display
  showSlide(currentSlide);

  // Attach click event listeners to navigation buttons using class selectors
  document
    .querySelector(".prevCarfleetBtn")
    .addEventListener("click", function () {
      prevSlide();
      clearInterval(autoPlayTimer); // Clear timer on manual interaction
      setTimeout(startAutoPlay, 10000); // Restart after 10 seconds
    });

  document
    .querySelector(".nextCarFleetbtn")
    .addEventListener("click", function () {
      nextSlide();
      clearInterval(autoPlayTimer); // Clear timer on manual interaction
      setTimeout(startAutoPlay, 10000); // Restart after 10 seconds
    });

  // Start automatic slideshow
  startAutoPlay();
});
