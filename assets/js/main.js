// Small progressive enhancements. The site works fully without this file.
(() => {
  const root = document.documentElement;

  // Theme toggle: explicit choice is stored; otherwise follow the OS setting.
  const toggle = document.querySelector("[data-theme-toggle]");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Insights category filter
  const filters = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-cat]");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      items.forEach((item) => {
        item.hidden = cat !== "all" && item.dataset.cat !== cat;
      });
    });
  });
})();
