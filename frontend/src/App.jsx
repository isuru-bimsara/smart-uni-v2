import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import AuthCallback from './pages/AuthCallback'
import DashboardPage from './pages/DashboardPage'
import ResourcesPage from './pages/ResourcesPage'
import BookingsPage from './pages/BookingsPage'
import TicketsPage from './pages/TicketsPage'
import NotificationsPage from './pages/NotificationsPage'
import AdminPage from './pages/AdminPage'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="ADMIN"><AdminPage /></ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
