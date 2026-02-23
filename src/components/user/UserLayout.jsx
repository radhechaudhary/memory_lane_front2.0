import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";

const UserLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)]">
      {/* Background Orbs for premium feel */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="premium-bg-orb premium-bg-orb-a" />
        <div className="premium-bg-orb premium-bg-orb-b" />
      </div>

      {/* Sidebar */}
      <UserSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <motion.div
        initial={false}
        animate={{
          marginLeft: isLargeScreen ? (sidebarCollapsed ? 80 : 280) : 0,
        }}
        className="transition-all duration-300 min-h-screen"
      >
        {/* Header */}
        <UserHeader
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </motion.div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default UserLayout;
