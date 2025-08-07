import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaShare, FaTruck, FaShieldAlt, FaUndo, FaCheck, FaClock } from "react-icons/fa";
import { Star, ArrowLeft, Timer } from "lucide-react";
import { useParams, NavLink } from "react-router-dom";

const TodaysDealDetail = () => {
  const { id } = useParams();
  
  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // Mock data - Replace with API call
  const mockProducts = {
    1: {
      id: 1,
      name: "Samsung Refrigerator",
      price: "₹34,999",
      originalPrice: "₹42,999",
      discount: "18%",
      images: [
        "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80"
      ],
      specs: "20L Capacity, Frost Free",
      rating: 4.7,
      reviews: [
        {
          id: 1,
          user: "Rajesh K.",
          rating: 5,
          date: "2024-02-15",
          title: "Excellent refrigerator!",
          comment: "Great cooling and energy efficient. The build quality is excellent."
        },
        {
          id: 2,
          user: "Meera S.",
          rating: 4,
          date: "2024-02-14",
          title: "Good value for money",
          comment: "Works great but the ice maker is a bit noisy."
        }
      ],
      category: "Home Appliances",
      stock: 8,
      timeLeft: "23:45:10",
      description: "Experience superior cooling with this frost-free refrigerator. Perfect for medium to large families with advanced features and multiple compartments.",
      features: [
        "Frost Free Technology",
        "Digital Temperature Control",
        "Multiple Compartments",
        "Energy Efficient",
        "Smart Diagnosis",
        "Quick Cool",
        "Child Lock",
        "LED Display"
      ],
      specifications: {
        "Brand": "Samsung",
        "Model": "RT42K5468SL",
        "Capacity": "415 Litres",
        "Type": "Frost Free",
        "Star Rating": "5 Star",
        "Warranty": "1 Year Comprehensive",
        "Color": "Silver",
        "Power": "160 Watts"
      },
      relatedDeals: [
        {
          id: 2,
          name: "Aquaguard Water Purifier",
          price: "₹12,999",
          originalPrice: "₹15,999",
          discount: "18%",
          image: "https://images.unsplash.com/photo-1603775020644-eb8debd59791?auto=format&fit=crop&w=400&q=80",
          category: "Water & Kitchen",
          timeLeft: "23:45:10"
        },
        {
          id: 3,
          name: "Luminous Inverter",
          price: "₹24,999",
          originalPrice: "₹29,999",
          discount: "16%",
          image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=400&q=80",
          category: "Power & Electronics",
          timeLeft: "23:45:10"
        }
      ]
    }
  };

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const productData = mockProducts[id];
        if (productData) {
          setProduct(productData);
          setError(null);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Helper functions
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

  const calculateSavings = () => {
    if (!product) return "0";
    const original = parseFloat(product.originalPrice.replace("₹", "").replace(",", ""));
    const current = parseFloat(product.price.replace("₹", "").replace(",", ""));
    return (original - current).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading deal details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "This deal may have expired."}</p>
          <NavLink 
            to="/todays-deals"
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300"
          >
            Browse Today's Deals
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <NavLink 
              to="/todays-deals"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Today's Deals</span>
            </NavLink>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
                <FaShare className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 transition-colors duration-200 ${
                  isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}
              >
                <FaHeart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {/* Deal Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                  {product.discount} OFF
                </div>
              </div>
              {/* Timer */}
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-md text-red-600 px-4 py-2 rounded-full text-sm font-bold shadow-xl border border-red-200 flex items-center space-x-2">
                  <Timer className="w-4 h-4" />
                  <span>{product.timeLeft}</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-red-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-600">({product.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <FaClock className="w-4 h-4" />
                  <span>Ends in {product.timeLeft}</span>
                </div>
              </div>
            </div>

            {/* Price and Discount */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  {product.price}
                </span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                <span className="text-lg font-semibold text-red-600">
                  Save ₹{calculateSavings()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-semibold text-sm bg-red-50 px-3 py-1 rounded-full">
                  {product.discount} OFF
                </span>
                <span className="text-sm text-gray-500">Limited time offer</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaCheck className="w-4 h-4 text-red-500" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Only {product.stock} items left!
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <FaShoppingCart className="w-5 h-5" />
                <span>Add to Cart - {product.price}</span>
              </button>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaTruck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaShieldAlt className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaUndo className="w-4 h-4" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 font-medium">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {showReviews ? 'Show Less' : 'Show All Reviews'}
            </button>
          </div>
          
          <div className="space-y-6">
            {product.reviews.slice(0, showReviews ? product.reviews.length : 2).map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.user}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Deals */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Hot Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedDeals.map((relatedDeal) => (
              <div key={relatedDeal.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={relatedDeal.image}
                    alt={relatedDeal.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {relatedDeal.discount} OFF
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/90 backdrop-blur-md text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <FaClock className="w-3 h-3" />
                      <span>{relatedDeal.timeLeft}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedDeal.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-red-600">{relatedDeal.price}</span>
                      <span className="text-sm text-gray-500 line-through">{relatedDeal.originalPrice}</span>
                    </div>
                    <NavLink
                      to={`/todays-deals/${relatedDeal.id}`}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      View Deal →
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysDealDetail;
