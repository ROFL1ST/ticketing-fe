import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const Navbar = () => {
  const { isLoggedIn, role, logout, checkAuth } = useAuth();
  const appName = import.meta.env.VITE_APP_NAME;
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            {appName || 'Ticketing System'}
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {role === 'admin' ? (
                  <Link
                    to="/admin/tickets"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/tickets"
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      My Tickets
                    </Link>
                    <Link
                      to="/tickets/create"
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      Create Ticket
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;