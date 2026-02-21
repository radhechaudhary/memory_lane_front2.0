import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const Loader = ({ 
  size = 'md', 
  color = 'primary',
  text = '',
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-indigo-600 dark:text-indigo-400',
    white: 'text-white',
    gray: 'text-gray-600 dark:text-gray-400'
  };

  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
      className={`${sizeClasses[size]} ${colorClasses[color]}`}
    >
      <FiLoader className="w-full h-full" />
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          {text && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {spinner}
      {text && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>
      )}
    </div>
  );
};

// Dots loader for inline loading
export const DotsLoader = ({ size = 'md', color = 'primary' }) => {
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    primary: 'bg-indigo-600 dark:bg-indigo-400',
    white: 'bg-white',
    gray: 'bg-gray-600 dark:bg-gray-400'
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1
          }}
          className={`${dotSizes[size]} ${colorClasses[color]} rounded-full`}
        />
      ))}
    </div>
  );
};

// Skeleton loader for content loading
export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const variants = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    text: 'rounded h-4'
  };

  return (
    <div 
      className={`
        animate-pulse bg-gray-200 dark:bg-gray-700 
        ${variants[variant]} ${className}
      `}
    />
  );
};

export default Loader;

