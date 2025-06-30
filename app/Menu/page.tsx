import Navbar from "../components/Navbar";
import MealPlanHeader from "../components/MealPlanHeader";
import MealPlanCards from "../components/MealPlanCards";
import TestiForm from "../components/TestiForm";
import Footer from "../components/Footer";
import TestiCard from "../components/TestiCard";

export default async function Menu () {
    return (

        <>
            <div className="relative">
                <div className="fixed top-0 left-0 right-0 z-50">
                    <Navbar />
                </div>

                {/* Header */}
                <div className="relative mt-16">
                    <MealPlanHeader />
                </div>

                {/* Meal Plan Cards */}
                <div className="relative">
                    <MealPlanCards />
                </div>

                {/* Testimonials */}
                <div>
                    <TestiCard />
                </div>
                <div className="relative items-center justify-center">
                    <TestiForm /> 
                </div>

                <div>
                    <Footer />
                </div>
        </div>
        </>
    )
}