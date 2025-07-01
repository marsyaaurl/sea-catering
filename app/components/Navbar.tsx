'use client';

import { Krona_One } from 'next/font/google';
import Link from 'next/link';
import { Soup } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [isLoggedin, setIsLoggedin] = useState(false);

  // ✅ Cek session login
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    };

    checkSession();

    // ✅ Listen perubahan login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedin(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="px-6 py-4 flex w-full items-center justify-between fixed bg-white z-50 shadow-sm">
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
        <Link href="/" className={`text-sm font-semibold hover:text-orange-400 hover:border-b-2 hover:border-b-orange-400 ${pathName === '/' ? 'text-orange-400 border-b-2 border-b-orange-400' : 'text-[#323232]'}`}>Home</Link>
        <Link href="/Menu" className={`text-sm font-semibold hover:text-orange-400 hover:border-b-2 hover:border-b-orange-400 ${pathName === '/Menu' ? 'text-orange-400 border-b-2 border-b-orange-400' : 'text-[#323232]'}`}>Menu</Link>
        <Link href="/Subscription" className={`text-sm font-semibold hover:text-orange-400 hover:border-b-2 hover:border-b-orange-400 ${pathName === '/Subscription' ? 'text-orange-400 border-b-2 border-b-orange-400' : 'text-[#323232]'}`}>Subscription</Link>
        <Link href="/Profile" className={`text-sm font-semibold hover:text-orange-400 hover:border-b-2 hover:border-b-orange-400 ${pathName === '/Profile' ? 'text-orange-400 border-b-2 border-b-orange-400' : 'text-[#323232]'}`}>Profile</Link>

        {/* ✅ Login hanya tampil kalau belum login */}
        {!isLoggedin && (
          <Link href="/Login" className="bg-orange-400 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-orange-200 hover:text-orange-400 transition">
            Login
          </Link>
        )}
      </div>

      {/* Nav Links (Mobile dropdown) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col gap-y-3 bg-white px-6 py-4 md:hidden z-10">
          <Link href="/" className={`text-sm font-semibold hover:text-orange-400 ${pathName === '/' ? 'text-orange-400' : 'text-[#323232]'}`}>Home</Link>
          <Link href="/Menu" className={`text-sm font-semibold hover:text-orange-400 ${pathName === '/Menu' ? 'text-orange-400' : 'text-[#323232]'}`}>Menu</Link>
          <Link href="/Subscription" className={`text-sm font-semibold hover:text-orange-400 ${pathName === '/Subscription' ? 'text-orange-400' : 'text-[#323232]'}`}>Subscription</Link>
          <Link href="/Profile" className={`text-sm font-semibold hover:text-orange-400 ${pathName === '/Profile' ? 'text-orange-400' : 'text-[#323232]'}`}>Profile</Link>

          {/* ✅ Login hanya tampil kalau belum login */}
          {!isLoggedin && (
            <Link href="/Login" className="bg-orange-400 text-white px-3 py-1 rounded-lg items-center text-sm font-semibold hover:bg-white hover:text-orange-400 transition">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
