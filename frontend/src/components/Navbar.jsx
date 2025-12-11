import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, Users, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Collab-Talk</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <Bell className="h-6 w-6" />
                  <span className="sr-only">View notifications</span>
                </button>
                <div className="ml-3 relative">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="text-sm font-medium text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">Online</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="ml-2 px-3 py-1 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;