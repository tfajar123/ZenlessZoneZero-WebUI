import bgWhite from '../../assets/bg1.png';
import hero from '../../assets/hero.png';
import zzzSide from '../../assets/zzz_side.png';
import { HERO_LAYOUT } from '../../lib/heroLayout';
import { designBox } from '../../lib/measure';

/**
 * Komposisi hero (tengah / menempel / rata) ditentukan di src/lib/heroLayout.ts
 * dalam satuan DESAIN PX pada kanvas 1920 x 1080, lalu designBox() mengubahnya
 * ke `rem` supaya ikut menskala bersama root font-size.
 *
 * Ringkasnya:
 *   [bg1: 0 .. 990.06]           background di KIRI KV, rata atas kanvas
 *        [hero: 285.09 .. 1634.91]   KV persis di tengah kanvas
 *                            [side: 1634.91 .. 1729.56]  strip MENEMPEL di kanan KV
 *
 * Yang di-set hanya `height` (bukan width) supaya browser menghitung lebar dari
 * rasio asli gambar -> gambar tidak pernah gepeng. (hero.png punya 1px border
 * transparan: pada skala 1080/1537 itu = 0.7 desain px, jadi secara mata strip
 * terlihat benar-benar menempel ke artwork KV.)
 */
const HeroSection = () => {
  return (
    <section className='canvas relative aspect-[16/9] select-none'>
      <img
        src={bgWhite}
        alt=''
        draggable={false}
        style={designBox(HERO_LAYOUT.background)}
        className='pointer-events-none absolute z-0'
      />
      <img
        src={hero}
        alt=''
        draggable={false}
        style={designBox(HERO_LAYOUT.main)}
        className='pointer-events-none absolute z-10'
      />
      <img
        src={zzzSide}
        alt=''
        draggable={false}
        style={designBox(HERO_LAYOUT.side)}
        className='pointer-events-none absolute z-20 scale-[130%]'
      />
    </section>
  );
};

export default HeroSection;
