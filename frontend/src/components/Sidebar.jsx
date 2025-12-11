import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FileText, User, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/workspace', icon: FileText, label: 'Workspace' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    } else {
      setIsCollapsed(false);
    }
  }, [location.pathname, isMobile]);

  // Toggle collapsed state based on mobile state
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Sidebar container classes
  const sidebarClasses = [
    isCollapsed && !isMobile ? 'w-20' : isMobile ? 'w-64 translate-x-0' : 'w-64',
    'bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300',
    isMobile ? 'fixed h-full z-50 transform' : '',
    mobileMenuOpen ? '' : '-translate-x-full'
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Overlay for mobile */}
      {mobileMenuOpen && isMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <div className={sidebarClasses}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className={`ml-2 text-xl font-bold text-gray-900 ${isMobile || !isCollapsed ? '' : 'hidden'}`}>
              Collab-Talk
            </span>
          </Link>
          
          {/* Mobile menu close button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={isMobile ? () => setMobileMenuOpen(false) : undefined}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    } ${isMobile || !isCollapsed ? 'justify-start' : 'justify-center'}`}
                  >
                    <Icon className={`h-5 w-5 ${isMobile || !isCollapsed ? 'mr-3' : ''}`} />
                    {(isMobile || !isCollapsed) && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Collapse/Expand button for desktop */}
        {!isMobile && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={toggleCollapse}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 w-full"
            >
              {isCollapsed ? (
                <>
                  <span className="sr-only">Expand sidebar</span>
                  <span className="text-xs">→</span>
                </>
              ) : (
                <>
                  <span className="mr-2 text-xs">←</span>
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-gray-500 bg-white shadow-lg"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
};

export default Sidebar;