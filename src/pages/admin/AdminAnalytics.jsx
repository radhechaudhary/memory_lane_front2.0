// AdminAnalytics - Analytics page with charts
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiImage, FiDownload, FiCalendar } from 'react-icons/fi';

// Mock data for charts
const monthlyData = [
  { month: 'Jan', users: 120, memories: 450 },
  { month: 'Feb', users: 145, memories: 520 },
  { month: 'Mar', users: 178, memories: 680 },
  { month: 'Apr', users: 195, memories: 720 },
  { month: 'May', users: 230, memories: 890 },
  { month: 'Jun', users: 268, memories: 1020 },
  { month: 'Jul', users: 295, memories: 1150 },
  { month: 'Aug', users: 312, memories: 1280 },
  { month: 'Sep', users: 345, memories: 1420 },
  { month: 'Oct', users: 380, memories: 1580 },
  { month: 'Nov', users: 420, memories: 1720 },
  { month: 'Dec', users: 456, memories: 1890 },
];

const maxUsers = Math.max(...monthlyData.map(d => d.users));
const maxMemories = Math.max(...monthlyData.map(d => d.memories));

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <FiTrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-[var(--color-text-secondary)]">User Growth</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">+280%</p>
          <p className="text-xs text-emerald-600">vs last year</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <FiUsers className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-[var(--color-text-secondary)]">New Users</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">456</p>
          <p className="text-xs text-emerald-600">this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <FiImage className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-[var(--color-text-secondary)]">Memories Created</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">1,890</p>
          <p className="text-xs text-emerald-600">this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <FiDownload className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm text-[var(--color-text-secondary)]">Export Rate</span>
          </div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">12%</p>
          <p className="text-xs text-emerald-600">of users export</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Users Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Monthly Users Growth</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">User registration trends</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
              <FiTrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600">+12.5%</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-64">
            {monthlyData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.users / maxUsers) * 100}%` }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                className="flex-1 relative group"
              >
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-lg group-hover:from-amber-500 group-hover:to-amber-400 transition-colors cursor-pointer" style={{ height: '100%' }}>
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.users} users
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-3">
            {monthlyData.map((data) => (
              <span key={data.month} className="text-xs text-[var(--color-text-secondary)] flex-1 text-center">
                {data.month}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Memories Created Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Memories Created</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Monthly memory uploads</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
              <FiTrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600">+15.3%</span>
            </div>
          </div>

          {/* Area Chart Placeholder */}
          <div className="relative h-64">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-stone-100 w-full" />
              ))}
            </div>

            {/* Simple line visualization using dots */}
            <div className="absolute inset-0 flex items-end justify-between gap-2 pb-6">
              {monthlyData.map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex-1 flex justify-center"
                >
                  <div 
                    className="w-3 h-3 rounded-full bg-[var(--color-accent-gold)] relative group cursor-pointer"
                    style={{ marginBottom: `${(data.memories / maxMemories) * 100}%` }}
                  >
                    {/* Vertical line to x-axis */}
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 bg-amber-200 group-hover:bg-amber-300 transition-colors"
                      style={{ height: '200px' }}
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.memories}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-3">
            {monthlyData.map((data) => (
              <span key={data.month} className="text-xs text-[var(--color-text-secondary)] flex-1 text-center">
                {data.month}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Countries & Device Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Top Countries</h3>
          <div className="space-y-4">
            {[
              { country: 'United States', percentage: 35, flag: '🇺🇸' },
              { country: 'United Kingdom', percentage: 22, flag: '🇬🇧' },
              { country: 'Germany', percentage: 15, flag: '🇩🇪' },
              { country: 'Canada', percentage: 12, flag: '🇨🇦' },
              { country: 'Australia', percentage: 8, flag: '🇦🇺' },
            ].map((item, index) => (
              <div key={item.country} className="flex items-center gap-3">
                <span className="text-xl">{item.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{item.country}</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Device Usage</h3>
          <div className="space-y-4">
            {[
              { device: 'Mobile', percentage: 58, icon: '📱' },
              { device: 'Desktop', percentage: 32, icon: '💻' },
              { device: 'Tablet', percentage: 10, icon: '📲' },
            ].map((item, index) => (
              <div key={item.device} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{item.device}</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-stone-400 to-stone-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar Icon */}
          <div className="mt-6 pt-6 border-t border-[var(--color-surface-border)]">
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
              <FiCalendar className="w-4 h-4" />
              <span>Data updated: December 15, 2024</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

