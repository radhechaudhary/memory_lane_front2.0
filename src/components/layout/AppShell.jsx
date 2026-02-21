import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Simple AppShell component that wraps the content with navigation
export default function AppShell({ 
  children, 
  activeNav = '', 
  title = '', 
  subtitle = '', 
  contentClassName = '' 
}) {
  const location = useLocation();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-home', path: '/dashboard' },
    { id: 'timeline', label: 'Timeline', icon: 'fa-clock', path: '/timeline' },
    { id: 'albums', label: 'Albums', icon: 'fa-images', path: '/albums' },
    { id: 'milestones', label: 'Milestones', icon: 'fa-flag', path: '/milestones' },
    { id: 'map', label: 'Map', icon: 'fa-map-marker-alt', path: '/map' },
    { id: 'shared', label: 'Shared', icon: 'fa-share-alt', path: '/shared' },
  ];
  
  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: 'fa-cog', path: '/settings' },
    { id: 'support', label: 'Support', icon: 'fa-question-circle', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <Link to="/dashboard" className="text-xl font-bold text-amber-500">
            Memona
          </Link>
        </div>
        
        <nav className="px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeNav === item.id
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-3 dark:border-gray-700">
          {bottomNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
      
      {/* Main content */}
      <div className="pl-64">
        <header className="border-b border-gray-200 bg-white px-8 py-4 dark:border-gray-700 dark:bg-gray-800">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </header>
        
        <main className={`p-8 ${contentClassName}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

