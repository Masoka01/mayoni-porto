/* ═══════════════════════════════════════════════
   MAYONI PORTFOLIO — app.js
   jQuery: theme, navbar, tabs, reveal, scroll
═══════════════════════════════════════════════ */

$(function () {
  const $html = $("html");

  // ── Theme ──────────────────────────────────
  applyTheme(localStorage.getItem("porto-theme") || "dark");

  $("#themeToggle, #themeToggleMob").on("click", function () {
    const next = $html.hasClass("dark") ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("porto-theme", next);
  });

  function applyTheme(t) {
    if (t === "light") {
      $html.removeClass("dark");
      $("#themeIcon, #themeIconMob").removeClass("bx-moon").addClass("bx-sun");
      $("#themeLabelMob").text("Light mode");
    } else {
      $html.addClass("dark");
      $("#themeIcon, #themeIconMob").removeClass("bx-sun").addClass("bx-moon");
      $("#themeLabelMob").text("Dark mode");
    }
  }

  // ── Navbar border on scroll ────────────────
  $(window).on("scroll.nav", function () {
    $("#navbar").toggleClass("shadow-sm", $(this).scrollTop() > 10);
  });

  // ── Hamburger ─────────────────────────────
  $("#hamburger").on("click", function () {
    $(this).toggleClass("open");
    $("#mobileNav").toggleClass("hidden flex");
  });
  $("#mobileNav .nl-mob").on("click", function () {
    $("#hamburger").removeClass("open");
    $("#mobileNav").addClass("hidden").removeClass("flex");
  });

  // ── Active nav on scroll ───────────────────
  $(window).on("scroll.active", function () {
    let cur = "";
    $("section[id]").each(function () {
      if ($(window).scrollTop() >= $(this).offset().top - 120)
        cur = $(this).attr("id");
    });
    $(".nl")
      .removeClass("active")
      .filter('[href="#' + cur + '"]')
      .addClass("active");
  });

  // ── Scroll Reveal ──────────────────────────
  const revObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target).addClass("visible");
          revObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  $(".reveal").each(function () {
    revObs.observe(this);
  });
});
