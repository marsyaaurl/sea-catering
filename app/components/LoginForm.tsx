'use client';

import { supabase } from "@/lib/supabaseClient"; 
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({ 
            email, password
        });

        if (error) {
            alert(error.message);
        } else {
            router.push('/Profile');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 py-24">
            <h1 className='font-bold text-2xl text-[#323232] bg-transparent'>Login to Your Account</h1>
            <form 
                onSubmit={handleLogin}
                className="flex flex-col gap-y-4 w-full max-w-xl p-6 rounded-lg"
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold text-[#323232]">Email*</label>
                    <input 
                        placeholder="Your Email"
                        value={email}
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 rounded-lg px-3 py-2"
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
                    />
                </div>

                <div className="text-right">
                    <Link href="/Signup" className='text-blue-500 hover:text-gray-400'>
                        Daftar Akun
                    </Link>
                </div>

                <button
                    type="submit"
                    className="bg-orange-400 text-white font-semibold rounded-lg px-4 py-2 hover:bg-orange-200 hover:text-orange-500 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
