import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import TodaysDeal from '../Pages/LandingPage/TodaysDeal';
import BestSeller from '../Pages/LandingPage/BestSeller';
import FeaturedProducts from '../Pages/LandingPage/FeaturedProducts';
import NewArrival from '../Pages/LandingPage/NewArrival';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      name: "Samsung Galaxy S23",
      price: "₹79,999",
      originalPrice: "₹94,999",
      discount: "15%",
      image: "https://via.placeholder.com/200",
      specs: "Snapdragon 8 Gen 2, 8GB RAM",
      timeLeft: "23:45:10"
    },
    {
      id: 2,
      name: "OnePlus Buds Pro 2",
      price: "₹8,999",
      originalPrice: "₹11,999",
      discount: "25%",
      image: "https://via.placeholder.com/200",
      specs: "Active Noise Cancellation",
      timeLeft: "23:45:10"
    },
    {
      id: 3,
      name: "Asus TUF Gaming Monitor",
      price: "₹19,999",
      originalPrice: "₹24,999",
      discount: "20%",
      image: "https://via.placeholder.com/200",
      specs: "27\" 165Hz 2K QHD",
      timeLeft: "23:45:10"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: "₹119,999",
      image: "https://via.placeholder.com/200",
      specs: "A16 Bionic, 6.1\" OLED"
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: "₹114,999",
      image: "https://via.placeholder.com/200",
      specs: "8GB RAM, 256GB SSD"
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      price: "₹24,999",
      image: "https://via.placeholder.com/200",
      specs: "Noise Cancelling"
    },
    {
      id: 4,
      name: "PS5 Digital Edition",
      price: "₹44,999",
      image: "https://via.placeholder.com/200",
      specs: "825GB SSD, 4K@120Hz"
    }
  ];

  const bestSellers = [
    {
      id: 1,
      name: "Apple AirPods Pro 2",
      price: "₹24,999",
      image: "https://via.placeholder.com/200",
      specs: "Active Noise Cancellation",
      soldCount: "5.2k+ sold"
    },
    {
      id: 2,
      name: "Dell XPS 13",
      price: "₹129,999",
      image: "https://via.placeholder.com/200",
      specs: "Intel i7, 16GB RAM",
      soldCount: "3.8k+ sold"
    },
    {
      id: 3,
      name: "Xbox Series X",
      price: "₹49,999",
      image: "https://via.placeholder.com/200",
      specs: "1TB SSD, 4K Gaming",
      soldCount: "4.5k+ sold"
    },
    {
      id: 4,
      name: "Samsung 55\" QLED TV",
      price: "₹89,999",
      image: "https://via.placeholder.com/200",
      specs: "4K, HDR, Smart TV",
      soldCount: "2.9k+ sold"
    }
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Nothing Phone (2)",
      price: "₹44,999",
      image: "https://via.placeholder.com/200",
      specs: "Snapdragon 8+ Gen 1",
      isNew: true
    },
    {
      id: 2,
      name: "Apple Watch Ultra",
      price: "₹89,999",
      image: "https://via.placeholder.com/200",
      specs: "GPS + Cellular",
      isNew: true
    },
    {
      id: 3,
      name: "Sony A7 IV",
      price: "₹219,999",
      image: "https://via.placeholder.com/200",
      specs: "33MP Full-Frame",
      isNew: true
    }
  ];

  function OfferCarousel() {
    const slides = [
      {
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
        title: "Explore the Latest Gadgets",
        desc: "Find top deals on new arrivals and best sellers."
      },
      {
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        title: "Upgrade Your Lifestyle",
        desc: "Premium electronics for your home and office."
      }
    ];
    const [current, setCurrent] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
      return () => clearInterval(id);
    }, [slides.length]);
    return (
      <div className="relative w-screen h-[60vh] overflow-hidden border-b-2 border-gray-300">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center transition-opacity duration-1000 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ zIndex: 0, filter: 'sepia(30%)' }}
            />
            <div className="relative z-10 flex flex-col justify-center items-center w-full h-full bg-black/30">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-wider">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-8 text-white/90 font-serif">{slide.desc}</p>
              <button className="px-6 py-2 bg-white text-gray-800 font-medium border-2 border-white hover:bg-transparent hover:text-white transition-all">
                Shop Now
              </button>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-white/40'} transition-all`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] font-sans">
      {/* Header */}
      <header className="bg-[#2a2118] text-[#e8d9c5] border-b border-[#4a3c2a]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold tracking-wider font-serif">TechKart</h1>
              
              {/* Desktop Navigation with dropdowns */}
              <nav className="hidden md:flex space-x-6 relative z-20">
                {categories.map((category) => (
                  <div key={category.name} className="group relative">
                    <button className="hover:text-white transition-colors font-medium px-2 py-1 focus:outline-none tracking-wide">
                      {category.name}
                    </button>
                    <div className="absolute left-0 mt-2 min-w-[180px] bg-[#f5f1e8] text-[#2a2118] rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 py-2 border border-[#d4c9b8]">
                      {category.subitems.map((sub, i) => (
                        <a
                          key={sub + i}
                          href="#"
                          className="block px-4 py-2 hover:bg-[#e8d9c5] text-sm whitespace-nowrap"
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
                  placeholder="Search for electronics, brands and more"
                  className="w-full px-4 py-2 rounded-sm text-[#2a2118] focus:outline-none border border-[#d4c9b8] bg-[#f5f1e8] placeholder-[#7a6e5d]"
                />
                <Search className="absolute right-3 top-2.5 text-[#7a6e5d]" size={20} />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-6">
              <NavLink to="/login" className="hidden md:flex items-center space-x-1 hover:text-white">
                <User size={20} />
                <span>Login</span>
              </NavLink>
              <NavLink to="/admin/dashboard" className="hidden md:flex items-center space-x-1 hover:text-white font-medium border border-[#7a6e5d] rounded-sm px-3 py-1 transition-colors hover:border-white">
                <span>Admin</span>
              </NavLink>
              <NavLink to="/cart" className="flex items-center space-x-1 hover:text-white">
                <ShoppingCart size={20} />
                <span className="hidden md:inline">Cart</span>
              </NavLink>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-2 bg-[#3a2e22] border-t border-[#4a3c2a]">
            <input
              type="text"
              placeholder="Search products"
              className="w-full px-4 py-2 mb-2 rounded-sm text-[#2a2118] bg-[#f5f1e8] border border-[#d4c9b8]"
            />
            {categories.map((category) => (
              <div key={category.name} className="border-b border-[#4a3c2a] last:border-0">
                <a
                  href="#"
                  className="block py-3 hover:text-white transition-colors"
                >
                  {category.name}
                </a>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Carousel Section */}
      <section className="w-screen bg-[#f5f1e8]">
        <OfferCarousel />
      </section>

      {/* Today's Deals */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2a2118] mb-4 pb-2 border-b border-[#d4c9b8] font-serif">Today's Deals</h2>
          <TodaysDeal deals={todaysDeals} />
        </div>

        {/* Best Sellers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2a2118] mb-4 pb-2 border-b border-[#d4c9b8] font-serif">Best Sellers</h2>
          <BestSeller products={bestSellers} />
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2a2118] mb-4 pb-2 border-b border-[#d4c9b8] font-serif">Featured Products</h2>
          <FeaturedProducts products={featuredProducts} />
        </div>

        {/* New Arrivals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2a2118] mb-4 pb-2 border-b border-[#d4c9b8] font-serif">New Arrivals</h2>
          <NewArrival products={newArrivals} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2a2118] text-[#e8d9c5] py-8 border-t border-[#4a3c2a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-serif">TechKart</h3>
              <p className="text-sm">Your trusted source for quality electronics since 1995.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a href="#" className="hover:text-white transition-colors">{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Stay Connected</h4>
              <p className="text-sm mb-4">Subscribe for updates and special offers</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-[#f5f1e8] text-[#2a2118] flex-grow border border-[#d4c9b8]"
                />
                <button className="bg-[#7a6e5d] text-white px-4 py-2 hover:bg-[#6a5e4d] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#4a3c2a] mt-8 pt-6 text-sm text-center">
            <p>© 2023 TechKart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage