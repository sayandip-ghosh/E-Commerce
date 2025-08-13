import React from 'react';

const Footer = ({ categories }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif bg-gradient-to-r from-[#deae47] to-blue-400 bg-clip-text text-transparent">
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
  );
};

export default Footer;
