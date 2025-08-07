import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaEye, FaShare, FaFilter, FaSort, FaSearch, FaClock } from "react-icons/fa";
import { Star, Timer } from "lucide-react";
import { NavLink } from "react-router-dom";

const TodaysDealsPage = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [quickView, setQuickView] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("discount");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Mock data - Replace with API call
  const mockProducts = [
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

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Home Appliances", label: "Home Appliances" },
    { value: "Water & Kitchen", label: "Water & Kitchen" },
    { value: "Power & Electronics", label: "Power & Electronics" }
  ];

  // Sort options
  const sortOptions = [
    { value: "discount", label: "Highest Discount" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" }
  ];

  // Load data (replace with API call)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "discount":
        filtered.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount));
        break;
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price.replace("₹", "").replace(",", "")) - parseFloat(b.price.replace("₹", "").replace(",", "")));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price.replace("₹", "").replace(",", "")) - parseFloat(a.price.replace("₹", "").replace(",", "")));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Helper functions
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading today's deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Today's Deals
              </h1>
              <p className="text-gray-600 mt-1">Grab these amazing offers before they expire!</p>
            </div>
            <NavLink 
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300"
            >
              ← Back to Home
            </NavLink>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <FaFilter className="text-gray-600" />
              <span className="text-gray-700 font-medium">Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} deals
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Timer className="w-4 h-4" />
            <span>Limited Time Offers</span>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border border-gray-100 relative card-hover animate-fade-in flex flex-col cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Deal Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                    {product.discount} OFF
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickView(product.id);
                    }}
                    className="p-2 rounded-full bg-white text-gray-600 hover:text-red-600 hover:bg-red-50 shadow-md hover:scale-110 transition-all duration-300"
                    aria-label="Quick view"
                  >
                    <FaEye className="text-sm" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-white text-gray-600 hover:text-orange-600 hover:bg-orange-50 shadow-md hover:scale-110 transition-all duration-300"
                    aria-label="Share"
                  >
                    <FaShare className="text-sm" />
                  </button>
                </div>

                {/* Clickable Product Content */}
                <NavLink to={`/todays-deals/${product.id}`} className="flex flex-col flex-grow">
                  {/* Product Image */}
                  <div className="relative p-6 flex justify-center items-center h-64 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
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
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 flex-1 mr-2">
                        {product.name}
                      </h3>
                      <div className="text-right flex-shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            {product.price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {product.specs}
                    </p>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-red-600 text-sm font-medium">
                        <FaClock className="w-4 h-4" />
                        <span>{product.timeLeft}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg ${
                          hoveredCard === product.id
                            ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white transform scale-105'
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-red-50 hover:to-orange-50 hover:text-red-600'
                        } btn-animate`}
                      >
                        <FaShoppingCart className="text-sm" />
                        <span>View Details</span>
                        {hoveredCard === product.id && (
                          <span className="ml-2 transform translate-x-1 transition-transform duration-300">→</span>
                        )}
                      </button>
                    </div>
                  </div>
                </NavLink>

                {/* Hover Glow Effect */}
                {hoveredCard === product.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-orange-500/5 pointer-events-none rounded-2xl z-10"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Deals Found</h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
              Try adjusting your filters or check back soon for new deals!
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSortBy("discount");
              }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysDealsPage;
