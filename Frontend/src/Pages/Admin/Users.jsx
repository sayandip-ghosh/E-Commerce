import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, Mail, MapPin, Calendar, Filter, Users as UsersIcon } from 'lucide-react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  // Mock data - in a real app, this would come from your API
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '/api/placeholder/40/40',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        joinDate: '2024-01-15',
        lastLogin: '2024-01-30',
        status: 'active',
        orderCount: 12,
        totalSpent: 1250.00,
        preferences: {
          newsletter: true,
          smsUpdates: false
        }
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: '/api/placeholder/40/40',
        phone: '+1 (555) 234-5678',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        joinDate: '2024-01-10',
        lastLogin: '2024-01-29',
        status: 'active',
        orderCount: 8,
        totalSpent: 890.50,
        preferences: {
          newsletter: true,
          smsUpdates: true
        }
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        avatar: '/api/placeholder/40/40',
        phone: '+1 (555) 345-6789',
        address: {
          street: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        joinDate: '2023-12-20',
        lastLogin: '2024-01-25',
        status: 'active',
        orderCount: 15,
        totalSpent: 2100.75,
        preferences: {
          newsletter: false,
          smsUpdates: false
        }
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        avatar: '/api/placeholder/40/40',
        phone: '+1 (555) 456-7890',
        address: {
          street: '321 Elm St',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA'
        },
        joinDate: '2023-11-30',
        lastLogin: '2024-01-20',
        status: 'inactive',
        orderCount: 3,
        totalSpent: 150.25,
        preferences: {
          newsletter: true,
          smsUpdates: true
        }
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@example.com',
        avatar: '/api/placeholder/40/40',
        phone: '+1 (555) 567-8901',
        address: {
          street: '654 Maple Dr',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        joinDate: '2024-01-05',
        lastLogin: '2024-01-31',
        status: 'active',
        orderCount: 5,
        totalSpent: 420.00,
        preferences: {
          newsletter: true,
          smsUpdates: false
        }
      }
    ]
    setUsers(mockUsers)
    setFilteredUsers(mockUsers)
  }, [])

  useEffect(() => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    // Sort users
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate))
        break
      case 'mostOrders':
        filtered.sort((a, b) => b.orderCount - a.orderCount)
        break
      case 'mostSpent':
        filtered.sort((a, b) => b.totalSpent - a.totalSpent)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    setFilteredUsers(filtered)
  }, [searchTerm, statusFilter, sortBy, users])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'active':
        return `${baseClasses} bg-background text-button`
      case 'inactive':
        return `${baseClasses} bg-background/50 text-text/80`
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-background/50 text-text/80`
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === 'active').length
  const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0)
  const totalOrders = users.reduce((sum, user) => sum + user.orderCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-headers">Users</h1>
        <p className="text-text/80">Manage registered users and view their details</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/80">Total Users</p>
              <p className="text-2xl font-bold text-headers">{totalUsers}</p>
            </div>
            <div className="p-3 rounded-lg bg-button">
              <UsersIcon className="h-6 w-6 text-background" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/80">Active Users</p>
              <p className="text-2xl font-bold text-headers">{activeUsers}</p>
            </div>
            <div className="p-3 rounded-lg bg-button">
              <UsersIcon className="h-6 w-6 text-background" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/80">Total Orders</p>
              <p className="text-2xl font-bold text-headers">{totalOrders}</p>
            </div>
            <div className="p-3 rounded-lg bg-button">
              <UsersIcon className="h-6 w-6 text-background" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text/80">Total Revenue</p>
              <p className="text-2xl font-bold text-headers">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-button">
              <UsersIcon className="h-6 w-6 text-background" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-background rounded-md focus:ring-2 focus:ring-button focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-background rounded-md focus:ring-2 focus:ring-button focus:border-transparent text-text"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <select
              className="px-4 py-2 border border-background rounded-md focus:ring-2 focus:ring-button focus:border-transparent text-text"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="mostOrders">Most Orders</option>
              <option value="mostSpent">Highest Spender</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-background">
            <thead className="bg-background/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-background/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-background/10 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-headers">{user.name}</div>
                        <div className="text-sm text-text/60">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-text">
                        <Mail className="h-4 w-4 mr-2 text-text/40" />
                        {user.email}
                      </div>
                      <div className="text-sm text-text/60">{user.phone}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-text">
                      <MapPin className="h-4 w-4 mr-2 text-text/40" />
                      <div>
                        <div>{user.address.city}, {user.address.state}</div>
                        <div className="text-text/60">{user.address.country}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {user.orderCount}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-headers">
                    ${user.totalSpent.toFixed(2)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-text">
                      <Calendar className="h-4 w-4 mr-2 text-text/40" />
                      {formatDate(user.joinDate)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-button hover:bg-background/50 rounded-md transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="h-12 w-12 text-text/40 mx-auto mb-4" />
            <p className="text-lg font-medium text-headers">No users found</p>
            <p className="text-sm text-text/60">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination would go here in a real app */}
      {filteredUsers.length > 0 && (
        <div className="bg-white px-6 py-3 border border-background rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text/70">
              Showing {filteredUsers.length} of {totalUsers} users
            </div>
            {/* Pagination controls would go here */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Users