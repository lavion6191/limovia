var slideIndex = 0;
var intervalId;

showSlides(slideIndex);
startAutoPlay();

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0; // Set opacity to 0 for all slides
  }
  slides[slideIndex].style.opacity = 1; // Set opacity to 1 for the current slide
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function startAutoPlay() {
  intervalId = setInterval(function () {
    plusSlides(1);
  }, 5000);
}

function fadeInNextSlide() {
  var slides = document.getElementsByClassName("slides");
  var currentSlide = slides[slideIndex];

  // After a short delay, start fading out the current slide
  setTimeout(function () {
    currentSlide.style.opacity = 0;
  }, 500); // Adjust the delay to your preference

  // After another short delay, advance to the next slide
  setTimeout(function () {
    plusSlides(1);
    showSlides(slideIndex);
  }, 1000); // Adjust the delay to your preference
}

function stopAutoPlay() {
  clearInterval(intervalId);
  setTimeout(startAutoPlay, 7000); // Restart after 10 seconds
}
