import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Star, Clock, TrendingUp, Sparkles } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { TodaysDeal } from '../Pages/LandingPage/TodaysDeal';
import BestSeller from '../Pages/LandingPage/BestSellers/BestSeller';
import { FeaturedProducts } from '../Pages/LandingPage/FeaturedProducts';
import NewArrival from '../Pages/LandingPage/NewArrivals/NewArrival';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  // Carousel slides data
  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
      title: "Premium Home Appliances",
      description: "Discover our latest collection of high-quality home appliances",
      buttonText: "Shop Now",
      buttonLink: "/featured"
    },
    {
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=80",
      title: "Smart Kitchen Solutions",
      description: "Transform your kitchen with our innovative appliances",
      buttonText: "Explore More",
      buttonLink: "/new-arrivals"
    },
    {
      image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1600&q=80",
      title: "Power & Electronics",
      description: "Stay powered with our reliable electronic solutions",
      buttonText: "View Deals",
      buttonLink: "/deals"
    }
  ];

  // Main categories and subitems for navbar
  const categories = [
    {
      name: "Home Appliances",
      subitems: [
        "Refrigerator",
        "Washing Machine",
        "Fan",
        "MicroOven",
        "AC",
        "LED (TV)",
        "Cooler",
        "Iron",
        "Hair dryer",
        "Kettle",
        "Induction"
      ]
    },
    {
      name: "Water & Kitchen",
      subitems: [
        "Aquagard",
        "Kettle",
        "Induction",
        "MicroOven"
      ]
    },
    {
      name: "Power & Electronics",
      subitems: [
        "DTH",
        "Inverter battery",
        "Inverter machine"
      ]
    }
  ];

  const todaysDeals = [
    {
      id: 1,
      name: "Samsung Refrigerator",
      price: "₹34,999",
      originalPrice: "₹42,999",
      discount: "18%",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80",
      specs: "20L Capacity, Frost Free",
      timeLeft: "23:45:10",
      rating: 4.7,
      reviews: 1247,
      category: "Home Appliances"
    },
    {
      id: 2,
      name: "Aquaguard Water Purifier",
      price: "₹12,999",
      originalPrice: "₹15,999",
      discount: "18%",
      image: "https://images.unsplash.com/photo-1603775020644-eb8debd59791?auto=format&fit=crop&w=400&q=80",
      specs: "RO+UV+UF, 8L Storage",
      timeLeft: "23:45:10",
      rating: 4.6,
      reviews: 892,
      category: "Water & Kitchen"
    },
    {
      id: 3,
      name: "Luminous Inverter",
      price: "₹24,999",
      originalPrice: "₹29,999",
      discount: "16%",
      image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=400&q=80",
      specs: "1100VA, Sine Wave",
      timeLeft: "23:45:10",
      rating: 4.5,
      reviews: 567,
      category: "Power & Electronics"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "LG Washing Machine",
      price: "₹28,999",
      image: "https://images.unsplash.com/photo-1626804475297-41608eaabe00?auto=format&fit=crop&w=400&q=80",
      specs: "7kg, Fully Automatic",
      rating: 4.8,
      reviews: 2156,
      category: "Home Appliances"
    },
    {
      id: 2,
      name: "Prestige Induction",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e1ef?auto=format&fit=crop&w=400&q=80",
      specs: "2000W, 7 Presets",
      rating: 4.6,
      reviews: 1893,
      category: "Water & Kitchen"
    },
    {
      id: 3,
      name: "Havells Fan",
      price: "₹3,199",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=400&q=80",
      specs: "1200mm, 3 Speed",
      rating: 4.5,
      reviews: 1342,
      category: "Home Appliances"
    }
  ];

  const bestSellers = [
    {
      id: 1,
      name: "Bajaj Mixer Grinder",
      price: "₹3,999",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400&q=80",
      specs: "750W, 3 Jars",
      soldCount: "8.2k+ sold",
      rating: 4.7,
      reviews: 3421,
      category: "Water & Kitchen"
    },
    {
      id: 2,
      name: "Voltas AC",
      price: "₹34,999",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=400&q=80",
      specs: "1.5 Ton, 3 Star",
      soldCount: "5.8k+ sold",
      rating: 4.6,
      reviews: 2156,
      category: "Home Appliances"
    },
    {
      id: 3,
      name: "Tata Sky DTH",
      price: "₹2,999",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80",
      specs: "HD Connection Kit",
      soldCount: "4.5k+ sold",
      rating: 4.4,
      reviews: 1892,
      category: "Power & Electronics"
    }
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Philips Air Fryer",
      price: "₹12,999",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
      specs: "4.1L, Digital Display",
      isNew: true,
      rating: 4.5,
      reviews: 234,
      category: "Water & Kitchen"
    },
    {
      id: 2,
      name: "Samsung MicroOven",
      price: "₹14,999",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80",
      specs: "28L, Convection",
      isNew: true,
      rating: 4.3,
      reviews: 567,
      category: "Water & Kitchen"
    },
    {
      id: 3,
      name: "V-Guard Inverter Battery",
      price: "₹18,999",
      image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=400&q=80",
      specs: "150Ah, Tall Tubular",
      isNew: true,
      rating: 4.6,
      reviews: 123,
      category: "Power & Electronics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md text-gray-800 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold tracking-wider font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechKart
              </h1>
              
              {/* Desktop Navigation with dropdowns */}
              <nav className="hidden lg:flex space-x-8 relative z-20">
                {categories.map((category) => (
                  <div key={category.name} className="group relative">
                    <button className="hover:text-blue-600 transition-colors font-medium px-3 py-2 focus:outline-none tracking-wide rounded-lg hover:bg-gray-50">
                      {category.name}
                    </button>
                    <div className="absolute left-0 mt-2 min-w-[200px] bg-white text-gray-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 py-3 border border-gray-200 backdrop-blur-md">
                      {category.subitems.map((sub, i) => (
                        <a
                          key={sub + i}
                          href="#"
                          className="block px-4 py-3 hover:bg-blue-50 text-sm whitespace-nowrap transition-colors rounded-lg mx-2"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for electronics, brands and more..."
                  className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder-gray-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
                />
                <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-6">
              <NavLink to="/profile" className="hidden md:flex items-center space-x-2 hover:text-blue-600 transition-colors">
                <User size={20} />
                <span className="font-medium">Login</span>
              </NavLink>
              <NavLink to="/cart" className="flex items-center space-x-2 hover:text-blue-600 transition-colors relative">
                <ShoppingCart size={20} />
                <span className="hidden md:inline font-medium">Cart</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </NavLink>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 py-4 bg-white border-t border-gray-200 shadow-lg">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 mb-4 rounded-full text-gray-800 bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
            {categories.map((category) => (
              <div key={category.name} className="border-b border-gray-200 last:border-0">
                <a
                  href="#"
                  className="block py-3 hover:text-blue-600 transition-colors font-medium"
                >
                  {category.name}
                </a>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <NavLink to="/profile" className="flex items-center space-x-2 py-3 hover:text-blue-600 transition-colors">
                <User size={20} />
                <span className="font-medium">Login</span>
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Hero Carousel */}
      <div className="embla overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" ref={emblaRef}>
        <div className="embla__container flex">
          {carouselSlides.map((slide, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative">
              <div className="relative h-[600px] w-full overflow-hidden">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Content */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in">
                      {slide.description}
                    </p>
                    <NavLink
                      to={slide.buttonLink}
                      className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in"
                    >
                      <span>{slide.buttonText}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Today's Deals */}
        <div className="mb-12">
          <TodaysDeal deals={todaysDeals} />
        </div>

        {/* Best Sellers */}
        <div className="mb-12">
          <BestSeller products={bestSellers} />
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <FeaturedProducts products={featuredProducts} />
        </div>

        {/* New Arrivals */}
        <div className="mb-12">
          <NewArrival products={newArrivals} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-serif bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TechKart
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your trusted source for quality electronics since 1995. We bring you the latest technology with exceptional service.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Categories</h4>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a href="#" className="hover:text-white transition-colors duration-300">{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Customer Service</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 TechKart. All rights reserved. | Made with ❤️ for tech enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;