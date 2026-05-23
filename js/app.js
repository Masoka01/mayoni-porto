/* ═══════════════════════════════════════════════════════
   DIMAS MAYONI PORTFOLIO — app.js
   jQuery interactions: theme, navbar, tabs, reveal, scroll
═══════════════════════════════════════════════════════ */

$(function () {
  const $html = $("html");

  // ── Theme Toggle ──────────────────────────────────
  const saved = localStorage.getItem("porto-theme") || "dark";
  applyTheme(saved);

  $("#themeToggle, #themeToggleMob").on("click", function () {
    const next = $html.hasClass("dark") ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("porto-theme", next);
  });

  function applyTheme(t) {
    if (t === "light") {
      $html.removeClass("dark").addClass("light");
      $("#themeIcon, #themeIconMob").removeClass("bx-moon").addClass("bx-sun");
      $("#themeLabel").text("Light");
      $("#themeLabelMob").text("Light Mode");
    } else {
      $html.removeClass("light").addClass("dark");
      $("#themeIcon, #themeIconMob").removeClass("bx-sun").addClass("bx-moon");
      $("#themeLabel").text("Dark");
      $("#themeLabelMob").text("Dark Mode");
    }
  }

  // ── Navbar Shadow on Scroll ───────────────────────
  $(window).on("scroll.navbar", function () {
    $("#navbar").toggleClass("navbar-scrolled", $(this).scrollTop() > 50);
  });

  // ── Hamburger Mobile Menu ─────────────────────────
  $("#hamburger").on("click", function () {
    $(this).toggleClass("open");
    $("#mobileNav").toggleClass("hidden flex");
  });

  // Close mobile menu on link click
  $("#mobileNav .nl-mob").on("click", function () {
    $("#hamburger").removeClass("open");
    $("#mobileNav").addClass("hidden").removeClass("flex");
  });

  // ── Active Nav Link on Scroll ─────────────────────
  $(window).on("scroll.activeNav", function () {
    let current = "";
    $("section[id]").each(function () {
      if ($(window).scrollTop() >= $(this).offset().top - 130) {
        current = $(this).attr("id");
      }
    });
    $(".nl")
      .removeClass("active")
      .each(function () {
        if ($(this).attr("href") === "#" + current) $(this).addClass("active");
      });
  });

  // ── Scroll Reveal ─────────────────────────────────
  const revealObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target).addClass("visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  $(".reveal").each(function () {
    revealObs.observe(this);
  });

  // ── Skill Tabs ────────────────────────────────────
  $(".tab-btn").on("click", function () {
    const tab = $(this).data("tab");

    // Reset semua panel & bars
    $(".tab-panel").removeClass("active").find(".bar-fill").css("width", 0);
    $(".tab-btn")
      .removeClass("active bg-accent text-slate-900 shadow-glow")
      .addClass("glass dark:text-slate-300 text-slate-600");

    // Aktifkan yang dipilih
    $(this)
      .addClass("active bg-accent text-slate-900 shadow-glow")
      .removeClass("glass dark:text-slate-300 text-slate-600");

    const $panel = $("#tab-" + tab).addClass("active");

    // Animasikan progress bar setelah render
    setTimeout(function () {
      $panel.find(".bar-fill").each(function () {
        const w = getComputedStyle(this).getPropertyValue("--w").trim();
        $(this).css("width", w);
      });
    }, 60);
  });

  // Trigger bar animasi tab pertama saat section Skills terlihat
  const skillObs = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        setTimeout(function () {
          $("#tab-frontend.active .bar-fill").each(function () {
            const w = getComputedStyle(this).getPropertyValue("--w").trim();
            $(this).css("width", w);
          });
        }, 200);
        skillObs.disconnect();
      }
    },
    { threshold: 0.2 },
  );

  const skillSec = document.getElementById("skills");
  if (skillSec) skillObs.observe(skillSec);
});
