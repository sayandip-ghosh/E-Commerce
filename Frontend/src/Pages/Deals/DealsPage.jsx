import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaEye, FaShare, FaFilter, FaSort, FaSearch } from "react-icons/fa";
import { Clock, Zap, TrendingUp, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

const DealsPage = () => {
  // State management
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [quickView, setQuickView] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiscount, setSelectedDiscount] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Mock data - Replace with API call
  const mockDeals = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$89.99",
      originalPrice: "$149.99",
      discount: "40%",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      specs: "Noise cancelling, 30-hour battery, premium sound quality",
      rating: 4.8,
      reviews: 1247,
      timeLeft: "2h 15m",
      category: "electronics",
      stock: 45,
      soldCount: 234,
      description: "Experience crystal clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium build quality.",
      features: ["Active Noise Cancellation", "30-hour Battery Life", "Premium Sound Quality", "Quick Charge", "Bluetooth 5.0"],
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400"
      ]
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$129.99",
      originalPrice: "$199.99",
      discount: "35%",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      specs: "Heart rate monitor, GPS, water resistant, 7-day battery",
      rating: 4.6,
      reviews: 892,
      timeLeft: "4h 30m",
      category: "electronics",
      stock: 23,
      soldCount: 156,
      description: "Track your fitness goals with our advanced smart watch. Monitor heart rate, track GPS routes, and stay connected with notifications.",
      features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery", "Sleep Tracking"],
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400"
      ]
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: "$24.99",
      originalPrice: "$39.99",
      discount: "37%",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      specs: "100% organic cotton, breathable, multiple colors",
      rating: 4.4,
      reviews: 567,
      timeLeft: "1h 45m",
      category: "clothing",
      stock: 89,
      soldCount: 312,
      description: "Comfortable and sustainable clothing made from 100% organic cotton. Available in multiple colors and sizes.",
      features: ["100% Organic Cotton", "Breathable Fabric", "Multiple Colors", "Sustainable", "Comfortable Fit"],
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400"
      ]
    },
    {
      id: 4,
      name: "Kitchen Blender Pro",
      price: "$79.99",
      originalPrice: "$129.99",
      discount: "38%",
      image: "https://images.unsplash.com/photo-1570222094114-d054a8173ddb?w=400",
      specs: "1000W motor, 6-speed settings, stainless steel blades",
      rating: 4.7,
      reviews: 743,
      timeLeft: "6h 20m",
      category: "home",
      stock: 34,
      soldCount: 189,
      description: "Professional-grade blender with powerful 1000W motor and stainless steel blades. Perfect for smoothies, soups, and more.",
      features: ["1000W Motor", "6-speed Settings", "Stainless Steel Blades", "Large Capacity", "Easy Clean"],
      images: [
        "https://images.unsplash.com/photo-1570222094114-d054a8173ddb?w=400",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
      ]
    }
  ];

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "books", label: "Books & Media" }
  ];

  // Discount ranges
  const discountRanges = [
    { value: "all", label: "All Discounts" },
    { value: "10-20", label: "10% - 20%" },
    { value: "21-30", label: "21% - 30%" },
    { value: "31-40", label: "31% - 40%" },
    { value: "41+", label: "41% +" }
  ];

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "discount", label: "Highest Discount" },
    { value: "rating", label: "Highest Rated" },
    { value: "time-left", label: "Ending Soon" }
  ];

  // Load data (replace with API call)
  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDeals(mockDeals);
        setFilteredDeals(mockDeals);
        setError(null);
      } catch (err) {
        setError("Failed to load deals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  // Filter and sort deals
  useEffect(() => {
    let filtered = [...deals];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(deal =>
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.specs.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(deal => deal.category === selectedCategory);
    }

    // Discount filter
    if (selectedDiscount !== "all") {
      filtered = filtered.filter(deal => {
        const discountPercent = parseInt(deal.discount);
        if (selectedDiscount === "10-20") return discountPercent >= 10 && discountPercent <= 20;
        if (selectedDiscount === "21-30") return discountPercent >= 21 && discountPercent <= 30;
        if (selectedDiscount === "31-40") return discountPercent >= 31 && discountPercent <= 40;
        if (selectedDiscount === "41+") return discountPercent >= 41;
        return true;
      });
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
        break;
      case "discount":
        filtered.sort((a, b) => parseInt(b.discount) - parseInt(a.discount));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "time-left":
        // Sort by time left (simplified)
        filtered.sort((a, b) => a.timeLeft.localeCompare(b.timeLeft));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredDeals(filtered);
    setCurrentPage(1);
  }, [deals, searchTerm, selectedCategory, selectedDiscount, sortBy]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeals = filteredDeals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);

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

  const formatTimeLeft = (timeLeft) => {
    return timeLeft;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing deals...</p>
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
              <p className="text-gray-600 mt-1">Limited time offers you don't want to miss!</p>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                {/* Discount Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Range</label>
                  <select
                    value={selectedDiscount}
                    onChange={(e) => setSelectedDiscount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {discountRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
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
            Showing {filteredDeals.length} of {deals.length} deals
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Deals ending soon!</span>
          </div>
        </div>

        {/* Deals Grid */}
        {currentDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentDeals.map((deal, index) => (
              <div
                key={deal.id}
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border border-gray-100 relative card-hover animate-fade-in flex flex-col cursor-pointer`}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(deal.id);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickView(deal.id);
                    }}
                    className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-md hover:scale-110 transition-all duration-300"
                    aria-label="Quick view"
                  >
                    <FaEye className="text-sm" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-white text-gray-600 hover:text-green-600 hover:bg-green-50 shadow-md hover:scale-110 transition-all duration-300"
                    aria-label="Share"
                  >
                    <FaShare className="text-sm" />
                  </button>
                </div>

                {/* Clickable Product Content */}
                <NavLink to={`/deals/${deal.id}`} className="flex flex-col flex-grow">
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
                          {renderStars(deal.rating)}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                          ({deal.reviews})
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
                      <span>Time left: {formatTimeLeft(deal.timeLeft)}</span>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>In Stock ({deal.stock})</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Limited Time</span>
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg ${
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
                  </div>
                </NavLink>

                {/* Hover Glow Effect */}
                {hoveredCard === deal.id && (
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
              Try adjusting your filters or search terms to find amazing deals!
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedDiscount("all");
                setSortBy("featured");
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

export default DealsPage; 