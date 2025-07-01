'use client';
import { supabase } from "@/lib/supabaseClient"; 
import { useState } from 'react';

export default function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://sea-catering-phi.vercel.app/Login',
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      // Optional: simpan nama user ke profile kalau diperlukan (tapi tunggu user verified)
      setMessage("Signup successful! Please check your email to verify your account.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-24">
      <h1 className='font-bold text-2xl text-[#323232] bg-transparent'>Sign Up</h1>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 w-full max-w-xl p-6 rounded-lg"
      >
        <div className="flex flex-col">
          <label htmlFor="fullname" className="font-semibold text-[#323232]">Full Name*</label>
          <input
            placeholder="Your Full Name"
            value={fullName}
            type="text"
            name="fullname"
            onChange={(e) => setFullName(e.target.value)}
            className="border-2 rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold text-[#323232]">Email*</label>
          <input 
            placeholder="Your Email"
            value={email}
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold text-[#323232]">Password*</label>
          <input 
            placeholder="Your Password"
            value={password}
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded-lg px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-400 text-white font-semibold rounded-lg px-4 py-2 hover:bg-orange-200 hover:text-orange-500 transition"
        >
          Submit
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}
