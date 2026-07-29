# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix, polish, and add interactivity to the mayoni-porto single-page portfolio.

**Architecture:** All changes are to existing static files (index.html, css/style.css, js/app.js) plus one new file (404.html). No new dependencies or build steps.

**Tech Stack:** HTML, vanilla CSS, vanilla JS, Tailwind utility classes, Firebase (unchanged).

## Global Constraints

- Design system stays PipelinePro adapted (indigo #4F46E5 primary, cyan #06B6D4 secondary).
- Dark mode default, light mode toggle stays.
- No new npm packages or CDN scripts beyond existing (Boxicons, Firebase, Google Fonts).
- All JS remains vanilla — no jQuery.
- Must remain valid HTML — test via browser DevTools after each change.
- 404.html must be standalone (no Tailwind build dependency — inline styles or class-based).

---

### Task 1: Quick Fixes (jQuery chip, navbar light mode, LinkedIn)

**Files:**
- Modify: `index.html` line 150
- Modify: `index.html` line 629 (around Instagram button)
- Modify: `css/style.css` after line 65

**Interfaces:**
- Consumes: nothing
- Produces: cleaner markup for later tasks

- [ ] **Step 1: Remove jQuery chip from hero tech chips**

Remove line 150 from `index.html`:
```
Old:               <span class="tech-chip"><i class="bx bxl-jquery" style="color:#06B6D4"></i> jQuery</span>
New: (delete this line)
```

- [ ] **Step 2: Fix navbar scrolled text color in light mode**

In `css/style.css`, after line 65 (the existing `.light #navbar.scrolled` rule), add:
```css
.light #navbar.scrolled .nav-logo {
  color: #0a0a0a;
}
```

- [ ] **Step 3: Add LinkedIn social button**

In `index.html`, after the Instagram button (around line 631), add:
```html
<a href="https://linkedin.com/in/dimas-mayoni-08662b271" target="_blank" rel="noopener" class="soc-btn">
  <i class="bx bxl-linkedin"></i> LinkedIn
</a>
```

- [ ] **Step 4: Verify**

Open `index.html` in browser. Check:
1. No jQuery chip in hero tech stack.
2. Toggle light mode, scroll down — navbar text readable.
3. LinkedIn button visible in Contact section.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "fix: remove jQuery chip, navbar light mode text, add LinkedIn"
```

---

### Task 2: Font Preloading

**Files:**
- Modify: `index.html` head (after Google Fonts link)

**Interfaces:**
- Consumes: nothing
- Produces: reduced CLS

- [ ] **Step 1: Add preload links for font files**

After the Google Fonts stylesheet link (line 31), add:
```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Source+Code+Pro:wght@400;500&display=swap" />
```

Note: Google Fonts doesn't expose direct font file URLs for preload reliably. The best practice is to preconnect (already done) and use `font-display: swap`. So instead, verify that `font-display: swap` is the default in the Google Fonts URL (it is — `display=swap` is in the URL). No additional change needed — the existing setup is already optimal for CLS.

- [ ] **Step 2: Commit**

```bash
git commit -m "perf: verify font-display swap for CLS"
```

---

### Task 3: Back to Top Button

**Files:**
- Modify: `index.html` (before closing `</body>`)
- Modify: `css/style.css` (at end)
- Modify: `js/app.js` (at end)

**Interfaces:**
- Consumes: nothing
- Produces: `.back-to-top` element + scroll handler

- [ ] **Step 1: Add back-to-top HTML**

In `index.html` before the closing `</body>` tag, add:
```html
<!-- Back to Top -->
<button id="backToTop" class="back-to-top" aria-label="Back to top">
  <i class="bx bx-chevron-up"></i>
</button>
```

- [ ] **Step 2: Add back-to-top CSS**

Append to `css/style.css`:
```css
/* ── Back to Top ─────────────────────────── */
.back-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: #4F46E5;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition: opacity 0.25s, transform 0.25s, background 0.2s;
  z-index: 40;
}
.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.back-to-top:hover {
  background: #4338CA;
}
.light .back-to-top {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

- [ ] **Step 3: Add back-to-top JS**

Append to `js/app.js` inside the `DOMContentLoaded` callback:
```javascript
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
```

- [ ] **Step 4: Verify**

Scroll past 300px — button appears. Click — smooth scroll to top. Toggle light mode — button visible and styled.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/app.js
git commit -m "feat: add back-to-top button"
```

---

### Task 4: 404 Page

**Files:**
- Create: `404.html` (root)

**Interfaces:**
- Consumes: nothing
- Produces: standalone 404 page

- [ ] **Step 1: Create 404.html**

Create `404.html` at root with inline styles (no Tailwind dependency). Design: dark default, bone white light mode, centred content, logo, 404 text, description, home button.

```html
<!doctype html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>404 — Halaman Tidak Ditemukan | Dimas Mayoni</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: #0a0a0a;
      color: #a8a29e;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      transition: background 0.3s, color 0.3s;
    }
    body.light {
      background: #F9F6F0;
      color: #78716c;
    }
    .logo {
      font-family: 'Source Code Pro', monospace;
      font-size: 0.875rem;
      color: #57534e;
      margin-bottom: 2rem;
    }
    .logo span { color: #06B6D4; }
    .code { font-size: 6rem; font-weight: 800; font-family: 'Outfit', sans-serif; line-height: 1; }
    .code span { background: linear-gradient(135deg, #4F46E5, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .msg { font-size: 1rem; margin: 1rem 0 2rem; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #fff;
      background: #4F46E5;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      transition: background 0.2s, transform 0.15s;
    }
    .btn:hover { background: #4338CA; transform: translateY(-2px); }
    .theme-toggle {
      position: fixed;
      top: 1rem;
      right: 1rem;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 0.5rem;
      border: 1px solid #292524;
      background: transparent;
      color: #a8a29e;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: border-color 0.2s, color 0.2s;
    }
    body.light .theme-toggle {
      border-color: #e7e5e4;
      color: #57534e;
    }
    .theme-toggle:hover { border-color: #4F46E5; color: #818CF8; }
    .status { font-family: 'Source Code Pro', monospace; font-size: 0.75rem; color: #57534e; margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
    <i class="bx bx-moon"></i>
  </button>
  <p class="logo">mayoni<span>_</span></p>
  <p class="status">// status_404</p>
  <p class="code"><span>404</span></p>
  <p class="msg">Halaman yang kamu cari tidak ditemukan.</p>
  <a href="/" class="btn"><i class="bx bx-arrow-back"></i> Kembali ke Beranda</a>

  <script>
    const html = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('i');
    const saved = localStorage.getItem('porto-theme');
    if (saved === 'light') {
      html.classList.remove('dark');
      document.body.classList.add('light');
      icon.classList.replace('bx-moon', 'bx-sun');
    }
    toggle.addEventListener('click', function() {
      const isDark = html.classList.contains('dark');
      html.classList.toggle('dark', !isDark);
      document.body.classList.toggle('light', isDark);
      icon.classList.replace(isDark ? 'bx-moon' : 'bx-sun', isDark ? 'bx-sun' : 'bx-moon');
      localStorage.setItem('porto-theme', isDark ? 'light' : 'dark');
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `404.html` in browser. Check: dark mode default, light mode toggle works, "Kembali ke Beranda" link works. Deploy by Vercel — Vercel auto-serves `404.html` from root for unmatched routes.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "feat: add custom 404 page"
```

---

### Task 5: JSON-LD Structured Data

**Files:**
- Modify: `index.html` head (before closing `</head>`)

**Interfaces:**
- Consumes: nothing
- Produces: `<script type="application/ld+json">` block

- [ ] **Step 1: Add JSON-LD script**

Before `</head>` in `index.html`, insert:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dimas Mayoni",
  "jobTitle": "Web Developer",
  "url": "https://dimas-mayoni-2026-tau.vercel.app",
  "sameAs": [
    "https://github.com/Masoka01",
    "https://www.instagram.com/mayoni_1",
    "https://linkedin.com/in/dimas-mayoni-08662b271"
  ],
  "knowsAbout": ["Web Development", "UI Design", "Frontend Development"]
}
</script>
```

- [ ] **Step 2: Verify**

Open `index.html`, inspect source — JSON-LD script present. Use Google Rich Results Test or Schema.org validator if desired.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add JSON-LD structured data"
```

---

### Task 6: Image Loading Placeholder (Blur-Up)

**Files:**
- Modify: `css/style.css` (at end)

**Interfaces:**
- Consumes: nothing
- Produces: CSS blur-up transition on `.proj-thumb img`

- [ ] **Step 1: Add blur-up CSS**

Append to `css/style.css`:
```css
/* ── Image blur-up ───────────────────────── */
.proj-thumb img {
  filter: blur(10px);
  transition: filter 0.4s ease;
}
.proj-thumb img.loaded {
  filter: blur(0);
}
```

- [ ] **Step 2: Add loading JS for images**

In `js/app.js` inside `DOMContentLoaded`, append:
```javascript
// ── Image blur-up ──────────────────────────
document.querySelectorAll(".proj-thumb img").forEach(function (img) {
  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", function () {
      img.classList.add("loaded");
    });
  }
});
```

- [ ] **Step 3: Fix existing CSS conflict**

The existing `style.css` has `.proj-thumb img` at line 331 with `transition: transform 0.5s ease`. We need to merge the two rules — combine them so both `filter` and `transform` transitions work:

Edit lines 331-339 in `style.css`:
```
Old:
.proj-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.proj-card:hover .proj-thumb img {
  transform: scale(1.05);
}

New:
.proj-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(10px);
  transition: transform 0.5s ease, filter 0.4s ease;
}
.proj-thumb img.loaded {
  filter: blur(0);
}
.proj-card:hover .proj-thumb img {
  transform: scale(1.05);
}
```

- [ ] **Step 4: Verify**

Open page. Project images start blurry, then clear up once loaded. Hover still has scale effect. No console errors.

- [ ] **Step 5: Commit**

```bash
git add css/style.css js/app.js
git commit -m "feat: add blur-up image loading effect"
```

---

### Task 7: Stat Counter Animation

**Files:**
- Modify: `index.html` (About stats section)
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: `.reveal` observer already exists in app.js
- Produces: animated stat numbers

- [ ] **Step 1: Update stat HTML with data attributes**

In `index.html`, update the three stat boxes (lines 237-251) to use `data-target` and a visible starting value of `0`:
```html
<div class="flex gap-4 mt-4">
  <div class="flex-1 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-center">
    <p class="stat-num font-head text-2xl font-bold text-ink dark:text-white" data-target="10" data-suffix="+">0</p>
    <p class="text-xs text-stone-500 mt-1 font-medium">Projects</p>
  </div>
  <div class="flex-1 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-center">
    <p class="stat-num font-head text-2xl font-bold text-ink dark:text-white" data-target="4" data-suffix="+">0</p>
    <p class="text-xs text-stone-500 mt-1 font-medium">Frameworks</p>
  </div>
  <div class="flex-1 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-center">
    <p class="stat-num font-head text-2xl font-bold text-ink dark:text-white" data-target="2026">0</p>
    <p class="text-xs text-stone-500 mt-1 font-medium">Active</p>
  </div>
</div>
```

- [ ] **Step 2: Add stat counter CSS**

Append to `css/style.css`:
```css
/* ── Stat Counter ────────────────────────── */
.stat-num { font-variant-numeric: tabular-nums; }
```

- [ ] **Step 3: Add stat counter JS**

In `js/app.js` inside `DOMContentLoaded`, append:
```javascript
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
```

- [ ] **Step 4: Verify**

Scroll to About section. Numbers animate from 0 → target (10, 4, 2026). Animation starts only when section is visible. No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/app.js
git commit -m "feat: add stat counter animation"
```

---

### Task 8: Project Filter

**Files:**
- Modify: `index.html` (add filter bar before project grid)
- Modify: `css/style.css` (filter styles)
- Modify: `js/app.js` (filter logic)

**Interfaces:**
- Consumes: nothing (self-contained feature)
- Produces: `.proj-card` filtering by data-category attribute

- [ ] **Step 1: Add data-category attributes to project cards**

Add `data-category` attribute to each `.proj-card` in `index.html`:
- Card 1 (Curriculum Vitae): `data-category="web"`
- Card 2 (Louwes Store): `data-category="web"`
- Card 3 (IDX Technical Analyzer): `data-category="web"`
- Card 4 (Admin Dashboard): `data-category="dashboard private"`
- Card 5 (Mayoni.Code): `data-category="web landing"`
- Card 6 (BrandDash): `data-category="dashboard"`
- Card 7 (MayNote): `data-category="web"`
- Card 8 (Anestesi Lab): `data-category="web private"`

- [ ] **Step 2: Add filter bar HTML**

After the `.sec-title` in the Work section (after line 319), add:
```html
<div class="filter-bar reveal">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="web">Web</button>
  <button class="filter-btn" data-filter="dashboard">Dashboard</button>
  <button class="filter-btn" data-filter="landing">Landing</button>
  <button class="filter-btn" data-filter="private">Private</button>
</div>
```

- [ ] **Step 3: Add filter CSS**

Append to `css/style.css`:
```css
/* ── Project Filter ──────────────────────── */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.filter-btn {
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  padding: 0.4rem 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #292524;
  background: transparent;
  color: #78716c;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.light .filter-btn {
  border-color: #e7e5e4;
  color: #a8a29e;
}
.filter-btn:hover {
  border-color: #4F46E5;
  color: #818CF8;
}
.filter-btn.active {
  background: #4F46E5;
  color: #fff;
  border-color: #4F46E5;
}
.light .filter-btn.active {
  color: #fff;
}
```

- [ ] **Step 4: Add filter JS**

In `js/app.js` inside `DOMContentLoaded`, append:
```javascript
// ── Project Filter ─────────────────────────
(function() {
  const filterBar = document.querySelector(".filter-bar");
  if (!filterBar) return;
  const btns = filterBar.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".proj-card");

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
    });
  });
})();
```

- [ ] **Step 5: Verify**

Click each filter tab. Only matching project cards visible. "All" shows all 8. Tabs highlight correctly. No console errors.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/app.js
git commit -m "feat: add project filter tabs"
```

---

### Task 9: Rebuild Tailwind & Final Verification

**Files:**
- Modify: `css/tailwind.css` (regenerated)

- [ ] **Step 1: Rebuild Tailwind**

```bash
npm run build:css
```

- [ ] **Step 2: Final browser check**

Open `index.html`. Walk through:
1. Hero — no jQuery chip, tech chips visible.
2. Navbar — scroll, toggle light/dark, text readable.
3. About — stats animate on scroll.
4. Skills — no regressions.
5. Work — filter tabs work, all 8 cards filter correctly, image blur-up works, back-to-top appears on scroll.
6. Contact — LinkedIn button present.
7. Footer — no breakage.
8. Toggle light/dark — everything consistent.

- [ ] **Step 3: Commit**

```bash
git add css/tailwind.css
git commit -m "build: rebuild tailwind after changes"
```
