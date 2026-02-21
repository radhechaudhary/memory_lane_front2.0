import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiSearch,
  FiPlus,
  FiBell,
  FiX,
  FiSettings,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const UserHeader = ({ onMobileMenuToggle }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/timeline":
        return "Timeline";
      case "/albums":
        return "Albums";
      case "/milestones":
        return "Milestones";
      case "/map":
        return "Memory Map";
      case "/shared":
        return "Shared Memories";
      case "/settings":
        return "Settings";
      default:
        return "Memona";
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <FiMenu className="w-5 h-5 text-stone-600" />
          </button>

          {/* Page Title */}
          <h1 className="text-xl font-bold text-stone-900">{getPageTitle()}</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:block">
            <div className="search-input">
              <FiSearch className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64"
              />
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            {searchOpen ? (
              <FiX className="w-5 h-5 text-stone-600" />
            ) : (
              <FiSearch className="w-5 h-5 text-stone-600" />
            )}
          </button>

          {/* Add Memory Button */}
          <Link
            to="/timeline"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 rounded-xl font-semibold text-sm hover:from-amber-500 hover:to-amber-600 transition-all"
          >
            <FiPlus className="w-4 h-4" />
            <span className="hidden lg:inline">Add Memory</span>
          </Link>

          {/* Mobile Add Button */}
          <Link
            to="/timeline"
            className="sm:hidden p-2 rounded-lg bg-amber-400 text-stone-900"
          >
            <FiPlus className="w-5 h-5" />
          </Link>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors">
            <FiBell className="w-5 h-5 text-stone-600" />
            <span className="notification-badge">3</span>
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg"
                >
                  <div className="border-b border-stone-200 px-4 py-3">
                    <p className="text-sm font-semibold text-stone-900">
                      {user?.name || user?.username || "User"}
                    </p>
                    <p className="text-xs text-stone-500">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-100"
                    >
                      <FiSettings className="w-4 h-4" />
                      Settings
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="search-input">
              <FiSearch className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default UserHeader;
