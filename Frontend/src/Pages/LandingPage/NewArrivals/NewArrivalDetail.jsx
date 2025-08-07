import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaShare, FaTruck, FaShieldAlt, FaUndo, FaCheck } from "react-icons/fa";
import { Star, ArrowLeft } from "lucide-react";
import { useParams, NavLink } from "react-router-dom";

const NewArrivalDetail = () => {
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
      name: "Philips Air Fryer",
      price: "₹12,999",
      originalPrice: "₹15,999",
      discount: "18%",
      images: [
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
      ],
      specs: "4.1L, Digital Display",
      rating: 4.5,
      reviews: [
        {
          id: 1,
          user: "Amit S.",
          rating: 5,
          date: "2024-02-15",
          title: "Amazing air fryer!",
          comment: "Perfect for healthy cooking. The digital display makes it very easy to use."
        },
        {
          id: 2,
          user: "Neha R.",
          rating: 4,
          date: "2024-02-14",
          title: "Good product",
          comment: "Works great but takes some time to get used to the settings."
        }
      ],
      category: "Water & Kitchen",
      stock: 10,
      description: "Experience healthier cooking with this advanced digital air fryer. Perfect for families, featuring multiple cooking modes and a spacious 4.1L capacity.",
      features: [
        "4.1L Capacity",
        "Digital Touch Display",
        "8 Preset Modes",
        "Rapid Air Technology",
        "Non-stick Basket",
        "Auto Shut-off",
        "Temperature Control",
        "Timer Function"
      ],
      specifications: {
        "Brand": "Philips",
        "Model": "HD9252/90",
        "Capacity": "4.1 Litres",
        "Power": "1400 Watts",
        "Technology": "Rapid Air",
        "Material": "Plastic, Metal",
        "Warranty": "2 Years",
        "Color": "Black"
      },
      launchDate: "2024-02-15",
      relatedProducts: [
        {
          id: 2,
          name: "Samsung MicroOven",
          price: "₹14,999",
          originalPrice: "₹17,999",
          discount: "16%",
          image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80",
          category: "Water & Kitchen"
        },
        {
          id: 3,
          name: "V-Guard Inverter Battery",
          price: "₹18,999",
          originalPrice: "₹21,999",
          discount: "13%",
          image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=400&q=80",
          category: "Power & Electronics"
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "This product may no longer be available."}</p>
          <NavLink 
            to="/new-arrivals"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300"
          >
            Browse New Arrivals
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
              to="/new-arrivals"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to New Arrivals</span>
            </NavLink>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-green-500 transition-colors duration-200">
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
              {/* New Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                  New Arrival
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
                      ? 'border-green-500 shadow-lg'
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
                <div className="flex items-center space-x-1 text-green-600 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Just Launched</span>
                </div>
              </div>
            </div>

            {/* Price and Discount */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  {product.price}
                </span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                <span className="text-lg font-semibold text-green-600">
                  Save ₹{calculateSavings()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full">
                  {product.discount} OFF
                </span>
                <span className="text-sm text-gray-500">Launch offer</span>
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
                    <FaCheck className="w-4 h-4 text-green-500" />
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
                  {product.stock} items in stock
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
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
            <h2 className="text-2xl font-bold text-gray-900">First Reviews</h2>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {showReviews ? 'Show Less' : 'Show All Reviews'}
            </button>
          </div>
          
          <div className="space-y-6">
            {product.reviews.slice(0, showReviews ? product.reviews.length : 2).map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
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

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      New Arrival
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">{relatedProduct.price}</span>
                      <span className="text-sm text-gray-500 line-through">{relatedProduct.originalPrice}</span>
                    </div>
                    <NavLink
                      to={`/new-arrivals/${relatedProduct.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      View Details →
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

export default NewArrivalDetail;
