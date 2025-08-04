import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  CreditCard,
  User,
  Bell,
  MessageSquare,
  Package,
  Clock,
  Star,
  CheckCircle,
  Truck,
  X
} from 'lucide-react'

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [orderHistory, setOrderHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call - in a real app, fetch user data by ID
    const fetchUserData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockUser = {
          id: parseInt(id),
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: '/api/placeholder/120/120',
          phone: '+1 (555) 123-4567',
          address: {
            street: '123 Main Street',
            apartment: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States'
          },
          joinDate: '2024-01-15',
          lastLogin: '2024-01-30T10:30:00Z',
          status: 'active',
          orderCount: 12,
          totalSpent: 1250.00,
          averageOrderValue: 104.17,
          preferences: {
            newsletter: true,
            smsUpdates: false,
            promotions: true
          },
          loyaltyPoints: 1250,
          tier: 'Gold'
        }

        const mockOrders = [
          {
            id: 'ORD-001',
            date: '2024-01-28',
            status: 'delivered',
            total: 299.99,
            items: [
              {
                id: 1,
                name: 'Premium Wireless Headphones',
                image: '/api/placeholder/60/60',
                price: 299.99,
                quantity: 1
              }
            ],
            shippingAddress: mockUser.address,
            paymentMethod: 'Credit Card (**** 1234)',
            trackingNumber: 'TN123456789'
          },
          {
            id: 'ORD-002',
            date: '2024-01-22',
            status: 'shipped',
            total: 189.98,
            items: [
              {
                id: 2,
                name: 'Smart Fitness Watch',
                image: '/api/placeholder/60/60',
                price: 189.98,
                quantity: 1
              }
            ],
            shippingAddress: mockUser.address,
            paymentMethod: 'PayPal',
            trackingNumber: 'TN987654321'
          },
          {
            id: 'ORD-003',
            date: '2024-01-18',
            status: 'processing',
            total: 159.99,
            items: [
              {
                id: 3,
                name: 'Gaming Mechanical Keyboard',
                image: '/api/placeholder/60/60',
                price: 159.99,
                quantity: 1
              }
            ],
            shippingAddress: mockUser.address,
            paymentMethod: 'Credit Card (**** 5678)',
            trackingNumber: null
          },
          {
            id: 'ORD-004',
            date: '2024-01-10',
            status: 'delivered',
            total: 89.99,
            items: [
              {
                id: 4,
                name: 'Wireless Bluetooth Speaker',
                image: '/api/placeholder/60/60',
                price: 89.99,
                quantity: 1
              }
            ],
            shippingAddress: mockUser.address,
            paymentMethod: 'Credit Card (**** 1234)',
            trackingNumber: 'TN555666777'
          }
        ]

        setUser(mockUser)
        setOrderHistory(mockOrders)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'delivered':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'shipped':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'processing':
        return <Clock className="h-4 w-4" />
      case 'cancelled':
        return <X className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-text">User not found</p>
        <Link
          to="/admin/users"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/admin/users"
          className="inline-flex items-center text-text hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Users
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-headers">User Details</h1>
        <p className="text-text">View user information and order history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <img
                className="h-24 w-24 rounded-full mx-auto object-cover mb-4"
                src={user.avatar}
                alt={user.name}
              />
              <h2 className="text-xl font-semibold text-headers">{user.name}</h2>
              <p className="text-text">User ID: {user.id}</p>
              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === 'active' ? 'bg-background text-button' : 'bg-background/50 text-text/80'
                }`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-headers mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-text mr-3" />
                <div>
                  <p className="text-sm font-medium text-text">{user.email}</p>
                  <p className="text-sm text-text/80">Email</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-text mr-3" />
                <div>
                  <p className="text-sm font-medium text-text">{user.phone}</p>
                  <p className="text-sm text-text/80">Phone</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-text mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text">
                    {user.address.street}
                    {user.address.apartment && `, ${user.address.apartment}`}
                  </p>
                  <p className="text-sm text-text/80">
                    {user.address.city}, {user.address.state} {user.address.zipCode}
                  </p>
                  <p className="text-sm text-text/80">{user.address.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-headers mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text/80">Member Since</span>
                <span className="text-sm font-medium text-text">{formatDate(user.joinDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text/80">Last Login</span>
                <span className="text-sm font-medium text-text">{formatDateTime(user.lastLogin)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text/80">Loyalty Tier</span>
                <span className="text-sm font-medium text-yellow-600">{user.tier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text/80">Points Balance</span>
                <span className="text-sm font-medium text-text">{user.loyaltyPoints.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-headers mb-4">Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text/80">Newsletter</span>
                <span className={`text-sm font-medium ${user.preferences.newsletter ? 'text-green-600' : 'text-gray-400'}`}>
                  {user.preferences.newsletter ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text/80">SMS Updates</span>
                <span className={`text-sm font-medium ${user.preferences.smsUpdates ? 'text-green-600' : 'text-gray-400'}`}>
                  {user.preferences.smsUpdates ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text/80">Promotions</span>
                <span className={`text-sm font-medium ${user.preferences.promotions ? 'text-green-600' : 'text-gray-400'}`}>
                  {user.preferences.promotions ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order History and Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">Total Orders</p>
                  <p className="text-2xl font-bold text-headers">{user.orderCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-button">
                  <ShoppingBag className="h-6 w-6 text-background" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">Total Spent</p>
                  <p className="text-2xl font-bold text-headers">${user.totalSpent.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-lg bg-button">
                  <CreditCard className="h-6 w-6 text-background" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">Average Order</p>
                  <p className="text-2xl font-bold text-headers">${user.averageOrderValue.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-lg  bg-button">
                  <Package className="h-6 w-6 text-background" />
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {orderHistory.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-sm font-medium text-gray-900">Order {order.id}</h4>
                        <span className={getStatusBadge(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.date)}
                        </span>
                        {order.trackingNumber && (
                          <span>Tracking: {order.trackingNumber}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="mt-4 p-3 bg-background/60 rounded-md">
                    <p className="text-sm font-medium text-headers mb-1">Shipping Address:</p>
                    <p className="text-sm text-text">
                      {order.shippingAddress.street}
                      {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {orderHistory.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-500">No orders found</p>
                <p className="text-sm text-gray-400">This user hasn't placed any orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails