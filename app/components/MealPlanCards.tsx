'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import DietPlan from "../../public/assets/DietPlan.png";
import ProteinPlan from "../../public/assets/ProteinPlan.png";
import RoyalPlan from "../../public/assets/RoyalPlan.png";
import Link from "next/link";

type MealPlan = {
    meal_id: string,
    plan_name: string,
    short_desc: string,
    price: number,
};

export default function MealPlanCards () {
    const [meal, setMeal] = useState<MealPlan[]>([]);
    useEffect(() => {
        const fetchMeal = async () => {
            const { data, error } = await supabase
            .from('meal_plans')
            .select('meal_id, plan_name, short_desc, price');
            if (error) console.error(error);
            if (data) setMeal(data);
        }

    fetchMeal();
    }, []);

    const getImage = (planName: string) => {
        if(planName.includes("Diet")) return DietPlan;
        if(planName.includes("Protein")) return ProteinPlan;
        if(planName.includes("Royal")) return RoyalPlan;
        return DietPlan;
    }
    
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center px-10 md:px-20 py-10 md:py-24">
                <h1 className='font-bold text-2xl text-[#323232] bg-transparent'>Meal Plans</h1>
                <div className='flex flex-col md:flex-row items-center justify-center text-center px-10 md:px-20 py-10 md:py-24 gap-y-5 md:gap-x-10 bg-transparent'>
                {meal.map((meal) => (
                    <div key={meal.meal_id} className="flex flex-col bg-white rounded-lg items-center justify-center drop-shadow-md gap-y-3 px-5 py-7 md:w-1/3 hover:scale-105">
                        <div className="bg-orange-400 rounded-full p-3">
                            <Image src={getImage(meal.plan_name)} alt="Diet Plan" className="w-44 bg-transparent" />
                        </div>
                        <h1 className="bg-transparent font-bold text-xl">{meal.plan_name}</h1>
                        <p className="bg-transparent">{meal.short_desc}</p>
                        <h3 className="bg-transparent font-semibold text-lg text-orange-400">Rp{meal.price}</h3>
                        <Link href={`/Menu/${meal.meal_id}`}>
                            <button className="bg-orange-400 px-3 py-1 text-center text-white rounded-lg font-semibold hover:bg-orange-200 hover:text-orange-500 transition">Show Details</button>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </>
    )
}