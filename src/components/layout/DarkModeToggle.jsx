import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useDarkMode } from '../../hooks/useDarkMode';

const DarkModeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative p-3 rounded-xl
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-colors duration-200
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiSun className="w-5 h-5 text-amber-500" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiMoon className="w-5 h-5 text-indigo-400" />
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;

