import { DESIGN, type DesignBox } from './measure';

/**
 * Geometri hero (implementasi Bagian 7 + 8: "ukur -> rem").
 *
 * Semua angka ditulis dalam DESAIN PX pada kanvas 1920 x 1080 (= 120rem x
 * 67.5rem). 1rem = 16 desain px, jadi seluruh komposisi otomatis proporsional
 * di semua ukuran layar tanpa satu pun media query.
 *
 * Dipisah dari komponen supaya angka ini bisa diverifikasi/diuji langsung
 * (lihat skrip verifikasi) dan nanti bisa dipakai ulang oleh varian mobile.
 */

/**
 * Rasio aset = lebar / tinggi dari **ukuran PNG PENUH** (bukan content bbox).
 * Ini penting: karena kita hanya men-set `height`, browser menghitung lebar
 * dari ukuran intrinsik PNG-nya. Rasio di sini harus sama persis dengan yang
 * dipakai browser, kalau tidak `left` hasil hitungan JS akan meleset beberapa
 * px dari posisi gambar yang sebenarnya dirender.
 *
 * Hasil `magick identify -format '%wx%h|%@'`:
 *  - bg1.png      : full 1442 x 1573 | content 1442 x 1570 +0+0
 *  - hero.png     : full 1921 x 1537 | content 1920 x 1535 +1+1
 *  - zzz_side.png : full  165 x 1412 | content  165 x 1412 +0+0
 */
export const RATIO = {
  background: 1442 / 1573, // 0.91672
  main: 1921 / 1537, // 1.24984
  side: 165 / 1412, // 0.11686 (dihitung browser dari height)
} as const;

/**
 * SATU-SATUNYA KNOB yang perlu diputar: tinggi artwork utama (KV) dalam desain
 * px. Semua angka lain diturunkan darinya sehingga komposisi tidak pernah
 * pecah: begitu nilai ini diubah, bg1 dan zzz_side otomatis ikut menyesuaikan
 * (tengah / menempel).
 */
export const MAIN_HEIGHT = DESIGN.height; // 1080 = setinggi kanvas

/** Lebar KV = tinggi x rasio (dipakai untuk menghitung posisi tengah). */
export const MAIN_WIDTH = MAIN_HEIGHT * RATIO.main; // 1349.83

/** KV diletakkan presisi di tengah: sisa ruang kanvas dibagi dua. */
export const MAIN_LEFT = (DESIGN.width - MAIN_WIDTH) / 2; // 285.09

/** Strip glyph vertikal: 75% tinggi KV, ikut ter-tengah secara vertikal. */
export const SIDE_HEIGHT = MAIN_HEIGHT * 0.75; // 810

/** Lebar strip hasil hitungan browser (untuk dokumentasi & verifikasi). */
export const SIDE_WIDTH = SIDE_HEIGHT * RATIO.side; // 94.65

/** Tepi kanan KV = tepi kiri strip -> keduanya benar-benar menempel. */
export const MAIN_RIGHT = MAIN_LEFT + MAIN_WIDTH; // 1634.91

/**
 * Komposisi akhir pada kanvas 1920 x 1080:
 *
 *   [bg1: 0 .. 990.06]          <- background di KIRI KV, rata kiri + rata atas
 *        [hero: 285.09 .. 1634.91]  <- KV persis di tengah kanvas
 *                            [side: 1634.91 .. 1729.56]  <- MENEMPEL di kanan KV
 *
 * `background.top = 0` membuat artwork rata atas kanvas. Karena Home.tsx
 * memulai kanvas tepat di bawah navbar (mt-[4.5rem]), bg1 jadi menempel ke
 * navbar tanpa celah.
 */

const SIDE_RATIO_OF_KV = 0.98;

export const HERO_LAYOUT: Record<'background' | 'main' | 'side', DesignBox> = {
  background: {
    left: 0,
    top: (DESIGN.height - SIDE_HEIGHT) / 2,
    height: DESIGN.height,
  },
  main: { left: MAIN_LEFT, top: 0, height: MAIN_HEIGHT },
  side: {
    left: MAIN_RIGHT + 16,
    top: (DESIGN.height * SIDE_RATIO_OF_KV - SIDE_HEIGHT) / 2,
    height: SIDE_HEIGHT,
  },
};
