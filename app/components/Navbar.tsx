'use client';

import { Krona_One } from 'next/font/google';
import Link from 'next/link';
import { Soup } from 'lucide-react';

const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Navbar() {
  return (
    <nav className='px-6 py-3 flex justify-between'>
      <div className=' flex flex-row gap-x-2 bg-transparent'>
        <Soup className='text-orange-400 text-2xl' />
        <h1 className={`${kronaOne.className} text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 text-lg`}>
            SEA
        </h1>
      </div>
      <div className='flex flex-row gap-x-8 text-[#323232] bg-transparent'>
        <Link href="/" className="bg-transparent text-sm font-semibold hover:text-orange-400">Home</Link>
        <Link href="/" className="bg-transparent text-sm font-semibold hover:text-orange-400">Menu</Link>
        <Link href="/" className="bg-transparent text-sm font-semibold hover:text-orange-400">Subscription</Link>
        <Link href="/" className="bg-transparent text-sm font-semibold hover:text-orange-400">Contact Us</Link>
      </div>
      <div>
        <Link href="/" className="bg-orange-400 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-white hover:text-orange-400">Login</Link>
      </div>
    </nav>
  );
}
