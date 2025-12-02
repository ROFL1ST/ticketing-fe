import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import TicketList from "./pages/user/TicketList";
import TicketDetail from "./pages/user/TicketDetail";
import CreateTicket from "./pages/user/CreateTicket";

import AdminTicketList from "./pages/admin/AdminTicketList";
import AdminTicketDetail from "./pages/admin/AdminTicketDetail";

import { isAuthenticated, getUserRole } from "./utils/auth";

const HomePage = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole();
  return (
    <Navigate to={role === "admin" ? "/admin/tickets" : "/tickets"} replace />
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toast />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
