import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaRegStar } from "react-icons/fa";

const FeaturedProducts = ({ products }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };
  return (
    <section className="py-12 px-4 bg-[#E2D4C0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Handpicked products with great value and quality</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-gray-100 relative"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
                    favorites.has(product.id)
                      ? 'bg-red-50 text-red-500'
                      : 'bg-white text-gray-400 hover:text-red-500'
                  } shadow-md`}
                  aria-label="Add to favorites"
                >
                  <FaHeart className="text-lg" />
                </button>
                {/* Product Image */}
                <div className="p-6 flex justify-center items-center h-56 bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110"
                  />
                </div>
                {/* Product Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{product.name}</h3>
                    <span className="text-lg font-bold text-blue-600 ml-2">{product.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.specs}</p>
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(product.rating || 4) ? 
                          <FaStar key={i} className="text-sm" /> : 
                          <FaRegStar key={i} className="text-sm" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews || 42})</span>
                  </div>
                  {/* Add to Cart Button */}
                  <button
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      hoveredCard === product.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
                {/* Hover Overlay */}
                {hoveredCard === product.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Featured Products Available</h3>
              <p className="text-gray-600 max-w-md mx-auto">Check back later for our best picks and exclusive offers</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
