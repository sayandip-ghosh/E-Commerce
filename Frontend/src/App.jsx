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
import DealsPage from './Pages/Deals/DealsPage'
import DealDetail from './Pages/Deals/DealDetail'
import UserProfile from './components/Auth/UserProfile'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/deals/:id" element={<DealDetail />} />
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
