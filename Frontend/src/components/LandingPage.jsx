import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Star, Clock, TrendingUp, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TodaysDeal from '../Pages/LandingPage/TodaysDeal';
import BestSeller from '../Pages/LandingPage/BestSeller';
import FeaturedProducts from '../Pages/LandingPage/FeaturedProducts';
import NewArrival from '../Pages/LandingPage/NewArrival';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

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
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
      specs: "Snapdragon 8 Gen 2, 8GB RAM",
      timeLeft: "23:45:10",
      rating: 4.8,
      reviews: 1247
    },
    {
      id: 2,
      name: "OnePlus Buds Pro 2",
      price: "₹8,999",
      originalPrice: "₹11,999",
      discount: "25%",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      specs: "Active Noise Cancellation",
      timeLeft: "23:45:10",
      rating: 4.6,
      reviews: 892
    },
    {
      id: 3,
      name: "Asus TUF Gaming Monitor",
      price: "₹19,999",
      originalPrice: "₹24,999",
      discount: "20%",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
      specs: "27\" 165Hz 2K QHD",
      timeLeft: "23:45:10",
      rating: 4.7,
      reviews: 567
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: "₹119,999",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
      specs: "A16 Bionic, 6.1\" OLED",
      rating: 4.9,
      reviews: 2156
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: "₹114,999",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      specs: "8GB RAM, 256GB SSD",
      rating: 4.8,
      reviews: 1893
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      price: "₹24,999",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      specs: "Noise Cancelling",
      rating: 4.7,
      reviews: 1342
    },
    {
      id: 4,
      name: "PS5 Digital Edition",
      price: "₹44,999",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80",
      specs: "825GB SSD, 4K@120Hz",
      rating: 4.9,
      reviews: 2789
    }
  ];

  const bestSellers = [
    {
      id: 1,
      name: "Apple AirPods Pro 2",
      price: "₹24,999",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=400&q=80",
      specs: "Active Noise Cancellation",
      soldCount: "5.2k+ sold",
      rating: 4.8,
      reviews: 3421
    },
    {
      id: 2,
      name: "Dell XPS 13",
      price: "₹129,999",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80",
      specs: "Intel i7, 16GB RAM",
      soldCount: "3.8k+ sold",
      rating: 4.7,
      reviews: 2156
    },
    {
      id: 3,
      name: "Xbox Series X",
      price: "₹49,999",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=400&q=80",
      specs: "1TB SSD, 4K Gaming",
      soldCount: "4.5k+ sold",
      rating: 4.9,
      reviews: 1892
    },
    {
      id: 4,
      name: "Samsung 55\" QLED TV",
      price: "₹89,999",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb95f4b8be?auto=format&fit=crop&w=400&q=80",
      specs: "4K, HDR, Smart TV",
      soldCount: "2.9k+ sold",
      rating: 4.6,
      reviews: 1567
    }
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Nothing Phone (2)",
      price: "₹44,999",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
      specs: "Snapdragon 8+ Gen 1",
      isNew: true,
      rating: 4.5,
      reviews: 234
    },
    {
      id: 2,
      name: "Apple Watch Ultra",
      price: "₹89,999",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80",
      specs: "GPS + Cellular",
      isNew: true,
      rating: 4.8,
      reviews: 567
    },
    {
      id: 3,
      name: "Sony A7 IV",
      price: "₹219,999",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
      specs: "33MP Full-Frame",
      isNew: true,
      rating: 4.9,
      reviews: 123
    }
  ];

  function OfferCarousel() {
    const slides = [
      {
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
        title: "Explore the Latest Gadgets",
        desc: "Find top deals on new arrivals and best sellers.",
        cta: "Shop Now",
        gradient: "from-blue-600/20 to-purple-600/20"
      },
      {
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        title: "Upgrade Your Lifestyle",
        desc: "Premium electronics for your home and office.",
        cta: "Discover More",
        gradient: "from-orange-600/20 to-red-600/20"
      },
      {
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
        title: "Gaming & Entertainment",
        desc: "Next-gen gaming consoles and accessories.",
        cta: "Game On",
        gradient: "from-green-600/20 to-blue-600/20"
      }
    ];
    const [current, setCurrent] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
      return () => clearInterval(id);
    }, [slides.length]);
    return (
      <div className="relative w-full h-[70vh] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center transition-all duration-1000 ${
              idx === current ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
            }`}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ zIndex: 0 }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} style={{ zIndex: 1 }}></div>
            <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-wider drop-shadow-2xl animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-white/95 font-light leading-relaxed drop-shadow-lg">
                  {slide.desc}
                </p>
                <button className="group px-8 py-4 bg-white text-gray-900 font-semibold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border-2 border-white">
                  {slide.cta}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
          <button
            onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
          <button
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

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
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className="hidden md:flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <User size={20} />
                    <span className="font-medium">{user?.name || 'Profile'}</span>
                  </NavLink>
                  {user?.role === 'admin' && (
                    <NavLink to="/admin/dashboard" className="hidden md:flex items-center space-x-2 hover:text-blue-600 font-medium border-2 border-gray-300 rounded-full px-4 py-2 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50">
                      <span>Admin</span>
                    </NavLink>
                  )}
                  <button 
                    onClick={logout}
                    className="hidden md:flex items-center space-x-2 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <NavLink to="/profile" className="hidden md:flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <User size={20} />
                  <span className="font-medium">Login</span>
                </NavLink>
              )}
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
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className="flex items-center space-x-2 py-3 hover:text-blue-600 transition-colors">
                    <User size={20} />
                    <span className="font-medium">{user?.name || 'Profile'}</span>
                  </NavLink>
                  {user?.role === 'admin' && (
                    <NavLink to="/admin/dashboard" className="flex items-center space-x-2 py-3 hover:text-blue-600 transition-colors">
                      <span className="font-medium">Admin Panel</span>
                    </NavLink>
                  )}
                  <button 
                    onClick={logout}
                    className="flex items-center space-x-2 py-3 hover:text-red-600 transition-colors w-full text-left"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <NavLink to="/profile" className="flex items-center space-x-2 py-3 hover:text-blue-600 transition-colors">
                  <User size={20} />
                  <span className="font-medium">Login</span>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Carousel Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white">
        <OfferCarousel />
      </section>

      {/* Today's Deals */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          {/* <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-serif">Today's Deals</h2>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All →
            </a>
          </div> */}
          <TodaysDeal deals={todaysDeals} />
        </div>

        {/* Best Sellers */}
        <div className="mb-12">
          {/* <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-serif">Best Sellers</h2>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All →
            </a>
          </div> */}
          <BestSeller products={bestSellers} />
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          {/* <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-serif">Featured Products</h2>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All →
            </a>
          </div> */}
          <FeaturedProducts products={featuredProducts} />
        </div>

        {/* New Arrivals */}
        <div className="mb-12">
          {/* <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-serif">New Arrivals</h2>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All →
            </a>
          </div> */}
          <NewArrival products={newArrivals} />
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4 font-serif">Stay Updated</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-3 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:border-white transition-all duration-300"
            />
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

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
              <div className="flex space-x-4 mt-6">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.326 1.199-.334 1.363-.047.225-.145.271-.335.165-1.249-.581-2.03-2.407-2.03-3.874 0-2.837 2.064-5.451 5.947-5.451 3.131 0 5.561 2.231 5.561 5.214 0 3.133-1.976 5.667-4.717 5.667-.942 0-1.828-.489-2.128-1.066 0 0-.457 1.751-.544 2.194-.194.787-.587 1.574-.587 1.574 2.703 2.427 6.917 3.665 11.174 3.665 6.621 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
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
  )
}

export default LandingPage