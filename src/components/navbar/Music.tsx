import { useState } from 'react';
import musicIcon from '../../assets/music.png';
import musicOff from '../../assets/musicOff.png';

const Music = () => {
  const [music, setMusic] = useState<boolean>(true);
  return (
    <button
      // `shrink-0` WAJIB: isi tombol ini murni `absolute`, jadi tidak punya
      // kontribusi lebar in-flow. Tanpa shrink-0, saat navbar kekurangan ruang
      // flexbox menyusutkannya sampai 0px dan tombol musik "menghilang".
      className='relative h-10 w-10 shrink-0 cursor-pointer'
      onClick={() => setMusic(!music)}
    >
      <img
        src={musicIcon}
        alt=''
        className={`absolute top-0 w-9 h-9 ${music ? 'speaker-animation' : 'invisible'}`}
      />
      <img
        src={musicOff}
        alt=''
        className={`absolute top-0 w-10 h-10 ${music ? 'invisible' : ''}`}
      />
    </button>
  );
};

export default Music;
