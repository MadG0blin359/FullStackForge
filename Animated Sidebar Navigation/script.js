const sidebar = document.querySelector(".sidebar"),
  sidebarToggleBtn = document.querySelectorAll(".sidebar-toggle"),
  themeToggleBtn = document.querySelector(".theme-toggle"),
  themeIcon = document.querySelector(".theme-icon"),
  searchForm = document.querySelector(".search-form");

const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark-theme");
  themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
};

// Get saved theme value and apply it on page visit
const savedTheme = localStorage.getItem("theme");
const currentTheme = savedTheme || "light-theme";
document.body.classList.add(currentTheme);
updateThemeIcon();

// Toggle sidebar collapsed state on buttons click
sidebarToggleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});

searchForm.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    searchForm.querySelector("input").focus();
  }
});

// Toggle between themes on button click
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark-theme" : "NULL");
  updateThemeIcon();
});

if (window.innerWidth > 768) sidebar.classList.remove("collapsed");
