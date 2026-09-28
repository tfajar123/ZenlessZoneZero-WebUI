import type { CSSProperties } from 'react';

/**
 * Kanvas desain (implementasi Bagian 8: "ukur -> rem").
 *
 * Semua angka layout ditulis dalam **desain px** pada kanvas 1920 x 1080, lalu
 * dikonversi ke `rem` oleh designBox(). Karena root font-size dihitung oleh
 * src/lib/flexible.ts (SCALE.pc: designWidth 1920, baseFontSize 16), maka:
 *
 *   1rem === 16 desain px   (saat lebar layar >= 1920 px, root = 16px)
 *
 * Dengan begitu seluruh layout (termasuk `position: absolute`) ikut membesar /
 * mengecil proporsional tanpa satu pun media query.
 *
 * KENAPA 1920 DAN BUKAN 1440?
 * Konten navbar yang sudah ada (logo 160px + 6 menu `gap-10` + Download +
 * 3 ikon) berjumlah ~1343px. Navbar memakai `px-[15rem]` (= 240px per sisi),
 * jadi ruang yang dibutuhkan minimal 1343 + 480 = 1823px. Pada kanvas 1440px
 * angkanya MUSTAHIL muat -> flex item menyusut (label wrap 2 baris dan tombol
 * Music yang isinya murni `absolute` menyusut ke 0 sehingga hilang). Di kanvas
 * 1920px semuanya muat dengan sisa 97px.
 *
 * ------------------------- TABEL KONVERSI (base 16) --------------------------
 *  40px =  2.5rem       240px    = 15rem         990.06px  = 61.8786rem
 *  72px =  4.5rem       285.09px = 17.8178rem   1080px     = 67.5rem
 *  96px =  6rem         810px    = 50.625rem     1349.83px = 84.3646rem
 * 135px =  8.4375rem    828px    = 51.75rem      1634.91px = 102.1821rem
 * 160px = 10rem         900px    = 56.25rem      1920px     = 120rem
 * ---------------------------------------------------------------------------
 *
 * ANGKA GEOMETRI HERO ada di src/lib/heroLayout.ts (dalam desain px), lengkap
 * dengan rasio aset hasil `magick identify`. File itu juga dipakai skrip
 * verifikasi, jadi angka yang diuji = angka yang benar-benar dirender.
 */
export const DESIGN = {
  width: 1920,
  height: 1080,
  baseFontSize: 16,
} as const;

/**
 * Tinggi navbar dalam rem: `py-4` (2rem) + konten tertinggi `h-10` (2.5rem).
 * Dipakai Home.tsx sebagai jarak atas hero supaya artwork benar-benar menempel
 * ke bawah navbar (tanpa celah). Kalau padding/tinggi di Navbar.tsx diubah,
 * ubah angka ini juga.
 */
export const NAV_HEIGHT_REM = 4.5;

/** Lebar kanvas dalam rem (harus sama dengan `@utility canvas` di index.css). */
export const CANVAS_WIDTH_REM = DESIGN.width / DESIGN.baseFontSize; // 120rem

/** Tinggi kanvas 16:9 dalam rem. */
export const CANVAS_HEIGHT_REM = DESIGN.height / DESIGN.baseFontSize; // 67.5rem

/** desain px -> rem, mis. toRem(240) === "15rem" */
export const toRem = (designPx: number): string =>
  `${Number((designPx / DESIGN.baseFontSize).toFixed(4))}rem`;

/** Kebalikannya: rem -> desain px, mis. toDesignPx(15) === 240 */
export const toDesignPx = (rem: number): number => rem * DESIGN.baseFontSize;

export type DesignBox = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
};

/**
 * Mengubah kotak dalam desain px menjadi `style` berbasis rem.
 *
 * Kenapa memakai `style` dan bukan class Tailwind? Karena Tailwind hanya
 * meng-compile class yang tertulis **literal** di source. Class hasil
 * interpolasi seperti `left-[${x}rem]` tidak akan pernah di-generate, sehingga
 * layoutnya diam-diam rusak. Untuk nilai hasil pengukuran, inline style dalam
 * rem adalah cara yang aman dan tetap proporsional.
 *
 * CATATAN: kalau nilainya tetap/tidak berubah, kamu boleh menuliskannya sebagai
 * class literal biasa, mis. `left-[7.5rem]` untuk 120 desain px.
 */
export const designBox = (box: DesignBox): CSSProperties => {
  const style: CSSProperties = {};

  if (box.left !== undefined) style.left = toRem(box.left);
  if (box.top !== undefined) style.top = toRem(box.top);
  if (box.right !== undefined) style.right = toRem(box.right);
  if (box.bottom !== undefined) style.bottom = toRem(box.bottom);
  if (box.width !== undefined) style.width = toRem(box.width);
  if (box.height !== undefined) style.height = toRem(box.height);

  return style;
};

/**
 * Cara mengukur elemen yang sudah ter-render kembali ke desain px
 * (jalankan di DevTools console pada situs tiruan kamu):
 *
 *   const canvas = document.querySelector('section');
 *   const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
 *   const base = 16; // DESIGN.baseFontSize
 *   canvas.querySelectorAll('img').forEach((img, i) => {
 *     const a = img.getBoundingClientRect();
 *     const c = canvas.getBoundingClientRect();
 *     console.log(i, {
 *       left: Math.round(((a.left - c.left) / root) * base),
 *       top: Math.round(((a.top - c.top) / root) * base),
 *       width: Math.round((a.width / root) * base),
 *       height: Math.round((a.height / root) * base),
 *     });
 *   });
 *
 * Angka yang keluar adalah desain px -> masukkan ke HERO_LAYOUT / objek serupa.
 */
