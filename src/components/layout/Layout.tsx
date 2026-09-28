import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Layout = () => {
  return (
    <>
      {/* min-h = tinggi navbar (4.5rem) + tinggi kanvas hero (67.5rem) = 72rem,
          supaya halaman tidak pernah lebih pendek dari isinya di layar besar. */}
      <main className='font-["Inpin"] min-h-[72rem] bg-white'>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
