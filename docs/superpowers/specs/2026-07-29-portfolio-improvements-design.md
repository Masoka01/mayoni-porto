# Portfolio Improvements — Design Spec

**Date:** 2026-07-29
**Project:** mayoni-porto
**Goal:** Upgrade single-page portfolio with fixes, UX polish, SEO, and interactivity.

---

## Fase 1 — Quick Fixes

### 1. Hapus jQuery dari Hero Tech Chips
- **File:** `index.html` line 150
- **Action:** Hapus chip `<span class="tech-chip"><i class="bx bxl-jquery" style="color:#06B6D4"></i> jQuery</span>`
- **Note:** jQuery sudah dihapus dari codebase, chip ini menyesatkan.

### 2. Fix Warna Navbar Scrolled Light Mode
- **Files:** `css/style.css` lines 57-66
- **Problem:** Saat light mode + scrolled, background `rgba(250,250,249,0.92)` dengan teks `#fff` (nav-logo) tidak terbaca.
- **Fix:** Tambah `.light #navbar.scrolled .nav-logo { color: #0a0a0a; }`

### 3. Tambah LinkedIn Social Button
- **File:** `index.html` — baris social buttons di section Contact
- **Action:** Tambah `<a href="https://linkedin.com/in/..." target="_blank" class="soc-btn"><i class="bx bxl-linkedin"></i> LinkedIn</a>`
- **Note:** URL LinkedIn perlu diisi user.

### 6. Font Preloading
- **File:** `index.html` head section
- **Action:** Tambah `<link rel="preload" ...>` untuk font files (Outfit, Inter, Source Code Pro) untuk mengurangi CLS.
- **Detail:** Preconnect sudah ada, tambah preload untuk font file URLs dari Google Fonts.

### 12. Back to Top Floating Button
- **Files:** `index.html` (before `</body>`), `css/style.css`, `js/app.js`
- **Action:** Floating button pojok kanan bawah, muncul setelah scroll > 300px, smooth scroll ke `#home`.

---

## Fase 2 — Content & SEO

### 9. JSON-LD Structured Data
- **File:** `index.html` head section
- **Action:** Tambah JSON-LD script untuk `Person` dan `WebSite` schema.
- **Data:** Nama, job title, URL portfolio, social profiles, description.

### 3. Halaman 404 Kustom
- **File:** `404.html` (root)
- **Action:** Buat halaman 404 dengan desain konsisten (dark/light, navbar minimal, back to home button).
- **Vercel:** Sudah otomatis serve `404.html` dari root.

### 11. Image Loading Placeholder
- **File:** `css/style.css`
- **Action:** Tambah CSS blur-up effect: gambar punya `filter: blur(10px)` sebelum fully loaded, transisi ke clear.
- **Note:** Menggunakan teknik CSS native, tanpa JS library.

---

## Fase 3 — Animasi & Interaksi

### 10. Stat Counter Animation
- **Files:** `index.html` (stats di About), `js/app.js`, `css/style.css`
- **Action:** Angka `10+`, `4+`, `2026` di about section animasi count-up saat terlihat (IntersectionObserver).
- **Detail:** Hitung dari 0 ke target, durasi ~1.5s, ease-out.

### 4. Project Filter Tabs
- **Files:** `index.html` (tambah filter bar before project grid), `js/app.js`, `css/style.css`
- **Action:** Tab filter: All / Web / Dashboard / Landing / Private
- **Kategori mapping:**
  - Web: Curriculum Vitae, Louwes Store, IDX Technical Analyzer, MayNote, Mayoni.Code
  - Dashboard: Admin Dashboard, BrandDash
  - Landing: Mayoni.Code
  - Private: Admin Dashboard, Anestesi Lab
- **Behavior:** Klik tab → animasi fade/slide, grid filter. Default "All".

---

## Fase 4 — Content (butuh input user)

### 5. Work Experience Timeline
- **Files:** New section di `index.html` (sebelum Skills), `css/style.css`
- **Action:** Vertical timeline dengan dot dan card per entry.
- **Menunggu user:** User perlu provide work history entries (company, role, period, description).

### 8. Image srcset Optimization
- **Files:** `index.html` img tags
- **Action:** Generate 2-3 ukuran per image (e.g., 400w, 800w), pakai `<picture>` atau `<img srcset>`.
- **Menunggu user:** Butuh tooling atau manual resize gambar.

---

## Non-Goals
- Tidak mengganti design system (tetap PipelinePro adapted).
- Tidak menambah framework/library baru.
- Tidak refactor besar — perubahan targeted per item.

## Success Criteria
1. jQuery chip hilang dari hero.
2. Navbar light mode scrolled terbaca.
3. LinkedIn button functional.
4. Back to top muncul setelah scroll jauh.
5. Halaman 404 kustom tampil.
6. JSON-LD terdeteksi di markup.
7. Stat counter animasi smooth.
8. Project filter bekerja tanpa error.
9. Font loading lebih cepat (CLS berkurang).
10. Image placeholder blur-up efektif.
