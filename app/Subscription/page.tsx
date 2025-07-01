import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SubsForm from "../components/SubsForm";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Subscriptions () {
    return (
        <>
            <ProtectedRoute>
                <div className="fixed top-0 left-0 right-0 z-50">
                    <Navbar />
                </div>
                <div className="relative items-center justify-center">
                    <SubsForm /> 
                </div>
                <div>
                    <Footer />
                </div>
            </ProtectedRoute>
        </>
    )
}