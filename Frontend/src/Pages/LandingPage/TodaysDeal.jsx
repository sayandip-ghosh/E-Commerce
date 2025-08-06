import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaEye, FaShare } from "react-icons/fa";
import { Clock, Zap } from "lucide-react";

const TodaysDeal = ({ deals }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [quickView, setQuickView] = useState(null);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-400 to-orange-500 rounded-full shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Today's Deals
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't miss these limited-time offers and exclusive discounts! Grab these amazing deals before they're gone.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {deals && deals.length > 0 ? (
            deals.map((deal, index) => (
              <div
                key={deal.id}
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border border-gray-100 relative card-hover animate-fade-in flex flex-col`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(deal.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Deal Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                    {deal.discount} OFF
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => toggleFavorite(deal.id)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      favorites.has(deal.id)
                        ? 'bg-red-500 text-white shadow-lg scale-110'
                        : 'bg-white text-gray-600 hover:text-red-500 hover:bg-red-50'
                    } shadow-md hover:scale-110`}
                    aria-label="Add to favorites"
                  >
                    <FaHeart className="text-sm" />
                  </button>
                  <button
                    onClick={() => setQuickView(deal.id)}
                    className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-md hover:scale-110 transition-all duration-300"
                    aria-label="Quick view"
                  >
                    <FaEye className="text-sm" />
                  </button>
                  <button
                    className="p-2 rounded-full bg-white text-gray-600 hover:text-green-600 hover:bg-green-50 shadow-md hover:scale-110 transition-all duration-300"
                    aria-label="Share"
                  >
                    <FaShare className="text-sm" />
                  </button>
                </div>

                {/* Product Image */}
                <div className="relative p-6 flex justify-center items-center h-64 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110 img-hover relative z-5"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15"></div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 flex-1 mr-2">
                      {deal.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                        {deal.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {deal.specs}
                  </p>

                  {/* Price/Discount */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-500 line-through text-sm font-medium">{deal.originalPrice}</span>
                    <span className="text-red-600 font-semibold text-sm bg-red-50 px-2 py-1 rounded-full">
                      {deal.discount} OFF
                    </span>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {renderStars(deal.rating || 4.5)}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        ({deal.reviews || 42})
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-red-600 text-sm font-medium">
                      <Zap className="w-4 h-4" />
                      <span>Hot Deal</span>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center justify-center space-x-2 text-red-600 text-sm font-semibold bg-red-50 px-3 py-2 rounded-lg mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Time left: {deal.timeLeft}</span>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>In Stock</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Limited Time</span>
                    </span>
                  </div>

                  {/* Add to Cart Button - Fixed height */}
                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg mt-auto ${
                      hoveredCard === deal.id
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white transform scale-105'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-red-50 hover:to-orange-50 hover:text-red-600'
                    } btn-animate`}
                  >
                    <FaShoppingCart className="text-sm" />
                    <span>Add to Cart</span>
                    {hoveredCard === deal.id && (
                      <span className="ml-2 transform translate-x-1 transition-transform duration-300">→</span>
                    )}
                  </button>
                </div>

                {/* Hover Glow Effect */}
                {hoveredCard === deal.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-orange-500/5 pointer-events-none rounded-2xl z-10"></div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 animate-fade-in">
              <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Deals Available</h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                We're currently updating our deals collection. Check back soon for amazing offers and exclusive discounts!
              </p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Browse All Products
              </button>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in">
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <span>View All Deals</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodaysDeal;
