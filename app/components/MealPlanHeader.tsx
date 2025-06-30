import Image from 'next/image';
import MealHeader from "../../public/assets/MealHeader.png";

export default function MealPlanHeader () {
    return (
        <>
            <div className="relative">
                <Image 
                    src={MealHeader} 
                    alt="Meal Plans" 
                    className="w-full h-64 object-cover" 
                />
                <div className="absolute inset-0 bg-orange-300 mix-blend-multiply"></div>
            </div>
                
            <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                <h1 className="text-2xl md:text-6xl font-bold text-white bg-transparent drop-shadow-lg">
                    Fresh Meals, Delivered Daily
                </h1>
            </div>
        </>
    )
}