import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, Star, Eye, Package } from 'lucide-react'

const Products = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  // Mock data - in a real app, this would come from your API
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        title: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        brand: 'AudioTech',
        mrp: 299.99,
        discount: 20,
        rating: 4.5,
        images: ['/api/placeholder/200/200'],
        features: ['Noise Cancellation', 'Wireless', '30hr Battery'],
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        title: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitoring',
        brand: 'FitTech',
        mrp: 199.99,
        discount: 15,
        rating: 4.3,
        images: ['/api/placeholder/200/200'],
        features: ['Heart Rate Monitor', 'GPS', 'Waterproof'],
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        title: 'Gaming Mechanical Keyboard',
        description: 'RGB mechanical keyboard for gaming enthusiasts',
        brand: 'GameGear',
        mrp: 159.99,
        discount: 25,
        rating: 4.7,
        images: ['/api/placeholder/200/200'],
        features: ['RGB Lighting', 'Mechanical Switches', 'Programmable Keys'],
        createdAt: '2024-01-08'
      },
      {
        id: 4,
        title: 'Wireless Bluetooth Speaker',
        description: 'Portable speaker with excellent sound quality',
        brand: 'SoundWave',
        mrp: 89.99,
        discount: 10,
        rating: 4.2,
        images: ['/api/placeholder/200/200'],
        features: ['Bluetooth 5.0', 'Waterproof', '12hr Battery'],
        createdAt: '2024-01-05'
      }
    ]
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId)
      setProducts(updatedProducts)
    }
  }

  const calculateDiscountedPrice = (mrp, discount) => {
    return (mrp - (mrp * discount / 100)).toFixed(2)
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      )
    }
    return stars
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-headers">Products</h1>
          <p className="text-text">Manage your product inventory</p>
        </div>
        <Link
          to="/admin/products/add"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-button text-white text-sm font-medium rounded-md hover:bg-button/90 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/60 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-background rounded-md focus:ring-2 focus:ring-button focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-background rounded-md focus:ring-2 focus:ring-button focus:border-transparent text-text">
              <option value="">All Brands</option>
              <option value="AudioTech">AudioTech</option>
              <option value="FitTech">FitTech</option>
              <option value="GameGear">GameGear</option>
              <option value="SoundWave">SoundWave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-background overflow-hidden">
            <div className="aspect-w-16 aspect-h-12 bg-background/20">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-headers line-clamp-2">{product.title}</h3>
              </div>
              
              <p className="text-sm text-text/80 mb-2">{product.brand}</p>
              
              <p className="text-sm text-text/70 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-sm text-text/80">({product.rating})</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-headers">
                    ${calculateDiscountedPrice(product.mrp, product.discount)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-sm text-text/60 line-through">${product.mrp}</span>
                      <span className="text-sm text-green-600 font-medium">-{product.discount}%</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background text-text"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background text-text">
                    +{product.features.length - 2} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-headers hover:bg-background/50 rounded-md transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
                <button className="inline-flex items-center px-3 py-1.5 text-sm text-text hover:bg-background/50 rounded-md transition-colors duration-200">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-text/70">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
        <h3 className="text-lg font-semibold text-headers mb-4">Product Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-headers">{products.length}</div>
            <div className="text-sm text-text/80">Total Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-button">
              {products.filter(p => p.discount > 0).length}
            </div>
            <div className="text-sm text-text/80">On Sale</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-headers">
              {products.filter(p => p.rating >= 4.5).length}
            </div>
            <div className="text-sm text-text/80">High Rated (4.5+)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-button">
              {new Set(products.map(p => p.brand)).size}
            </div>
            <div className="text-sm text-text/80">Brands</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products