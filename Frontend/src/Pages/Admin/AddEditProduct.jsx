import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Upload, X, Plus, Star } from 'lucide-react'
import productService from '../../services/productService'

const AddEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    brand: '',
    mrp: '',
    discount: 0,
    rating: 0,
    features: [''],
    images: ['', '', '', '']
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Replace mock data with real API call
  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [isEditing, id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProduct(id);
      if (response.success) {
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrors({ general: error.message });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        features: newFeatures
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required'
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required'
    }

    if (!formData.mrp || formData.mrp <= 0) {
      newErrors.mrp = 'Valid MRP is required'
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'Discount must be between 0 and 100'
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }

    const validFeatures = formData.features.filter(feature => feature.trim())
    if (validFeatures.length === 0) {
      newErrors.features = 'At least one feature is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({}) // Clear previous errors
    
    try {
      // Ensure proper data types and filter empty values
      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        brand: formData.brand.trim(),
        mrp: Number(formData.mrp),
        discount: Number(formData.discount) || 0,
        rating: parseFloat(formData.rating) || 0,
        features: formData.features.filter(feature => feature.trim()).map(f => f.trim()),
        images: formData.images.filter(image => image.trim()).map(i => i.trim())
      };

      // Ensure at least one feature exists
      if (productData.features.length === 0) {
        setErrors({ features: 'At least one feature is required' });
        return;
      }

      console.log('Submitting product data:', productData); // Debug log

      let response;
      if (isEditing) {
        response = await productService.updateProduct(id, productData);
      } else {
        response = await productService.createProduct(productData);
      }

      if (response.success) {
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      
      // Handle specific error cases
      if (error.message.includes('title already exists')) {
        setErrors({ 
          title: 'A product with this title already exists. Please use a different title.',
          general: 'Please choose a unique product title.'
        });
      } else if (error.message.includes('sku already exists')) {
        setErrors({ 
          general: 'There is a data conflict. Please try refreshing the page and try again.'
        });
      } else if (error.message.includes('Validation errors')) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: error.message });
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating, interactive = false) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={interactive ? () => setFormData(prev => ({ ...prev, rating: i })) : undefined}
          className={`h-5 w-5 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          disabled={!interactive}
        >
          <Star className="h-full w-full" />
        </button>
      )
    }
    return stars
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/admin/products"
          className="inline-flex items-center text-text hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Products
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-headers">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-text">
          {isEditing ? 'Update the product information below' : 'Fill in the details to add a new product'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-headers mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter product title"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter product description"
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.brand ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter brand name"
                  />
                  {errors.brand && <p className="text-red-600 text-sm mt-1">{errors.brand}</p>}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-headers mb-4">Features</h2>
              
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center px-3 py-2 text-sm text-text hover:bg-button/10 rounded-md transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
                {errors.features && <p className="text-red-600 text-sm">{errors.features}</p>}
              </div>
            </div>

            {/* Images */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-headers mb-4">Product Images</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Image {index + 1} {index === 0 && '*'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      {image ? (
                        <div className="space-y-2">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder="Image URL"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder="Enter image URL"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-headers mb-4">Pricing</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MRP (₹) *
                  </label>
                  <input
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.mrp ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.mrp && <p className="text-red-600 text-sm mt-1">{errors.mrp}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.discount ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.discount && <p className="text-red-600 text-sm mt-1">{errors.discount}</p>}
                </div>

                {formData.mrp && formData.discount > 0 && (
                  <div className="p-3 bg-green-50 rounded-md">
                    <p className="text-sm text-green-800">
                      Sale Price: ₹{(formData.mrp - (formData.mrp * formData.discount / 100)).toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600">
                      You save: ₹{(formData.mrp * formData.discount / 100).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-headers mb-4">Rating</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderStars(formData.rating, true)}
                    <span className="ml-2 text-sm text-gray-600">({formData.rating}/5)</span>
                  </div>
                  {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-button text-white text-sm font-medium rounded-md hover:bg-button/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                </button>
                
                <Link
                  to="/admin/products"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddEditProduct