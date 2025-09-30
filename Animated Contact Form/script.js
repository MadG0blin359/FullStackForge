const inputFields = document.querySelectorAll(".contact-input");
const toggleThemeBtn = document.querySelector(".theme-toggle");

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Input field calsses for animations
inputFields.forEach((ipt) => {
  ipt.addEventListener("focus", () => {
    ipt.parentNode.classList.add("focus");
    ipt.parentNode.classList.add("shrink-placeholder");
  });
  ipt.addEventListener("blur", () => {
    if (ipt.value == "") ipt.parentNode.classList.remove("shrink-placeholder");
    ipt.parentNode.classList.remove("focus");
  });
});
