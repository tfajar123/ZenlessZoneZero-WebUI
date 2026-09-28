import { useEffect, useState } from 'react';
import zzzLogo from '../../assets/ZZZ.png';
import smallLogo from '../../assets/zzz small.png';
import shareIcon from '../../assets/share.png';
import userIcon from '../../assets/userIcon.png';
import Button from './Button';
import type { navKey } from '../../types/type';
import Download from './Download';
import Music from './Music';

const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<string>('#home');

  // `scrolled` sudah dipakai untuk menukar logo besar <-> logo kecil, tapi belum
  // ada yang mengubah nilainya (sebelumnya ini bikin `tsc -b` gagal karena
  // setScrolled dianggap tidak terpakai).
  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItem: navKey[] = [
    {
      name: 'Homepage',
      path: '#home',
    },
    {
      name: 'Characters',
      path: '#characters',
    },
    {
      name: 'Videos',
      path: '#videos',
    },
    {
      name: 'News & Info',
      path: '#news',
    },
    {
      name: 'Background',
      path: '#background',
    },
    {
      name: 'More',
      path: '#more',
    },
  ];
  return (
    <nav className='fixed top-0 left-0 z-100 flex w-full items-center overflow-x-clip bg-black py-6 font-md text-stone-300'>
      <div className='canvas flex items-center px-[15rem]'>
        <div className='flex shrink-0 items-center gap-2 pl-16'>
          <div className='relative flex h-10 w-40 shrink-0 items-center'>
            <img
              src={zzzLogo}
              alt=''
              className={`absolute top-0 w-40 transition-all duration-300 ease-in-out ${scrolled ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}
            />
            <img
              src={smallLogo}
              alt=''
              className={`absolute top-0 w-35 transition-all duration-300 ease-in-out ${scrolled ? 'scale-100 opacity-100' : 'scale-100 opacity-0'}`}
            />
          </div>
          <div className='flex shrink-0 items-center gap-5'>
            {navItem.map((item, index) => (
              <Button
                key={index}
                title={item.name}
                path={item.path}
                isActive={active === item.path}
                onSelect={() => {
                  setActive(item.path);
                }}
              />
            ))}
          </div>
        </div>
        <div className='ml-auto flex shrink-0 items-center gap-5 pr-16'>
          <Download />
          <Music />
          <img src={shareIcon} alt='' className='w-10 shrink-0' />
          <img src={userIcon} alt='' className='w-10 shrink-0' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
