import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Array of background images for the carousel
    const backgroundImages = [
        {
            url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            position: 'center right'
        },
        {
            url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            position: 'center left'
        },
        {
            url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80',
            position: 'center'
        },
        {
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
            position: 'center'
        },
        {
            url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
            position: 'center'
        }
    ];

    // Auto-advance carousel every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % backgroundImages.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    return (
        <>
            {/* Enhanced Transparent Navbar */}
            <nav className="absolute top-0 left-0 w-full z-50 bg-transparent px-8 py-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        {/* Left Side - Logo & Company Name */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-full shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white drop-shadow-lg">Sarkar Radio House</h1>
                                <p className="text-sm text-blue-200 font-medium">Electronics Excellence Since 1995</p>
                            </div>
                        </div>

                        {/* Center - Navigation Menu */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <div className="group relative">
                                <button className="text-white hover:text-blue-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                                    <span>Electronics</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 py-4 border border-gray-100">
                                    <div className="px-4 py-2 border-b border-gray-200 mb-3">
                                        <h3 className="font-semibold text-gray-800 text-lg">Audio & Video</h3>
                                    </div>
                                    <div className="px-4 space-y-2">
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">TV & Home Theater</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Speakers & Audio Systems</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Radio & Communication</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Gaming Consoles</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Smart Home Devices</a>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <button className="text-white hover:text-blue-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                                    <span>Appliances</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 py-4 border border-gray-100">
                                    <div className="px-4 py-2 border-b border-gray-200 mb-3">
                                        <h3 className="font-semibold text-gray-800 text-lg">Home & Kitchen</h3>
                                    </div>
                                    <div className="px-4 space-y-2">
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Refrigerators</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Washing Machines</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Microwave Ovens</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Air Conditioners</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Kitchen Appliances</a>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <button className="text-white hover:text-blue-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                                    <span>Services</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 py-4 border border-gray-100">
                                    <div className="px-4 py-2 border-b border-gray-200 mb-3">
                                        <h3 className="font-semibold text-gray-800 text-lg">Professional Services</h3>
                                    </div>
                                    <div className="px-4 space-y-2">
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Installation Services</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Repair & Maintenance</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Technical Support</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Warranty Service</a>
                                        <a href="#" className="block py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 text-sm font-medium transition-colors">Consultation</a>
                                    </div>
                                </div>
                            </div>

                            <NavLink to="/about" className="text-white hover:text-blue-200 font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                                About Us
                            </NavLink>
                        </div>

                        {/* Right Side - Actions */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            
                            <NavLink to="/cart" className="p-2 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-300 relative">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                            </NavLink>

                            <div className="flex items-center space-x-3">
                                <NavLink to="/profile" className="px-4 py-2 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                                    Login
                                </NavLink>
                                <NavLink to="/admin/auth/login" className="px-4 py-2 border-2 border-blue-300 text-blue-300 rounded-full font-semibold hover:bg-blue-300 hover:text-blue-800 transition-all duration-300">
                                    Admin
                                </NavLink>
                            </div>

                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-300"
                            >
                                {isMobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-white/20">
                            <div className="space-y-3">
                                <a href="#" className="block py-2 px-3 hover:bg-blue-50 rounded-lg transition-colors text-gray-800 font-medium">Electronics</a>
                                <a href="#" className="block py-2 px-3 hover:bg-blue-50 rounded-lg transition-colors text-gray-800 font-medium">Appliances</a>
                                <a href="#" className="block py-2 px-3 hover:bg-blue-50 rounded-lg transition-colors text-gray-800 font-medium">Services</a>
                                <a href="#" className="block py-2 px-3 hover:bg-blue-50 rounded-lg transition-colors text-gray-800 font-medium">About Us</a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Images Carousel */}
                <div className="absolute inset-0 z-0">
                    {backgroundImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                backgroundImage: `url('${image.url}')`,
                                backgroundPosition: image.position
                            }}
                        />
                    ))}
                </div>

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                {/* Content */}
                <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl">
                        Quality Electronics Made Simple
                    </h1>
                    <p className="text-xl lg:text-2xl text-white/95 leading-relaxed mb-8 drop-shadow-lg max-w-3xl mx-auto">
                        At Sarkar Radio House, we bring you the best in electronics, appliances, and professional services since 1995.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <NavLink
                            to="/featured"
                            className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center backdrop-blur-sm"
                        >
                            Shop Now
                        </NavLink>
                        <NavLink
                            to="/deals"
                            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-center backdrop-blur-sm"
                        >
                            View Deals
                        </NavLink>
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                    {backgroundImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default HeroSection;
