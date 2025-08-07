import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import Dashboard from './Pages/Admin/Dashboard'
import Products from './Pages/Admin/Products'
import AddEditProduct from './Pages/Admin/AddEditProduct'
import Users from './Pages/Admin/Users'
import UserDetails from './Pages/Admin/UserDetails'
import LandingPage from './components/LandingPage'
import UserProfile from './components/Auth/UserProfile'
import { BestSellersPage } from './Pages/LandingPage/BestSellers/index.js'
import { FeaturedPage, FeaturedDetail } from './Pages/LandingPage/FeaturedProducts'
import { NewArrivalsPage, NewArrivalDetail } from './Pages/LandingPage/NewArrivals'
import { TodaysDealsPage, TodaysDealDetail } from './Pages/LandingPage/TodaysDeal'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Redirect /deals to /best-sellers */}
          <Route path="/deals" element={<BestSellersPage />} />
          {/* Featured Products Routes */}
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/featured/:id" element={<FeaturedDetail />} />
          {/* New Arrivals Routes */}
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/new-arrivals/:id" element={<NewArrivalDetail />} />
          {/* Today's Deals Routes */}
          <Route path="/todays-deals" element={<TodaysDealsPage />} />
          <Route path="/todays-deals/:id" element={<TodaysDealDetail />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddEditProduct />} />
            <Route path="products/edit/:id" element={<AddEditProduct />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App