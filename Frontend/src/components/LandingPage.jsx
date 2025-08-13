import React from "react";
import { TodaysDeal } from '../Pages/LandingPage/TodaysDeal';
import BestSeller from '../Pages/LandingPage/BestSellers/BestSeller';
import { FeaturedProducts } from '../Pages/LandingPage/FeaturedProducts';
import NewArrival from '../Pages/LandingPage/NewArrivals/NewArrival';
import HeroSection from './HeroSection';
import Footer from './Footer';

const LandingPage = () => {
  // Essential categories data for footer
  const categories = [
    { name: "Shop" },
    { name: "Electronics" },
    { name: "About" }
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section Component (includes Navbar) */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Today's Deals */}
        <div className="mb-12">
          <TodaysDeal />
        </div>

        {/* Best Sellers */}
        <div className="mb-12">
          <BestSeller />
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <FeaturedProducts />
        </div>

        {/* New Arrivals */}
        <div className="mb-12">
          <NewArrival />
        </div>
      </div>

      {/* Footer Component */}
      <Footer categories={categories} />
    </div>
  );
};

export default LandingPage;