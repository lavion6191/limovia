document.addEventListener("DOMContentLoaded", function () {
  // Get the service parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get("service");

  // Update the hero image based on the service parameter
  if (service === "Privatleasing") {
    document.querySelector(".serviceHeroImage").style.backgroundImage =
      "url('IMAGES/3VolvosInRow.jpg')";
    document.querySelectorAll(".serviceHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Privatleasing Title";
  } else if (service === "Abonnemang") {
    document.querySelector(".serviceHeroImage2").style.backgroundImage =
      "url('IMAGES/VolvoInterior.jpg')";
    document.querySelectorAll(".serviceHeroImage").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent = "Abonnemang Title";
  } else if (service === "Flygplatstransfer") {
    document.querySelector(".serviceHeroImage").style.backgroundImage =
      "url('IMAGES/Airport.jpg')";
    document.querySelectorAll(".serviceHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Flygplatstransfer Title";
  } else if (service === "Evenemangstransfer") {
    document.querySelector(".serviceHeroImage").style.backgroundImage =
      "url('IMAGES/WeddingRings.jpg')";
    document.querySelectorAll(".serviceHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Evenemangstransfer Title";
  } else if (service === "Timbokning") {
    document.querySelector(".serviceHeroImage").style.backgroundImage =
      "url('IMAGES/CarRainWindow.jpg')";
    document.querySelectorAll(".serviceHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent = "Timbokning Title";
  } else if (service === "Lokal Transfer") {
    document.querySelector(".serviceHeroImage2").style.backgroundImage =
      "url('IMAGES/GuyOpensDoorForWoman.jpg')";
    document.querySelectorAll(".serviceHeroImage").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Lokal Transfer Title";
  } else if (service === "Stad till Stad-transfer") {
    document.querySelector(".serviceHeroImage").style.backgroundImage =
      "url('IMAGES/VolvoXC60BridgeUp.jpg')";
    document.querySelectorAll(".serviceHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Stad till Stad-transfer";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the service parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const book = urlParams.get("book");

  // Update the hero image based on the service parameter
  if (book === "Privatleasing") {
    document.querySelector(".bookHeroImage").style.backgroundImage =
      "url('IMAGES/3VolvosInRow.jpg')";
    document.querySelectorAll(".bookHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Privatleasing Title";
  } else if (book === "Abonnemang") {
    document.querySelector(".bookHeroImage").style.backgroundImage =
      "url('IMAGES/VolvoInterior.jpg')";
    document.querySelectorAll(".bookHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent = "Abonnemang Title";
  } else if (book === "Flygplatstransfer") {
    document.querySelector(".bookHeroImage").style.backgroundImage =
      "url('IMAGES/Airport.jpg')";
    document.querySelectorAll(".bookHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Flygplatstransfer Title";
  } else if (book === "Evenemangstransfer") {
    document.querySelector(".bookHeroImage").style.backgroundImage =
      "url('IMAGES/WeddingRings.jpg')";
    document.querySelectorAll(".bookHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Evenemangstransfer Title";
  } else if (book === "Timbokning") {
    document.querySelector(".bookHeroImage").style.backgroundImage =
      "url('IMAGES/CarRainWindow.jpg')";
    document.querySelectorAll(".bookHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent = "Timbokning Title";
  } else if (book === "Lokal Transfer") {
    document.querySelector(".bookHeroImage2").style.backgroundImage =
      "url('IMAGES/GuyOpensDoorForWoman.jpg')";
    document.querySelectorAll(".bookHeroImage").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Lokal Transfer Title";
  } else if (book === "Stad till Stad-transfer") {
    document.querySelector(".bookHeroImage").style.backgroundImage =
      "url('IMAGES/VolvoXC60BridgeUp.jpg')";
    document.querySelectorAll(".bookHeroImage2").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelector(".heroImageTitle").textContent =
      "Stad till Stad-transfer";
  }
});
