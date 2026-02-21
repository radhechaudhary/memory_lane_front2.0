import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiClock,
  FiImage,
  FiMapPin,
  FiStar,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiUser,
  FiShield,
  FiPlus,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ onAddMemory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/timeline", label: "Timeline", icon: FiClock },
    { path: "/albums", label: "Albums", icon: FiImage },
    { path: "/milestones", label: "Milestones", icon: FiStar },
    { path: "/map", label: "Map", icon: FiMapPin },
    { path: "/shared", label: "Shared", icon: FiUsers },
  ];

  const isActive = (path) => location.pathname === path;
  const roleLabel = user?.role === "admin" ? "Admin" : "User";
  const RoleIcon = user?.role === "admin" ? FiShield : FiUser;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 -ml-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="hidden text-xl font-bold text-stone-900 sm:block">
              Memona
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  text-sm font-medium transition-colors
                  ${
                    isActive(link.path)
                      ? "bg-amber-100 text-amber-800"
                      : "text-stone-600 hover:bg-stone-100"
                  }
                `}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Add Memory Button */}
            <motion.button
              onClick={onAddMemory}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Add Memory
            </motion.button>

            <div className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 sm:flex">
              <RoleIcon className="h-4 w-4 text-amber-700" />
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                {roleLabel}
              </span>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileMenuOpen((prev) => !prev);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-stone-100"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-medium text-sm">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1rem)] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg"
                  >
                    <div className="border-b border-stone-200 px-4 py-3">
                      <p className="text-sm font-medium text-stone-900">
                        {user?.name || user?.username}
                      </p>
                      <p className="text-xs text-stone-500">{user?.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5">
                        <RoleIcon className="h-3.5 w-3.5 text-amber-700" />
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                          {roleLabel}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
                      >
                        <FiUser className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
                      >
                        <FiSettings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={async () => {
                          setIsProfileMenuOpen(false);
                          await handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
                setIsProfileMenuOpen(false);
              }}
              className="rounded-lg p-2 hover:bg-stone-100 md:hidden"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6 text-stone-600" />
              ) : (
                <FiMenu className="h-6 w-6 text-stone-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-stone-200 bg-white md:hidden"
          >
            <div className="px-4 py-3 space-y-1">
              <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5">
                <RoleIcon className="h-3.5 w-3.5 text-amber-700" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                  {roleLabel}
                </span>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    font-medium transition-colors
                    ${
                      isActive(link.path)
                        ? "bg-amber-100 text-amber-800"
                        : "text-stone-600"
                    }
                  `}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  onAddMemory?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 rounded-lg bg-amber-50 px-4 py-3 font-medium text-amber-800"
              >
                <FiPlus className="w-5 h-5" />
                Add Memory
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
