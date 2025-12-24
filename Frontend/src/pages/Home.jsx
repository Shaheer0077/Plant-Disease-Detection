import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="min-h-screen selection:bg-brand-primary selection:text-white">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <StatsSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
