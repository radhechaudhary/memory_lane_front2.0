import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';

const ReminisceButton = ({ 
  memories = [], 
  onClose,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMemory = memories[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  if (!currentMemory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`
          fixed bottom-6 right-6 z-50 w-96 
          bg-white dark:bg-gray-800 rounded-2xl 
          shadow-2xl border border-gray-200 dark:border-gray-700
          overflow-hidden
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center gap-2 text-white">
            <FiStar className="w-5 h-5" />
            <span className="font-medium">Reminisce</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Memory Content */}
        <div className="p-4">
          {/* Image */}
          {currentMemory.media?.[0]?.type === 'image' && (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
              <img
                src={currentMemory.media[0].url}
                alt={currentMemory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs opacity-80">{formatDate(currentMemory.date)}</p>
              </div>
            </div>
          )}

          {/* Title & Description */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {currentMemory.title}
          </h3>
          
          {currentMemory.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {currentMemory.description}
            </p>
          )}

          {/* Emotions */}
          {currentMemory.emotions?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {currentMemory.emotions.map((emotion, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                >
                  {emotion}
                </span>
              ))}
            </div>
          )}

          {/* Location */}
          {currentMemory.location?.name && (
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
              <span>📍</span>
              {currentMemory.location.name}
            </p>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1} / {memories.length}
            </span>
            
            <button
              onClick={handleNext}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReminisceButton;

