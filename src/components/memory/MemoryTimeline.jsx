
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronRight, FiCalendar } from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';
import MemoryCard from './MemoryCard';

const MemoryTimeline = ({ 
  timelineData, 
  onEditMemory, 
  onDeleteMemory, 
  onToggleFavorite,
  showYear = true 
}) => {
  const [expandedYears, setExpandedYears] = useState({});

  const toggleYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (!timelineData || Object.keys(timelineData).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <FiCalendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No memories yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Start capturing your precious moments and they'll appear here on your timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(timelineData).map(([year, monthsData]) => (
        <div key={year} className="relative">
          {/* Year Header */}
          {showYear && (
            <motion.div
              initial={false}
              onClick={() => toggleYear(year)}
              className="flex items-center gap-3 mb-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/70 transition-colors">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {year.slice(2)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {year}
              </h2>
              <motion.div
                animate={{ rotate: expandedYears[year] !== false ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            </motion.div>
          )}

          {/* Months */}
          <AnimatePresence>
            {(!showYear || expandedYears[year] !== false) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 pl-4 border-l-2 border-gray-200 dark:border-gray-700 ml-5"
              >
                {months.map((month) => {
                  const memories = monthsData[month];
                  if (!memories || memories.length === 0) return null;

                  return (
                    <div key={month} className="relative">
                      {/* Month Label */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-900/50" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {month}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {memories.length} {memories.length === 1 ? 'memory' : 'memories'}
                        </span>
                      </div>

                      {/* Memories Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
                        {memories.map((memory, index) => (
                          <motion.div
                            key={memory._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <MemoryCard
                              memory={memory}
                              onEdit={onEditMemory}
                              onDelete={onDeleteMemory}
                              onToggleFavorite={onToggleFavorite}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default MemoryTimeline;

