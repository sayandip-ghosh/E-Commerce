import { Outlet, NavLink, useLocation, Navigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'
import authService from '../services/authService'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await authService.getCurrentUser()
        setIsAdmin(user && user.role === 'admin')
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [])

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Users', href: '/admin/users', icon: Users },
  ]

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="h-screen bg-background lg:flex lg:flex-row">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-text/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-background">
          <h1 className="text-xl font-bold text-headers">Admin Panel</h1>
          <button
            className="lg:hidden text-text hover:text-headers transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-background text-headers'
                      : 'text-text hover:bg-background/50 hover:text-headers'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-background">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-text hover:text-headers hover:bg-background/50 rounded-md transition-colors duration-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-background">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              className="lg:hidden text-text hover:text-headers transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-headers font-medium">
                Welcome back, Admin
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
