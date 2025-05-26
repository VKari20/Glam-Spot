import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCheck, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <UserCheck size={20} className="mr-2" />
              Check-In
            </Link>
            {user && (
              <Link
                to="/customers"
                className={`flex items-center px-4 py-3 font-medium transition-colors ${
                  location.pathname === '/customers'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Users size={20} className="mr-2" />
                Customers
              </Link>
            )}
          </div>
          {user && (
            <button
              onClick={() => signOut()}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;