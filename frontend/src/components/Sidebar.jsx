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

  // Sidebar container classes for desktop and mobile views
  const desktopSidebarClasses = `bg-white shadow-lg border-r border-gray-200 flex flex-col h-full ${
    isCollapsed ? 'w-20' : 'w-64'
  } transition-all duration-300`;

  const mobileSidebarClasses = `fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 transform ${
    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
  } transition-transform duration-300 ease-in-out flex flex-col`;

  // Desktop Sidebar (always visible on desktop)
  const DesktopSidebar = () => (
    <div className={desktopSidebarClasses}>
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          {isCollapsed ? null : (
            <span className="ml-2 text-xl font-bold text-gray-900">
              Collab-Talk
            </span>
          )}
        </Link>
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
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse/Expand button for desktop */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={toggleCollapse}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 w-full"
        >
          {isCollapsed ? (
            <div className="flex items-center">
              <span className="text-xs mr-1">→</span>
              <span className="sr-only">Expand</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-xs mr-2">←</span>
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

      <div className={mobileSidebarClasses}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              Collab-Talk
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
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
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
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
      <div className="hidden md:block fixed top-0 left-0 z-20">
        <DesktopSidebar />
      </div>
      
      {/* Mobile Sidebar - Slide-in panel */}
      <div className="md:hidden absolute top-0 left-0 w-full h-full">
        <MobileSidebar />
      </div>
      
      {/* Mobile menu button - Only visible on mobile */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 bg-white shadow-lg"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;