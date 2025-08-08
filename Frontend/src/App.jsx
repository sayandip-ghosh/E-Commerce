import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AdminProtectedRoute from './components/Auth/AdminProtectedRoute'
import AdminLayout from './components/AdminLayout'
import Dashboard from './Pages/Admin/Dashboard'
import Products from './Pages/Admin/Products'
import AddEditProduct from './Pages/Admin/AddEditProduct'
import Users from './Pages/Admin/Users'
import UserDetails from './Pages/Admin/UserDetails'
import LandingPage from './components/LandingPage'
import UserProfile from './components/Auth/UserProfile'
import AdminLogin from './components/Auth/AdminLogin'
import AdminRegister from './components/Auth/AdminRegister'
import { BestSellersPage } from './Pages/LandingPage/BestSellers/index.js'
import { FeaturedPage, FeaturedDetail } from './Pages/LandingPage/FeaturedProducts'
import { NewArrivalsPage, NewArrivalDetail } from './Pages/LandingPage/NewArrivals'
import { TodaysDealsPage, TodaysDealDetail } from './Pages/LandingPage/TodaysDeal'

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/deals" element={<BestSellersPage />} />
            <Route path="/featured" element={<FeaturedPage />} />
            <Route path="/featured/:id" element={<FeaturedDetail />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/new-arrivals/:id" element={<NewArrivalDetail />} />
            <Route path="/todays-deals" element={<TodaysDealsPage />} />
            <Route path="/todays-deals/:id" element={<TodaysDealDetail />} />
            
            {/* User Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute requireUser={true}>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            {/* Admin Authentication Routes (Public) */}
            <Route path="/admin/auth/login" element={<AdminLogin />} />
            <Route path="/admin/auth/register" element={<AdminRegister />} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin/*" element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddEditProduct />} />
              <Route path="products/edit/:id" element={<AddEditProduct />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UserDetails />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App