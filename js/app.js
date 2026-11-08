/* ═══════════════════════════════════════════════
   MAYONI PORTFOLIO — app.js
   Vanilla JS: theme, navbar, reveal, scroll
═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement;

  // ── Theme ──────────────────────────────────
  function applyTheme(t) {
    html.dataset.theme = t;
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

  // ── Back to Top ────────────────────────────
  (function() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    function updateBtn() {
      btn.classList.toggle("visible", window.scrollY > 300);
    }
    window.addEventListener("scroll", updateBtn);
    updateBtn();
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();

  // ── Image blur-up ──────────────────────────
  document.querySelectorAll(".proj-thumb img, .flagship-thumb img").forEach(function (img) {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", function () {
        img.classList.add("loaded");
      });
    }
  });

  // ── Stat Counter ───────────────────────────
  (function() {
    const counters = document.querySelectorAll(".stat-num");
    if (!counters.length) return;

    const counterObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { counterObs.observe(el); });
  })();

  // ── Case Study Modal ───────────────────────
  (function() {
    const modal = document.getElementById("caseModal");
    if (!modal) return;

    const panel = modal.querySelector(".case-modal-panel");
    const bodyEl = document.getElementById("caseModalBody");
    const titleEl = document.getElementById("caseModalTitle");
    const closeBtn = modal.querySelector(".case-modal-close");
    const triggers = Array.prototype.slice.call(
      document.querySelectorAll(".case-trigger")
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lastTrigger = null;
    let scrollY = 0;
    let closeTimer = null;

    function lockScroll() {
      scrollY = window.scrollY;
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = "fixed";
      document.body.style.top = -scrollY + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (sbw > 0) document.body.style.paddingRight = sbw + "px";
    }

    function unlockScroll() {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      // Restore the scroll position instantly: `html { scroll-behavior: smooth }`
      // would otherwise animate the jump from the top of the page.
      const root = document.documentElement;
      const prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      window.requestAnimationFrame(function() {
        root.style.scrollBehavior = prevBehavior;
      });
    }

    function open(trigger) {
      if (!modal.hidden) return;

      const card = trigger.closest(".flagship-card");
      const data = card && card.querySelector(".case-data");
      if (!data) return;

      bodyEl.innerHTML = data.innerHTML;
      bodyEl.scrollTop = 0;

      const cardTitle = card.querySelector(".flagship-title");
      titleEl.textContent = cardTitle
        ? cardTitle.textContent.trim()
        : "Case Study";

      lastTrigger = trigger;
      trigger.setAttribute("aria-expanded", "true");

      modal.hidden = false;
      void modal.offsetWidth;

      lockScroll();
      modal.classList.add("is-open");

      if (reduceMotion.matches) {
        panel.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 150,
          easing: "ease-out"
        });
      } else {
        const pr = panel.getBoundingClientRect();
        const tr = trigger.getBoundingClientRect();
        const dx = tr.left + tr.width / 2 - (pr.left + pr.width / 2);
        const dy = tr.top + tr.height / 2 - (pr.top + pr.height / 2);
        panel.animate(
          [
            {
              transform:
                "translate(" + dx + "px, " + dy + "px) scale(0.16)",
              opacity: 0
            },
            { transform: "translate(0, 0) scale(1)", opacity: 1 }
          ],
          { duration: 420, easing: "cubic-bezier(.25, .9, .3, 1)" }
        );
      }

      window.requestAnimationFrame(function() {
        closeBtn.focus({ preventScroll: true });
      });
    }

    function finishClose() {
      if (modal.hidden) return;
      modal.hidden = true;
      modal.classList.remove("is-open");
      panel.getAnimations().forEach(function(a) { a.cancel(); });
      bodyEl.innerHTML = "";
      if (lastTrigger && lastTrigger.isConnected) {
        lastTrigger.focus({ preventScroll: true });
      }
      lastTrigger = null;
    }

    function close(immediate) {
      if (modal.hidden) return;
      clearTimeout(closeTimer);

      const trigger = lastTrigger;
      if (trigger) trigger.setAttribute("aria-expanded", "false");

      // Restore the page scroll while the backdrop still covers it, so the
      // position jump is invisible instead of happening after the fade-out.
      unlockScroll();

      if (immediate) {
        finishClose();
        return;
      }

      modal.classList.remove("is-open");

      if (reduceMotion.matches) {
        const anim = panel.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 120,
          easing: "ease-in",
          fill: "forwards"
        });
        anim.onfinish = finishClose;
      } else {
        const pr = panel.getBoundingClientRect();
        let dx = 0;
        let dy = 0;
        if (trigger && trigger.isConnected) {
          const tr = trigger.getBoundingClientRect();
          dx = tr.left + tr.width / 2 - (pr.left + pr.width / 2);
          dy = tr.top + tr.height / 2 - (pr.top + pr.height / 2);
        }
        const anim = panel.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            {
              transform:
                "translate(" + dx + "px, " + dy + "px) scale(0.16)",
              opacity: 0
            }
          ],
          {
            duration: 220,
            easing: "cubic-bezier(.4, 0, 1, 1)",
            fill: "forwards"
          }
        );
        anim.onfinish = finishClose;
      }

      closeTimer = setTimeout(finishClose, 400);
    }

    triggers.forEach(function(trigger) {
      trigger.addEventListener("click", function() { open(trigger); });
    });

    modal.querySelectorAll("[data-close-modal]").forEach(function(el) {
      el.addEventListener("click", function() { close(); });
    });

    document.addEventListener("keydown", function(e) {
      if (modal.hidden) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    document.addEventListener("portfolio:filter", function() {
      close(true);
    });
  })();

  // ── Project Filter ─────────────────────────
  (function() {
    const filterBar = document.querySelector(".filter-bar");
    if (!filterBar) return;
    const btns = filterBar.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".proj-card, .flagship-card, .archive-item");

    btns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        btns.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        cards.forEach(function(card) {
          const cats = card.dataset.category || "";
          const match = filter === "all" || cats.split(" ").indexOf(filter) !== -1;
          card.style.display = match ? "" : "none";
          // re-trigger reveal animation
          if (match) {
            card.classList.remove("visible");
            requestAnimationFrame(function() {
              card.classList.add("visible");
            });
          }
        });

        document.dispatchEvent(new CustomEvent("portfolio:filter"));
      });
    });
  })();
});
