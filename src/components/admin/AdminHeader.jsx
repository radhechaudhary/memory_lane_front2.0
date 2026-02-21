// Admin Header - Glass morphism header with search & profile
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMenu, FiBell, FiChevronDown, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

const pageTitles = {
  '/admin': 'Overview',
  '/admin/users': 'Users',
  '/admin/memories': 'Memories',
  '/admin/analytics': 'Analytics',
};

const AdminHeader = ({ onMobileMenuToggle }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const currentTitle = pageTitles[location.pathname] || 'Admin Dashboard';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New user registered', time: '2 min ago', unread: true },
    { id: 2, title: 'Memory reported', time: '1 hour ago', unread: true },
    { id: 3, title: 'System update complete', time: '3 hours ago', unread: false },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-30 transition-all duration-300">
      <div className="bg-white/80 backdrop-blur-xl border-b border-[var(--color-surface-border)] shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <FiMenu className="w-5 h-5 text-[var(--color-text-secondary)]" />
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">
                {currentTitle}
              </h1>
              <p className="text-xs text-[var(--color-text-secondary)] hidden sm:block">
                Welcome back! Here's what's happening today.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-[var(--color-page-bg)] rounded-xl border border-[var(--color-surface-border)] focus-within:border-[var(--color-accent-gold)] focus-within:ring-2 focus-within:ring-amber-100 transition-all">
              <FiSearch className="w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] outline-none w-40 lg:w-56"
              />
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <FiBell className="w-5 h-5 text-[var(--color-text-secondary)]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-[var(--color-surface-border)] shadow-xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-[var(--color-surface-border)]">
                      <h3 className="font-semibold text-[var(--color-text-primary)]">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-[var(--color-surface-border)] hover:bg-stone-50 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-amber-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notification.unread && (
                              <span className="w-2 h-2 mt-2 bg-[var(--color-accent-gold)] rounded-full flex-shrink-0" />
                            )}
                            <div className={notification.unread ? '' : 'ml-5'}>
                              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                {notification.title}
                              </p>
                              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3">
                      <button className="w-full py-2 text-sm font-medium text-[var(--color-accent-gold-dark)] hover:bg-amber-50 rounded-xl transition-colors">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Admin</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Super Admin</p>
                </div>
                <FiChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-[var(--color-surface-border)] shadow-xl overflow-hidden"
                  >
                    <div className="p-3 border-b border-[var(--color-surface-border)]">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">Admin User</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">admin@memona.com</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 transition-colors text-left">
                        <FiUser className="w-4 h-4 text-[var(--color-text-secondary)]" />
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">Profile</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 transition-colors text-left">
                        <FiSettings className="w-4 h-4 text-[var(--color-text-secondary)]" />
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">Settings</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 transition-colors text-left">
                        <FiLogOut className="w-4 h-4 text-rose-500" />
                        <span className="text-sm font-medium text-rose-600">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

