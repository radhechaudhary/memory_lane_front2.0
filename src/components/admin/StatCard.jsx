// StatCard - Premium stats card component with gold accent
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, delay = 0 }) => {
  const isPositiveTrend = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl border border-[var(--color-surface-border)] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center group-hover:from-amber-100 group-hover:to-amber-150 transition-colors">
              <Icon className="w-6 h-6 text-[var(--color-accent-gold)]" />
            </div>
            {trend && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                isPositiveTrend 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'bg-rose-50 text-rose-600'
              }`}>
                <span>{isPositiveTrend ? '↑' : '↓'}</span>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
            {title}
          </h3>
          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
            {value}
          </p>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="mt-4 pt-4 border-t border-[var(--color-surface-border)]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-secondary)]">vs last month</span>
          <span className={`font-medium ${isPositiveTrend ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositiveTrend ? '+' : '-'}{trendValue}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;

