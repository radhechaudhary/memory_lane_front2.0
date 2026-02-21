// Admin Header - Glass morphism header with search & profile
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiBell, FiSettings } from "react-icons/fi";

const pageTitles = {
  "/admin": "Overview",
  "/admin/users": "Users",
  "/admin/memories": "Memories",
  "/admin/analytics": "Analytics",
  "/admin/support": "Support",
};

const AdminHeader = ({ onMobileMenuToggle }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const currentTitle = pageTitles[location.pathname] || "Admin Dashboard";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: "New user registered", time: "2 min ago", unread: true },
    { id: 2, title: "Memory reported", time: "1 hour ago", unread: true },
    {
      id: 3,
      title: "System update complete",
      time: "3 hours ago",
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[var(--color-surface-border)]">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <FiMenu className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>

          {/* Page Title */}
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            {currentTitle}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[var(--color-page-bg)] rounded-lg border border-[var(--color-surface-border)] focus-within:border-[var(--color-accent-gold)] focus-within:ring-2 focus-within:ring-amber-100 transition-all">
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
              className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors"
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
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-[var(--color-surface-border)] hover:bg-stone-50 cursor-pointer transition-colors ${
                          notification.unread ? "bg-amber-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <span className="w-2 h-2 mt-2 bg-[var(--color-accent-gold)] rounded-full flex-shrink-0" />
                          )}
                          <div className={notification.unread ? "" : "ml-5"}>
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
                    <button className="w-full py-2 text-sm font-medium text-[var(--color-accent-gold-dark)] hover:bg-amber-50 rounded-lg transition-colors">
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
              className="flex items-center gap-2 rounded-lg p-2 hover:bg-stone-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
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
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      Admin User
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      admin@memona.com
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/settings"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-100 transition-colors text-left"
                    >
                      <FiSettings className="w-4 h-4 text-[var(--color-text-secondary)]" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">
                        Settings
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
