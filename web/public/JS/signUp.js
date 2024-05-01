function displayPrivate() {
  document.querySelector(".signUpPrivateContainer").style.display = "block";
  document.querySelector(".signUpCompanyContainer").style.display = "none";
}

function displayCompany() {
  document.querySelector(".signUpPrivateContainer").style.display = "none";
  document.querySelector(".signUpCompanyContainer").style.display = "block";
}