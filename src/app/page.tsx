'use client';

import { useState, useEffect } from 'react';
import Navbar from './_Components/navbar';
import FilterBar from './_Components/filterBar';
import ProductGrid from './_Components/product_grid';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 1000);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        {isMobile && !open && (
          <button
            className="fixed top-38 left-2 z-50 bg-white p-2 rounded shadow-md"
            onClick={() => setOpen(true)}
          >
            <span className="block w-6 h-1 bg-black mb-1"></span>
            <span className="block w-6 h-1 bg-black mb-1"></span>
            <span className="block w-6 h-1 bg-black"></span>
          </button>
        )}

        {isMobile && open && (
          <div className="fixed inset-0 z-40 bg-white p-4 overflow-auto">
            <button className="mb-4 text-red-500" onClick={() => setOpen(false)}>
              Close
            </button>
            <FilterBar />
          </div>
        )}

        {!isMobile && <FilterBar />}

        <div className="flex-1 overflow-y-auto p-4">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
