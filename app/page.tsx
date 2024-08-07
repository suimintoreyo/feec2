// app/page.tsx
'use client';

import React, { useState } from 'react';
import SideMenu from './components/SideMenu';

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      <button onClick={toggleMenu}>Open Menu</button>
      <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main style={{ marginLeft: isMenuOpen ? '250px' : '0', transition: 'margin-left 0.3s' }}>
        <h1>Welcome to the Home Page</h1>
        <p>This is your content</p>
      </main>
    </div>
  );
}
