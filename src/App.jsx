import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';

// User pages
import TicketList from './pages/user/TicketList';
import TicketDetail from './pages/user/TicketDetail';
import CreateTicket from './pages/user/CreateTicket';

// Admin pages
import AdminTicketList from './pages/admin/AdminTicketList';
import AdminTicketDetail from './pages/admin/AdminTicketDetail';

import { isAuthenticated, getUserRole } from './utils/auth';

const HomePage = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  const role = getUserRole();
  return <Navigate to={role === 'admin' ? '/admin/tickets' : '/tickets'} replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toast />
        
        <Routes>
          {/* Home redirect */}
          <Route path="/" element={<HomePage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User routes */}
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/create"
            element={
              <ProtectedRoute>
                <CreateTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <ProtectedRoute>
                <TicketDetail />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/tickets"
            element={
              <AdminRoute>
                <AdminTicketList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/tickets/:id"
            element={
              <AdminRoute>
                <AdminTicketDetail />
              </AdminRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;