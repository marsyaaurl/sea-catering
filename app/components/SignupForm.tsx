'use client';
import { supabase } from "@/lib/supabaseClient"; 
import { useState } from 'react';

export default function SignupForm () {
    const [userID, setUserID] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if(data?.user) {
        const { error } = await supabase
            .from('profiles')
            .insert([
                {
                user_id: data.user.id,
                full_name: fullName,
                email,
                }
            ]);
        if(error) {
            console.log(error);
        }
    }

    }
    return (
        <>
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
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-[#323232]">Email*</label>
                            <input 
                                placeholder="Your Email"
                                value={email}
                                type="text"
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

                    <button
                    type="submit"
                    className="bg-orange-400 text-white font-semibold rounded-lg px-4 py-2 hover:bg-orange-200 hover:text-orange-500 transition"
                    >
                    Submit
                    </button>
                </form>
            </div>
        </>
    )
}