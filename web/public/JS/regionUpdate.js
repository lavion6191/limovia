// Region change ------------------------------------------

// Function to update the place based on the selected region
function updatePlace() {
  // Get the selected region from the dropdown
  const selectedRegion = document.querySelector(
    ".selectWheelRegion select"
  ).value;

  // Update the place element based on the selected region
  const placeElement = document.querySelector(".place");
  const placeElement2 = document.querySelector(".place2");
  const placeElement3 = document.querySelector(".place3");
  switch (selectedRegion) {
    case "option1":
      placeElement.textContent = "Hallands Län";
      placeElement2.textContent = "Hallands Län";
      placeElement3.textContent = "Hallands Län";
      break;
    case "option2":
      placeElement.textContent = "Jönköpings Län";
      placeElement2.textContent = "Jönköpings Län";
      placeElement3.textContent = "Jönköpings Län";
      break;
    case "option3":
      placeElement.textContent = "Kalmar Län";
      placeElement2.textContent = "Kalmar Län";
      placeElement3.textContent = "Kalmar Län";
      break;
    case "option4":
      placeElement.textContent = "Kronobergs Län";
      placeElement2.textContent = "Kronobergs Län";
      placeElement3.textContent = "Kronobergs Län";
      break;
    case "option5":
      placeElement.textContent = "Stockholms Län";
      placeElement2.textContent = "Stockholms Län";
      placeElement3.textContent = "Stockholms Län";
      break;
    case "option6":
      placeElement.textContent = "Södermanlands Län";
      placeElement2.textContent = "Södermanlands Län";
      placeElement3.textContent = "Södermanlands Län";
      break;
    case "option7":
      placeElement.textContent = "Uppsala Län";
      placeElement2.textContent = "Uppsala Län";
      placeElement3.textContent = "Uppsala Län";
      break;
    case "option8":
      placeElement.textContent = "Värmlands Län";
      placeElement2.textContent = "Värmlands Län";
      placeElement3.textContent = "Värmlands Län";
      break;
    case "option9":
      placeElement.textContent = "Västmanlands Län";
      placeElement2.textContent = "Västmanlands Län";
      placeElement3.textContent = "Västmanlands Län";
      break;
    case "option10":
      placeElement.textContent = "Västra Gotlands Län";
      placeElement2.textContent = "Västra Gotlands Län";
      placeElement3.textContent = "Västra Gotlands Län";
      break;
    case "option11":
      placeElement.textContent = "Örebro Län";
      placeElement2.textContent = "Örebro Län";
      placeElement3.textContent = "Örebro Län";
      break;
    case "option12":
      placeElement.textContent = "Östergötlands Län";
      placeElement2.textContent = "Östergötlands Län";
      placeElement3.textContent = "Östergötlands Län";
      break;
    default:
      placeElement.textContent = "Region";
  }
}

// Attach the updatePlace function to the change event of the dropdown
document
  .querySelector(".selectWheelRegion select")
  .addEventListener("change", updatePlace);
