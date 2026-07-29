/* ═══════════════════════════════════════════════
   MAYONI PORTFOLIO — app.js
   Vanilla JS: theme, navbar, reveal, scroll
═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement;

  // ── Theme ──────────────────────────────────
  function applyTheme(t) {
    if (t === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
      document.querySelectorAll("#themeIcon, #themeIconMob").forEach((el) => {
        el.classList.remove("bx-moon");
        el.classList.add("bx-sun");
      });
      const label = document.getElementById("themeLabelMob");
      if (label) label.textContent = "Light mode";
    } else {
      html.classList.add("dark");
      html.classList.remove("light");
      document.querySelectorAll("#themeIcon, #themeIconMob").forEach((el) => {
        el.classList.remove("bx-sun");
        el.classList.add("bx-moon");
      });
      const label = document.getElementById("themeLabelMob");
      if (label) label.textContent = "Dark mode";
    }
  }

  applyTheme(localStorage.getItem("porto-theme") || "dark");

  document.querySelectorAll("#themeToggle, #themeToggleMob").forEach((btn) => {
    btn.addEventListener("click", function () {
      const next = html.classList.contains("dark") ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("porto-theme", next);
    });
  });

  // ── Navbar scroll ──────────────────────────
  function updateNavbar() {
    const navbar = document.getElementById("navbar");
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", updateNavbar);
  updateNavbar(); // initial check

  // ── Hamburger ─────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("open");
      mobileNav.classList.toggle("hidden");
      mobileNav.classList.toggle("flex");
    });

    document.querySelectorAll("#mobileNav .nl-mob").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        mobileNav.classList.add("hidden");
        mobileNav.classList.remove("flex");
      });
    });
  }

  // ── Active nav on scroll ───────────────────
  function updateActiveNav() {
    let cur = "";
    document.querySelectorAll("section[id]").forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) cur = section.id;
    });
    document.querySelectorAll(".nl").forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + cur);
    });
  }
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // ── Scroll Reveal ──────────────────────────
  const revObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    revObs.observe(el);
  });
});
