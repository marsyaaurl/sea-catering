import { Krona_One } from 'next/font/google';
import Image from 'next/image';
import foodLandingPage from '../../public/assets/foodLandingPage.png';
import Link from 'next/link';
import { MoveRight, Beef, Truck, Waypoints } from 'lucide-react';
import ContactPhoto from '../../public/assets/ContactPhoto.png';

const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function LandingPage() {
    return (
        <>
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row md:gap-x-32 pt-32 pb-36 px-10 gap-y-10 items-center justify-center">
                <div className="flex flex-col gap-y-3 mdgap-y-2 md:w-1/2">
                    <h1 className={`${kronaOne.className} text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 text-4xl`}>
                        SEA Catering
                    </h1>
                    <h1 className='text-3xl font-bold text-orange-400 bg-transparent'>Healthy Meals, Anytime, Anywhere</h1>
                    <p className='text-justify'>SEA Catering offers healthy meals that can be customized to suit your needs, with delivery available to various cities across Indonesia. What began as a small business has now gone viral, becoming a nationwide solution for healthy eating.</p>
                    <Link href="/">
                        <button className='flex flex-row bg-orange-400 rounded-lg text-md text-white font-semibold px-3 py-1 hover:bg-orange-200 hover:text-orange-400'>Start Now <MoveRight className='ml-2 bg-transparent'/></button>
                    </Link>
                </div>
                
                <div className='bg-orange-400 rounded-full p-4 hover:scale-105'>
                    <Image src={foodLandingPage} alt="Food Landing Page" className="bg-transparent w-72" />
                </div>
            </div>
            
            {/* Services */}
            <div className='flex flex-col items-center justify-center text-center px-10 md:px-20 py-10 md:py-24 gap-y-10 bg-orange-400'>
                <h1 className='font-bold text-2xl text-white bg-transparent'>Our Services</h1>

                <div className='flex flex-col md:flex-row md:gap-x-5 gap-y-5 bg-transparent'>
                    <div className='flex flex-col bg-white rounded-lg items-center justify-center shadow-md gap-y-2 px-5 py-7 md:w-1/3 hover:scale-105'>
                        <div className='bg-orange-200 p-3 rounded-full'>
                            <Beef className='w-12 h-12 text-white bg-transparent' />
                        </div>
                        <h2 className='font-semibold text-lg bg-transparent'>Meal Customization</h2>
                        <p className='bg-transparent'>Personalize your meals to fit your lifestyle, taste preferences, or specific dietary goals. Whether you're counting calories, avoiding certain ingredients, or just want something you love, we've got you covered.</p>
                    </div>

                    <div className='flex flex-col bg-white rounded-lg items-center justify-center shadow-md gap-y-2 px-5 py-7 md:w-1/3 hover:scale-105'>
                        <div className='bg-orange-200 p-3 rounded-full'>
                            <Truck className='w-12 h-12 text-white bg-transparent' />
                        </div>
                        <h2 className='font-semibold text-lg bg-transparent'>Delivery to Major Cities</h2>
                        <p className='bg-transparent'>We deliver right to your doorstep across major cities in Indonesia, so you can enjoy fresh, healthy meals no matter where you are—even in remote corners of the archipelago.</p>
                    </div>

                    <div className='flex flex-col bg-white rounded-lg items-center justify-center shadow-md gap-y-2 px-5 py-7 md:w-1/3 hover:scale-105'>
                        <div className='bg-orange-200 p-3 rounded-full'>
                            <Waypoints className='w-12 h-12 text-white bg-transparent' />
                        </div>
                        <h2 className='font-semibold text-lg bg-transparent'>Detailed Nutritional Info</h2>
                        <p className='bg-transparent'>Every dish comes with clear, comprehensive nutritional information to help you make informed choices and stay on track with your health and wellness journey.</p>
                    </div>
                </div>
            </div>
            
            {/* Contact Us */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 px-10 py-14">
                <div className="w-full flex justify-center">
                    <Image
                    src={ContactPhoto}
                    alt="Food Delivery"
                    className="rounded-lg w-64 md:w-96 object-cover"
                    />
                </div>

                <div className="w-full flex flex-col gap-y-1 text-center md:text-left">
                    <h1 className="font-bold text-2xl text-[#323232]">Contact Us</h1>
                    <p className="text-[#323232] text-sm font-light">Got questions or special requests? We’re here to help with anything you need, from orders to subscriptions!</p>
                    <h2 className="text-[#323232] text-md font-semibold">Manager: Brian</h2>
                    <h2 className="text-[#323232] text-md font-semibold">Phone Number: 08123456789</h2>
                </div>
            </div>

        </>
    )
}