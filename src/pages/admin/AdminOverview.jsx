// AdminOverview - Overview page with stats cards
import { motion } from 'framer-motion';
import { FiUsers, FiImage, FiFolder, FiGlobe } from 'react-icons/fi';
import StatCard from '../../components/admin/StatCard';

const stats = [
  { 
    title: 'Total Users', 
    value: '1,247', 
    icon: FiUsers, 
    trend: 'up', 
    trendValue: '12.5%',
    delay: 0 
  },
  { 
    title: 'Total Memories', 
    value: '8,934', 
    icon: FiImage, 
    trend: 'up', 
    trendValue: '8.2%',
    delay: 0.1 
  },
  { 
    title: 'Active Albums', 
    value: '456', 
    icon: FiFolder, 
    trend: 'up', 
    trendValue: '5.4%',
    delay: 0.2 
  },
  { 
    title: 'Public Memories', 
    value: '2,871', 
    icon: FiGlobe, 
    trend: 'up', 
    trendValue: '15.3%',
    delay: 0.3 
  },
];

// Mock recent activity data
const recentActivity = [
  { id: 1, user: 'Sarah Johnson', action: 'created a new memory', time: '2 minutes ago', type: 'memory' },
  { id: 2, user: 'Michael Chen', action: 'shared an album', time: '15 minutes ago', type: 'share' },
  { id: 3, user: 'Emma Williams', action: 'added 5 photos', time: '1 hour ago', type: 'upload' },
  { id: 4, user: 'James Brown', action: 'updated profile', time: '2 hours ago', type: 'profile' },
  { id: 5, user: 'Lisa Anderson', action: 'created milestone', time: '3 hours ago', type: 'milestone' },
];

const AdminOverview = () => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl border border-[var(--color-surface-border)] hover:border-[var(--color-accent-gold)] hover:bg-amber-50/50 transition-all group text-left">
              <FiUsers className="w-6 h-6 text-[var(--color-accent-gold)] mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-[var(--color-text-primary)]">Add User</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Create new account</p>
            </button>
            <button className="p-4 rounded-xl border border-[var(--color-surface-border)] hover:border-[var(--color-accent-gold)] hover:bg-amber-50/50 transition-all group text-left">
              <FiImage className="w-6 h-6 text-[var(--color-accent-gold)] mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-[var(--color-text-primary)]">View Reports</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Check flagged content</p>
            </button>
            <button className="p-4 rounded-xl border border-[var(--color-surface-border)] hover:border-[var(--color-accent-gold)] hover:bg-amber-50/50 transition-all group text-left">
              <FiFolder className="w-6 h-6 text-[var(--color-accent-gold)] mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-[var(--color-text-primary)]">Manage Albums</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Organize content</p>
            </button>
            <button className="p-4 rounded-xl border border-[var(--color-surface-border)] hover:border-[var(--color-accent-gold)] hover:bg-amber-50/50 transition-all group text-left">
              <FiGlobe className="w-6 h-6 text-[var(--color-accent-gold)] mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-[var(--color-text-primary)]">System Status</p>
              <p className="text-xs text-[var(--color-text-secondary)]">View health metrics</p>
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
        >
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-amber-700">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
      >
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
          System Health
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-700">Server Status</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">Operational</p>
            <p className="text-xs text-emerald-600/70">99.9% uptime</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-semibold text-amber-700">Storage</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">67%</p>
            <p className="text-xs text-amber-600/70">134GB / 200GB used</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-semibold text-blue-700">API Response</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">142ms</p>
            <p className="text-xs text-blue-600/70">Average response time</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;

