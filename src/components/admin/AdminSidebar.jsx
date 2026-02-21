// Admin Sidebar - Premium sidebar with gold accents
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiUsers,
  FiImage,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { path: "/admin", label: "Overview", icon: FiGrid },
  { path: "/admin/users", label: "Users", icon: FiUsers },
  { path: "/admin/memories", label: "Memories", icon: FiImage },
  { path: "/admin/analytics", label: "Analytics", icon: FiBarChart2 },
];

const AdminSidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <Link
        to="/"
        className="p-6 flex items-center gap-3 cursor-pointer hover:opacity-90"
        onClick={onMobileClose}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <h1 className="text-lg font-bold text-[var(--color-text-primary)] whitespace-nowrap">
                Memona
              </h1>
              <p className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">
                Admin Panel
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onMobileClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
              isActive(item.path)
                ? "bg-gradient-to-r from-amber-50 to-amber-100/50 text-[var(--color-accent-gold-dark)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-bg)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {isActive(item.path) && (
              <motion.div
                layoutId="adminActiveIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--color-accent-gold)] rounded-r-full"
              />
            )}
            <item.icon
              className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? "text-[var(--color-accent-gold)]" : ""}`}
            />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-semibold whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Footer - User Info & Logout */}
      <div className="p-4 border-t border-[var(--color-surface-border)] space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
            <span className="text-sm font-semibold text-stone-600">A</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-semibold text-[var(--color-text-primary)] whitespace-nowrap">
                  Admin
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">
                  Super Admin
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--color-text-secondary)] hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse Toggle - Desktop Only */}
      <button
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[var(--color-surface-bg)] border border-[var(--color-surface-border)] rounded-full items-center justify-center shadow-sm hover:bg-stone-100 transition-colors"
      >
        {collapsed ? (
          <FiChevronRight className="w-4 h-4 text-[var(--color-text-secondary)]" />
        ) : (
          <FiChevronLeft className="w-4 h-4 text-[var(--color-text-secondary)]" />
        )}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${mobileOpen ? "block" : "hidden"}`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onMobileClose}
        />
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: mobileOpen ? 0 : -280 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute left-0 top-0 bottom-0 w-72 bg-[var(--color-surface-bg)] border-r border-[var(--color-surface-border)] shadow-xl"
        >
          <button
            onClick={onMobileClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-stone-100 transition-colors lg:hidden"
          >
            <FiX className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
          {sidebarContent}
        </motion.aside>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 bg-[var(--color-surface-bg)] border-r border-[var(--color-surface-border)] z-40 flex-col"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
