'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';


type Testimonials = {
    testi_id: string,
    name: string,
    meal_plan: string,
    message: string,
    rating: number,
}

export default function TestiCard () {
    const [testi, setTesti] = useState<Testimonials[]>([]);

    useEffect(() => {
        const fetchTesti = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                if(error){
                    console.log(error)
                }
                if(data) {
                    setTesti(data)
                }
        }
    fetchTesti();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center px-10 md:px-20 py-10 md:py-24 bg-orange-400">
                <h1 className='font-bold text-2xl text-white bg-transparent'>Testimonials</h1>

                <div className='w-full overflow-x-auto bg-transparent'>
                    <div className='flex flex-row items-start justify-start gap-x-7 min-w-max px-10 py-10 bg-transparent'>
                    {testi.map((testi) => (
                        <div key={testi.testi_id} className="flex-none w-64 h-72 flex flex-col bg-white rounded-lg items-center justify-center text-center drop-shadow-md gap-y-1 px-5 py-7 hover:scale-105">
                            <div className='bg-orange-200 w-16 h-16 rounded-full flex items-center justify-center'>
                                <User className='w-8 h-8 text-white bg-transparent' />
                            </div>
                            <h1 className="bg-transparent font-bold text-xl">{testi.name}</h1>
                            <p className="bg-transparent text-sm">{testi.meal_plan}</p>
                            <div className='flex gap-x-1'>
                                {[...Array(5)].map((_, index) => (
                                <span key={index} className='text-yellow-300'>
                                    {index < testi.rating ? '★' : '☆'}
                                </span>
                                ))}
                            </div>
                            <p className="bg-transparent text-md text-justify">{testi.message}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}