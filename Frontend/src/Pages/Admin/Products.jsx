import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, Star, Eye, Package, AlertCircle } from 'lucide-react'
import productService from '../../services/productService'

const Products = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState('')

  // Fetch products from API
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await productService.getProducts()
      
      if (response.success) {
        setProducts(response.data.products)
        setFilteredProducts(response.data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setDeleteLoading(productId)
        const response = await productService.deleteProduct(productId)
        
        if (response.success) {
          // Remove product from local state
          const updatedProducts = products.filter(product => product._id !== productId)
          setProducts(updatedProducts)
          setFilteredProducts(updatedProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
          ))
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product: ' + error.message)
      } finally {
        setDeleteLoading('')
      }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-button mx-auto mb-4"></div>
          <p className="text-text">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
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
        
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
              {[...new Set(products.map(p => p.brand))].map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <button
              onClick={fetchProducts}
              className="px-4 py-2 bg-button text-white rounded-md hover:bg-button/90"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm border border-background overflow-hidden">
            <div className="aspect-w-16 aspect-h-12 bg-background/20">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0].startsWith('http') ? product.images[0] : `https://api.sarkarradiohouse.in${product.images[0]}`}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/f0f0f0/666666?text=Product+Image'
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
              )}
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
                  ₹{calculateDiscountedPrice(product.mrp, product.discount)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-sm text-text/60 line-through">₹{product.mrp}</span>
                      <span className="text-sm text-green-600 font-medium">-{product.discount}%</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.features && product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background text-text"
                  >
                    {feature}
                  </span>
                ))}
                {product.features && product.features.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background text-text">
                    +{product.features.length - 2} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-headers hover:bg-background/50 rounded-md transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deleteLoading === product._id}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50"
                  >
                    {deleteLoading === product._id ? (
                      <div className="h-4 w-4 mr-1 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                    ) : (
                      <Trash2 className="h-4 w-4 mr-1" />
                    )}
                    Delete
                  </button>
                </div>
                <Link 
                  to={`/products/${product._id}`}
                  className="inline-flex items-center px-3 py-1.5 text-sm text-text hover:bg-background/50 rounded-md transition-colors duration-200"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-text/70">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">
              {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first product'}
            </p>
            {!searchTerm && (
              <Link
                to="/admin/products/add"
                className="mt-4 inline-flex items-center px-4 py-2 bg-button text-white text-sm font-medium rounded-md hover:bg-button/90 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      {products.length > 0 && (
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
      )}
    </div>
  )
}

export default Products
