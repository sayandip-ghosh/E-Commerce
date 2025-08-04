import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  // Mock data - in a real app, this would come from your API
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Products',
      value: '1,245',
      change: '+8%',
      changeType: 'positive',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '8,432',
      change: '+23%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+15%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ]

  const recentActivity = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, action: 'Product added', user: 'Admin', time: '5 minutes ago' },
    { id: 3, action: 'Order placed', user: 'Jane Smith', time: '10 minutes ago' },
    { id: 4, action: 'Product updated', user: 'Admin', time: '15 minutes ago' },
    { id: 5, action: 'User profile updated', user: 'Mike Johnson', time: '20 minutes ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-headers">Dashboard</h1>
        <p className="text-text/80">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-background">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text/80">{stat.title}</p>
                  <p className="text-2xl font-bold text-headers">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-button' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-button">
                  <Icon className="h-6 w-6 text-background" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-background">
        <div className="p-6 border-b border-background">
          <h2 className="text-lg font-semibold text-headers">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-background/50 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-button rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-headers">{activity.action}</p>
                    <p className="text-sm text-text/70">by {activity.user}</p>
                  </div>
                </div>
                <p className="text-sm text-text/60">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
          <h3 className="text-lg font-semibold text-headers mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-sm text-button hover:bg-background/50 rounded-md transition-colors duration-200">
              Add New Product
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-button hover:bg-background/50 rounded-md transition-colors duration-200">
              View All Orders
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-button hover:bg-background/50 rounded-md transition-colors duration-200">
              Manage Users
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
          <h3 className="text-lg font-semibold text-headers mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text/80">Database</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background text-button">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text/80">API Server</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background text-button">
                Running
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text/80">Storage</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background/80 text-headers">
                75% Used
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-background">
          <h3 className="text-lg font-semibold text-headers mb-4">Performance</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-text/80">Page Load Time</span>
                <span className="text-headers">1.2s</span>
              </div>
              <div className="mt-1 w-full bg-background/30 rounded-full h-2">
                <div className="bg-button h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-text/80">Server Response</span>
                <span className="text-headers">0.3s</span>
              </div>
              <div className="mt-1 w-full bg-background/30 rounded-full h-2">
                <div className="bg-headers h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard