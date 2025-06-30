import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./LandingPage/page";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    </>
  );
}
