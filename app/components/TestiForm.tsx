'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestiForm () {
    const [name, setName] = useState('');
    const [mealPlan, setMealPlan] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase
            .from('testimonials')
            .insert([
                {name, 
                meal_plan: mealPlan, 
                message, 
                rating}
            ])
        if(error){
            console.log(error)
        }
        else {
            setName('')
            setMealPlan('')
            setMessage('')
            setRating(1)
        }
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center px-4 py-24">
                <h1 className='font-bold text-2xl text-[#323232] bg-transparent'>Write your own testimonial</h1>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-y-4 w-full max-w-xl p-6 rounded-lg"
                >
                    <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold text-[#323232]">Name</label>
                    <input
                        placeholder="Your Name"
                        value={name}
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 rounded-lg px-3 py-2"
                    />
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="mealPlan" className="font-semibold text-[#323232]">Meal Plan</label>
                    <select
                        value={mealPlan}
                        name="mealPlan"
                        onChange={(e) => setMealPlan(e.target.value)}
                        className="border-2 rounded-lg px-3 py-2"
                    >
                        <option value="">Select a Plan</option>
                        <option value="Diet Plan">Diet Plan</option>
                        <option value="Protein Plan">Protein Plan</option>
                        <option value="Royal Plan">Royal Plan</option>
                    </select>
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="message" className="font-semibold text-[#323232]">Message</label>
                    <input
                        placeholder="Your Message"
                        value={message}
                        type="text"
                        name="message"
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-2 rounded-lg px-3 py-2"
                    />
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="rating" className="font-semibold text-[#323232]">Rating</label>
                    <select
                        value={rating}
                        name="rating"
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border-2 rounded-lg px-3 py-2"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
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