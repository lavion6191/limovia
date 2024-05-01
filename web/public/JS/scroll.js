document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll to the target section
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      const offset = targetSection.getAttribute("data-offset") || 0;
      const targetOffset = targetSection.offsetTop - offset;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    });
  });
});
