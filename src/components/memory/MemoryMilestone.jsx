import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiStar, FiCalendar, FiChevronRight } from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";

const MemoryMilestone = ({
  milestone,
  onClick,
  variant = "default", // 'default', 'compact', 'featured'
}) => {
  const memoriesCount = milestone.memories?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
        shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1
        border border-gray-100 dark:border-gray-700
        ${variant === "featured" ? "col-span-2" : ""}
      `}
    >
      <Link
        to={`/milestones/${milestone._id}`}
        onClick={onClick}
        className="block"
      >
        {/* Banner Image */}
        {milestone.coverImage && (
          <div className="relative aspect-[3/1] overflow-hidden">
            <img
              src={milestone.coverImage}
              alt={milestone.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`
              w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
              ${variant === "featured" ? "w-16 h-16" : ""}
              ${
                milestone.isCompleted
                  ? "bg-gradient-to-br from-amber-400 to-orange-500"
                  : "bg-gradient-to-br from-indigo-500 to-purple-600"
              }
            `}
            >
              <FiStar
                className={`text-white ${variant === "featured" ? "w-8 h-8" : "w-6 h-6"}`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {milestone.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                {milestone.description}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              {formatDate(milestone.date)}
            </div>

            {milestone.targetDate && (
              <div className="flex items-center gap-1">
                <span className="text-xs">Target:</span>
                {formatDate(milestone.targetDate)}
              </div>
            )}
          </div>

          {/* Progress */}
          {milestone.targetCount && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {memoriesCount} / {milestone.targetCount} memories
                </span>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {Math.round((memoriesCount / milestone.targetCount) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (memoriesCount / milestone.targetCount) * 100)}%`,
                  }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex -space-x-2">
              {milestone.memories?.slice(0, 3).map((memory, index) => {
                const image = memory.media?.find((m) => m.type === "image");
                return image ? (
                  <img
                    key={index}
                    src={image.url}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                ) : null;
              })}
              {memoriesCount > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  +{memoriesCount - 3}
                </div>
              )}
            </div>

            <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MemoryMilestone;
