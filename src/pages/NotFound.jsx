import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-page-bg)] dark:bg-[var(--color-dark-page-bg)] px-4 relative overflow-hidden">
      {/* Decorative elements - Light mode */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-200/30 dark:bg-rose-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center"
      >
        {/* 404 Text */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500"
        >
          404
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] mb-4">
            Oops! Page not found
          </h1>
          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-900 rounded-xl font-medium transition-all"
          >
            <FiHome className="w-5 h-5" />
            Go to Dashboard
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--color-surface-bg)] dark:bg-[var(--color-dark-surface-bg)] hover:bg-stone-50 dark:hover:bg-[#2A2A2A] text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] rounded-xl font-medium transition-all border border-[var(--color-surface-border)] dark:border-[var(--color-dark-surface-border)]"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <div className="w-32 h-32 mx-auto bg-[var(--color-surface-bg)] dark:bg-[var(--color-dark-surface-bg)] rounded-full flex items-center justify-center shadow-xl border border-[var(--color-surface-border)] dark:border-[var(--color-dark-surface-border)]">
            <span className="text-6xl">🔍</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;

