'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log('Current path:', path);
  }, [path]);

  return (
    <div className="w-full bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white flex items-center justify-between h-[80px]">
      {/* Logo */}
      <Image
        src="/logo.svg"
        width={160}
        height={60}
        alt="logo"
        className="cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300 ml-6"
      />

      {/* Navigation */}
      <ul className="flex gap-8 mr-6">
        <li
          className={`cursor-pointer hover:text-blue-400 hover:font-bold transition-all ${
            path === '/dashboard' ? 'text-blue-400 font-bold' : ''
          }`}
        >
          Dashboard
        </li>
        <li
          className={`cursor-pointer hover:text-blue-400 hover:font-bold transition-all ${
            path.startsWith('/dashboard/questions') ? 'text-blue-400 font-bold' : ''
          }`}
        >
          Questions
        </li>
        <li
          className={`cursor-pointer hover:text-blue-400 hover:font-bold transition-all ${
            path.startsWith('/dashboard/upgrade') ? 'text-blue-400 font-bold' : ''
          }`}
        >
          Upgrade
        </li>
        <li
          className={`cursor-pointer hover:text-blue-400 hover:font-bold transition-all ${
            path.startsWith('/dashboard/how-it-works') ? 'text-blue-400 font-bold' : ''
          }`}
        >
          How it works?
        </li>
      </ul>
    </div>
  );
}

export default Header;

