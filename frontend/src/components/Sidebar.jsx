import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FileText, User, Menu, X, Settings, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: 3 },
    { path: '/chat', icon: MessageSquare, label: 'Chat', badge: 5 },
    { path: '/workspace', icon: FileText, label: 'Workspace', badge: 2 },
    { path: '/users', icon: Users, label: 'Team', badge: 7 },
    { path: '/profile', icon: User, label: 'Profile', badge: 0 },
    { path: '/settings', icon: Settings, label: 'Settings', badge: 0 },
  ];

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle sidebar collapse for desktop view
  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Close mobile menu when navigating
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Desktop Sidebar (always visible on desktop)
  const DesktopSidebar = () => (
    <div className={`h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} shadow-sm`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Link to="/" className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="ml-3 text-lg font-bold text-gray-900">
                Collab-Talk
              </span>
            )}
          </div>
        </Link>

        {/* Collapse button - only visible when not collapsed */}
        <button
          onClick={toggleCollapse}
          className={`p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-l-4 border-primary-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center' : 'justify-start'} relative group`}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {!isCollapsed && item.badge > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {/* Badge in collapsed state */}
                  {isCollapsed && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {/* Tooltip in collapsed state */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse/Expand button for desktop */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={toggleCollapse}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <div className="flex items-center w-full justify-center">
              <ChevronRight className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex items-center w-full">
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  // Mobile Sidebar (slide-in panel)
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-lg font-bold text-gray-900">
              Collab-Talk
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-l-4 border-primary-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    } relative`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );

  return (
    <div className="relative">
      {/* Desktop Sidebar - Always visible on desktop (md and larger screens) */}
      <div className="hidden md:block flex-shrink-0">
        <DesktopSidebar />
      </div>

      {/* Mobile Sidebar - Slide-in panel */}
      <div className="md:hidden absolute top-0 left-0 w-full h-full">
        <MobileSidebar />
      </div>

      {/* Mobile menu button - Only visible on mobile */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:from-primary-600 hover:to-primary-700 transition-all"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;