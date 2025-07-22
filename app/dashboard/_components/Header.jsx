import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className="p-4">
      <Image src="/logo.svg" width={160} height={100} alt="logo" />
    </div>
  );
}

export default Header;
