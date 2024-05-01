let screenSizeX = window.matchMedia("(max-width: 1025px)");
let screenSizeY = window.matchMedia("(max-width: 568px)");
let smallNavigation = document.getElementById("smallNavigation");

document
  .getElementById("openNavbutton")
  .addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click event from reaching document when open button is clicked
    openNavbar();
  });

document
  .getElementById("closeNavbutton")
  .addEventListener("click", function () {
    closeNavbar();
  });

// Add event listeners to buttons and links within the navbar to close the navbar when clicked
let navbarElements = smallNavigation.querySelectorAll("button, a");
for (let i = 0; i < navbarElements.length; i++) {
  navbarElements[i].addEventListener("click", closeNavbar);
}

function openNavbar() {
  document.getElementById("openNavbutton").style.display = "none";
  document.getElementById("closeNavbutton").style.display = "block";
  if (screenSizeY.matches) {
    smallNavigation.style.width = "100%";
  } else if (screenSizeX.matches) {
    smallNavigation.style.width = "35%";
  }
  document.addEventListener("click", closeNavbarOutside);
}

function closeNavbar() {
  smallNavigation.style.width = "0";
  document.getElementById("openNavbutton").style.display = "block";
  document.getElementById("closeNavbutton").style.display = "none";
  document.removeEventListener("click", closeNavbarOutside);
}

function closeNavbarOutside(event) {
  if (!smallNavigation.contains(event.target)) {
    closeNavbar();
  }
}
