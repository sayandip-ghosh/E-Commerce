import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaEye, FaShare, FaTruck, FaShieldAlt, FaUndo, FaCheck } from "react-icons/fa";
import { Clock, Zap, TrendingUp, Sparkles, ArrowLeft } from "lucide-react";
import { useParams, NavLink } from "react-router-dom";

const DealDetail = () => {
  const { id } = useParams();
  
  // State management
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // Mock data for different deals - Replace with API call
  const mockDeals = {
    1: {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$89.99",
      originalPrice: "$149.99",
      discount: "40%",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
      ],
      specs: "Noise cancelling, 30-hour battery, premium sound quality",
      rating: 4.8,
      reviews: 1247,
      timeLeft: "2h 15m",
      category: "electronics",
      stock: 45,
      soldCount: 234,
      description: "Experience crystal clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium build quality. Perfect for music lovers, professionals, and anyone who demands the best audio experience.",
      features: [
        "Active Noise Cancellation",
        "30-hour Battery Life", 
        "Premium Sound Quality",
        "Quick Charge",
        "Bluetooth 5.0",
        "Built-in Microphone",
        "Foldable Design",
        "Premium Materials"
      ],
      specifications: {
        "Brand": "AudioPro",
        "Model": "WH-2000XM5",
        "Connectivity": "Bluetooth 5.0",
        "Battery Life": "30 hours",
        "Charging Time": "3 hours",
        "Weight": "250g",
        "Warranty": "2 years"
      },
      colors: ["Black", "White", "Blue"],
      sizes: ["One Size"],
      reviews: [
        {
          id: 1,
          user: "John D.",
          rating: 5,
          date: "2024-01-15",
          title: "Amazing sound quality!",
          comment: "These headphones are incredible. The noise cancellation is top-notch and the battery life is impressive. Worth every penny!"
        },
        {
          id: 2,
          user: "Sarah M.",
          rating: 4,
          date: "2024-01-10",
          title: "Great headphones",
          comment: "Very comfortable and great sound. The only minor issue is the app could be better, but overall excellent product."
        },
        {
          id: 3,
          user: "Mike R.",
          rating: 5,
          date: "2024-01-08",
          title: "Best purchase ever!",
          comment: "I've tried many headphones and these are by far the best. The sound quality is unmatched and they're so comfortable for long listening sessions."
        }
      ],
      relatedDeals: [
        {
          id: 2,
          name: "Smart Fitness Watch",
          price: "$129.99",
          originalPrice: "$199.99",
          discount: "35%",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
          timeLeft: "4h 30m"
        },
        {
          id: 3,
          name: "Organic Cotton T-Shirt",
          price: "$24.99",
          originalPrice: "$39.99",
          discount: "37%",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
          timeLeft: "1h 45m"
        }
      ]
    },
    2: {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$129.99",
      originalPrice: "$199.99",
      discount: "35%",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600"
      ],
      specs: "Heart rate monitor, GPS, water resistant, 7-day battery",
      rating: 4.6,
      reviews: 892,
      timeLeft: "4h 30m",
      category: "electronics",
      stock: 23,
      soldCount: 156,
      description: "Track your fitness goals with our advanced smart watch. Monitor heart rate, track GPS routes, and stay connected with notifications. Perfect for athletes, fitness enthusiasts, and anyone looking to improve their health.",
      features: [
        "Heart Rate Monitor",
        "GPS Tracking",
        "Water Resistant",
        "7-day Battery",
        "Sleep Tracking",
        "Activity Tracking",
        "Smart Notifications",
        "Customizable Watch Faces"
      ],
      specifications: {
        "Brand": "FitTech",
        "Model": "Sport Pro X",
        "Display": "1.4\" AMOLED",
        "Battery Life": "7 days",
        "Water Resistance": "5ATM",
        "Weight": "45g",
        "Warranty": "1 year"
      },
      colors: ["Black", "Silver", "Rose Gold"],
      sizes: ["Small", "Medium", "Large"],
      reviews: [
        {
          id: 1,
          user: "Alex K.",
          rating: 5,
          date: "2024-01-12",
          title: "Excellent fitness tracker!",
          comment: "This watch has transformed my fitness routine. The heart rate monitoring is accurate and the GPS tracking works perfectly for my runs."
        },
        {
          id: 2,
          user: "Emma L.",
          rating: 4,
          date: "2024-01-08",
          title: "Great value for money",
          comment: "Good features for the price. Battery life is impressive and the app is user-friendly. Would recommend!"
        }
      ],
      relatedDeals: [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: "$89.99",
          originalPrice: "$149.99",
          discount: "40%",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          timeLeft: "2h 15m"
        },
        {
          id: 4,
          name: "Kitchen Blender Pro",
          price: "$79.99",
          originalPrice: "$129.99",
          discount: "38%",
          image: "https://images.unsplash.com/photo-1570222094114-d054a8173ddb?w=400",
          timeLeft: "6h 20m"
        }
      ]
    },
    3: {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: "$24.99",
      originalPrice: "$39.99",
      discount: "37%",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600"
      ],
      specs: "100% organic cotton, breathable, multiple colors",
      rating: 4.4,
      reviews: 567,
      timeLeft: "1h 45m",
      category: "clothing",
      stock: 89,
      soldCount: 312,
      description: "Comfortable and sustainable clothing made from 100% organic cotton. Available in multiple colors and sizes. Perfect for everyday wear, casual outings, and anyone who values comfort and sustainability.",
      features: [
        "100% Organic Cotton",
        "Breathable Fabric",
        "Multiple Colors",
        "Sustainable",
        "Comfortable Fit",
        "Easy Care",
        "Hypoallergenic",
        "Eco-friendly"
      ],
      specifications: {
        "Material": "100% Organic Cotton",
        "Weight": "180 GSM",
        "Care": "Machine Wash Cold",
        "Origin": "Made in USA",
        "Certification": "GOTS Certified",
        "Fit": "Regular Fit"
      },
      colors: ["White", "Black", "Navy", "Gray", "Pink"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      reviews: [
        {
          id: 1,
          user: "Lisa P.",
          rating: 5,
          date: "2024-01-14",
          title: "Super comfortable!",
          comment: "This is the most comfortable t-shirt I've ever worn. The organic cotton feels amazing against my skin."
        },
        {
          id: 2,
          user: "David M.",
          rating: 4,
          date: "2024-01-10",
          title: "Great quality",
          comment: "Good quality organic cotton. Fits well and washes nicely. Will definitely buy more colors."
        }
      ],
      relatedDeals: [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: "$89.99",
          originalPrice: "$149.99",
          discount: "40%",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          timeLeft: "2h 15m"
        },
        {
          id: 2,
          name: "Smart Fitness Watch",
          price: "$129.99",
          originalPrice: "$199.99",
          discount: "35%",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
          timeLeft: "4h 30m"
        }
      ]
    },
    4: {
      id: 4,
      name: "Kitchen Blender Pro",
      price: "$79.99",
      originalPrice: "$129.99",
      discount: "38%",
      images: [
        "https://images.unsplash.com/photo-1570222094114-d054a8173ddb?w=600",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
      ],
      specs: "1000W motor, 6-speed settings, stainless steel blades",
      rating: 4.7,
      reviews: 743,
      timeLeft: "6h 20m",
      category: "home",
      stock: 34,
      soldCount: 189,
      description: "Professional-grade blender with powerful 1000W motor and stainless steel blades. Perfect for smoothies, soups, and more. Ideal for health enthusiasts, home chefs, and anyone who loves to create delicious drinks and meals.",
      features: [
        "1000W Motor",
        "6-speed Settings",
        "Stainless Steel Blades",
        "Large Capacity",
        "Easy Clean",
        "Pulse Function",
        "Safety Lock",
        "Dishwasher Safe Parts"
      ],
      specifications: {
        "Brand": "BlendMaster",
        "Model": "Pro 1000",
        "Power": "1000W",
        "Capacity": "1.5L",
        "Speeds": "6 + Pulse",
        "Material": "Stainless Steel",
        "Warranty": "3 years"
      },
      colors: ["Silver", "Black", "Red"],
      sizes: ["One Size"],
      reviews: [
        {
          id: 1,
          user: "Maria S.",
          rating: 5,
          date: "2024-01-13",
          title: "Powerful and reliable!",
          comment: "This blender is amazing! It handles everything from smoothies to ice crushing with ease. Very powerful motor."
        },
        {
          id: 2,
          user: "Tom B.",
          rating: 4,
          date: "2024-01-09",
          title: "Great for smoothies",
          comment: "Perfect for making smoothies and protein shakes. The different speed settings are very useful."
        }
      ],
      relatedDeals: [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: "$89.99",
          originalPrice: "$149.99",
          discount: "40%",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          timeLeft: "2h 15m"
        },
        {
          id: 3,
          name: "Organic Cotton T-Shirt",
          price: "$24.99",
          originalPrice: "$39.99",
          discount: "37%",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
          timeLeft: "1h 45m"
        }
      ]
    }
  };

  // Load deal data based on ID
  useEffect(() => {
    const loadDeal = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const dealData = mockDeals[id];
        if (dealData) {
          setDeal(dealData);
          setError(null);
        } else {
          setError("Deal not found");
        }
      } catch (err) {
        setError("Failed to load deal details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDeal();
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
    if (!deal) return "0.00";
    const original = parseFloat(deal.originalPrice.replace("$", ""));
    const current = parseFloat(deal.price.replace("$", ""));
    return (original - current).toFixed(2);
  };

  const formatTimeLeft = (timeLeft) => {
    return timeLeft;
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

  if (error || !deal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "This deal may have expired or been removed."}</p>
          <NavLink 
            to="/deals"
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300"
          >
            Browse All Deals
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
              to="/deals"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Deals</span>
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
                src={deal.images[selectedImage]}
                alt={deal.name}
                className="w-full h-96 object-cover"
              />
              {/* Deal Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                  {deal.discount} OFF
                </div>
              </div>
              {/* Timer */}
              <div className="absolute top-4 right-4">
                <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeLeft(deal.timeLeft)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {deal.images.map((image, index) => (
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
                    alt={`${deal.name} ${index + 1}`}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{deal.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {renderStars(deal.rating)}
                  </div>
                  <span className="text-gray-600">({deal.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{deal.soldCount} sold</span>
                </div>
              </div>
            </div>

            {/* Price and Discount */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  {deal.price}
                </span>
                <span className="text-xl text-gray-500 line-through">{deal.originalPrice}</span>
                <span className="text-lg font-semibold text-green-600">
                  Save ${calculateSavings()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-semibold text-sm bg-red-50 px-3 py-1 rounded-full">
                  {deal.discount} OFF
                </span>
                <span className="text-sm text-gray-500">Limited time offer</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{deal.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {deal.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaCheck className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            {deal.colors && deal.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {deal.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {deal.sizes && deal.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex space-x-3">
                  {deal.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                  {deal.stock} items in stock
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <FaShoppingCart className="w-5 h-5" />
                <span>Add to Cart - {deal.price}</span>
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
                  <span>30-Day Return</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(deal.specifications).map(([key, value]) => (
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
            {deal.reviews.slice(0, showReviews ? deal.reviews.length : 2).map((review) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deal.relatedDeals.map((relatedDeal) => (
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
                    <div className="bg-black/80 text-white px-3 py-1 rounded-full text-xs">
                      {relatedDeal.timeLeft}
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
                      to={`/deals/${relatedDeal.id}`}
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

export default DealDetail; 