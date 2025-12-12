import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, User, Search, Settings, HelpCircle, Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">
                Collab-Talk
              </span>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:ml-8 md:flex md:items-center md:pl-8 md:border-l md:border-gray-100">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search messages, contacts, workspaces..."
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-gray-50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Right section - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Notification Bell */}
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Dark Mode Toggle */}
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <Moon className="h-5 w-5" />
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5" />
            </button>

            {/* Help */}
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* User Profile */}
            {user && (
              <div className="ml-4 flex items-center space-x-3 pl-4 border-l border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">Online</div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search messages, contacts, workspaces..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-gray-50"
              />
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  <HelpCircle className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile User Profile */}
              {user && (
                <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">Online</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;