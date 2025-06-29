'use client';

import { Krona_One } from 'next/font/google';
import Link from 'next/link';
import { Soup } from 'lucide-react';
import { useState } from 'react';

const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-6 py-4 flex w-full items-center justify-between fixed">
      {/* Left Logo */}
      <div className="flex flex-row items-center gap-x-2">
        <Soup className="text-orange-400 w-6 h-6" />
        <h1
          className={`${kronaOne.className} text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 text-lg`}
        >
          SEA
        </h1>
      </div>

      {/* Hamburger Icon (mobile only) */}
      <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Nav Links (Desktop) */}
      <div className="hidden md:flex flex-row gap-x-8 text-[#323232] items-center">
        <Link href="/" className="text-sm font-semibold hover:text-orange-400">Home</Link>
        <Link href="/" className="text-sm font-semibold hover:text-orange-400">Menu</Link>
        <Link href="/" className="text-sm font-semibold hover:text-orange-400">Subscription</Link>
        <Link href="/" className="text-sm font-semibold hover:text-orange-400">Contact Us</Link>
        <Link href="/" className="bg-orange-400 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-orange-200 hover:text-orange-400 transition">
          Login
        </Link>
      </div>

      {/* Nav Links (Mobile dropdown) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col gap-y-3 bg-white px-6 py-4 md:hidden z-10">
          <Link href="/" className="text-sm font-semibold hover:text-orange-400">Home</Link>
          <Link href="/" className="text-sm font-semibold hover:text-orange-400">Menu</Link>
          <Link href="/" className="text-sm font-semibold hover:text-orange-400">Subscription</Link>
          <Link href="/" className="text-sm font-semibold hover:text-orange-400">Contact Us</Link>
          <Link href="/" className="bg-orange-400 text-white px-3 py-1 rounded-lg items-center text-sm font-semibold hover:bg-white hover:text-orange-400 transition">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
