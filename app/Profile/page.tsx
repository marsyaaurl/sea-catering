import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import LogoutButton from "../components/LogoutButton";
import SubsHeader from "../components/SubsHeader";

export default function Profile() {
    return(
        <>
            <ProtectedRoute>
                <div>
                    <Navbar />
                </div>
                <div>
                    <SubsHeader />
                </div>
                <div>
                    <LogoutButton />
                </div>
                <div>
                    <Footer />
                </div>
            </ProtectedRoute>
        </>
    )
}