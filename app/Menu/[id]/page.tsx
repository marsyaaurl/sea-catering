import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabaseClient';
import DietPlan from '../../../public/assets/DietPlan.png';
import ProteinPlan from '../../../public/assets/ProteinPlan.png';
import RoyalPlan from '../../../public/assets/RoyalPlan.png';
import Image from 'next/image';
import Footer from '@/app/components/Footer';

type MealPlan = {
    meal_id: string,
    plan_name: string,
    long_desc: string,
    price: number,
    menu_examples: string[],
};
 
export default async function DetailedMeal ({params}: {params: {id: string}}) {
    const { data, error} = await supabase
        .from('meal_plans')
        .select('*')
        .eq('meal_id', params.id)
        .single();
    
    if(error) {
        console.log(error)
    }
    console.log("params.id:", params.id);

    const getImage = (planName: string) => {
        if(planName.includes("Diet")) return DietPlan;
        if(planName.includes("Protein")) return ProteinPlan;
        if(planName.includes("Royal")) return RoyalPlan;
        return DietPlan;
    }
    return (
        <>
            <div>
                <Navbar />
                <div className='flex flex-col md:flex-row items-center justify-center px-10 py-20 gap-x-20'>
                    <div className='md:hidden'>
                        <Image src={getImage(data.plan_name)} alt={data.plan_name} className='w-72' />
                    </div>
                    <div className='flex flex-col md:w-1/2 text-[#323232] gap-y-2'>
                        <h1 className='font-bold text-2xl'>{data.plan_name}</h1>
                        <h2 className='font-bold text-xl text-orange-400'>Rp{data.price}</h2>
                        <p className='text-justify'>{data.long_desc}</p>
                        <p className='font-semibold'>These are some of our menus:
                            {data.menu_examples.map((menu: string, idx: number) => (
                                <li key={idx} className='font-light'>{menu}</li>
                            ))}
                        </p>
                    </div>
                    <div>
                        <Image src={getImage(data.plan_name)} alt={data.plan_name} className='w-72 hidden md:block' />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}