'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import dynamic from 'next/dynamic';

// Dynamically import Navbar to prevent hydration issues
const Navbar = dynamic(() => import('../components/Navbar'), {
  ssr: false,
});

export function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {mounted && <Navbar />}
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
