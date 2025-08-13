import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaEye, FaShare } from "react-icons/fa";
import { Star, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import productService from "../../../services/productService";

const FeaturedProducts = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [quickView, setQuickView] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getProducts();
        setProducts(response.data?.products || response.products || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
            <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Featured Products
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked products with exceptional quality and value. Each item is carefully selected to provide you with the best experience.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20 animate-fade-in">
              <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Featured Products...</h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                We're fetching the latest featured products for you.
              </p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-20 animate-fade-in">
              <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Error: {error}</h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                Failed to fetch featured products. Please try again later.
              </p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Retry
              </button>
            </div>
          ) : products && products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border border-gray-100 relative card-hover animate-fade-in flex flex-col`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Product Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                    Featured
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      favorites.has(product.id)
                        ? 'bg-red-500 text-white shadow-lg scale-110'
                        : 'bg-white text-gray-600 hover:text-red-500 hover:bg-red-50'
                    } shadow-md hover:scale-110`}
                    aria-label="Add to favorites"
                  >
                    <FaHeart className="text-sm" />
                  </button>
                  <button
                    onClick={() => setQuickView(product.id)}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110 img-hover relative z-5"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15"></div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 flex-1 mr-2">
                      {product.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.specs}
                  </p>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {renderStars(product.rating || 4.5)}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        ({product.reviews || 42})
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      <span>Premium</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>In Stock</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Free Shipping</span>
                    </span>
                  </div>

                  {/* View Details Button */}
                  <NavLink
                    to={`/featured/${product.id}`}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg mt-auto ${
                      hoveredCard === product.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white transform scale-105'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                    } btn-animate`}
                  >
                    <FaShoppingCart className="text-sm" />
                    <span>View Details</span>
                    {hoveredCard === product.id && (
                      <span className="ml-2 transform translate-x-1 transition-transform duration-300">→</span>
                    )}
                  </NavLink>
                </div>

                {/* Hover Glow Effect */}
                {hoveredCard === product.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-purple-500/5 pointer-events-none rounded-2xl z-10"></div>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Featured Products Available</h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                We're currently updating our featured products collection. Check back soon for amazing products and exclusive deals!
              </p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Browse All Products
              </button>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in">
          <NavLink 
            to="/featured"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>View All Featured Products</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
