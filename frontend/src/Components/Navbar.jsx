import React, { useState } from 'react';

import { Link } from 'react-scroll';
import Footer from './Footer';
import Hero from './Hero';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const LNavbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00d25b]'>TRACKIT</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'><a style={{ cursor: 'pointer' }}>Home</a></li>

        <li className='p-4'>
          <a style={{ cursor: 'pointer' }}>  <Link to="Features" smooth={true} duration={600}>Features</Link></a>
        </li>
        <li className='p-4'>
          <a style={{ cursor: 'pointer' }}><Link to="cards" smooth={true} duration={600}>Reviews</Link></a>
        </li>
        {/* <li className='p-4'>
        <a style={{cursor: 'pointer'}}><Link to="footer" smooth={true} duration={600}>Footer</Link></a>
        </li> */}
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>TRACKIT.</h1>
        <a><li className='p-4 border-b border-gray-600'>Home</li></a>
        <a><li className='p-4 border-b border-gray-600'>Features</li></a>
        <li className='p-4 border-b border-gray-600'>Reviews</li>
        {/* <li className='p-4 border-b border-gray-600'>Contact</li> */}
        {/* <li className='p-4'>Contact</li> */}
      </ul>
    </div>
  );
};

export default LNavbar;