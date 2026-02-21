import { useState } from 'react';
import { motion } from 'framer-motion';
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';

const UserLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
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
          marginLeft: sidebarCollapsed ? 80 : 280
        }}
        className="transition-all duration-300 min-h-screen"
      >
        {/* Header */}
        <UserHeader 
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
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

