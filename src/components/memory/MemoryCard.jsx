import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHeart, FiShare2, FiMoreVertical, FiMapPin, 
  FiCalendar, FiImage, FiEdit2, FiTrash2
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';
import { MEMORY_CATEGORIES, EMOTIONS } from '../../utils/constants';

const MemoryCard = ({ 
  memory, 
  onEdit, 
  onDelete, 
  onToggleFavorite,
  onShare,
  showActions = true,
  variant = 'default' // 'default', 'compact', 'featured'
}) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const mainImage = memory.media?.find(m => m.type === 'image');
  const category = MEMORY_CATEGORIES.find(c => c.value === memory.category);
  
  const variants = {
    default: '',
    compact: 'flex-row',
    featured: 'col-span-2 row-span-2'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`
        group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
        shadow-sm hover:shadow-lg transition-shadow duration-300
        border border-gray-100 dark:border-gray-700
        ${variants[variant]}
      `}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {mainImage ? (
          <img 
            src={mainImage.url} 
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
            <FiImage className="w-12 h-12 text-indigo-300 dark:text-indigo-600" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
            {category.icon} {category.label}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(memory._id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <FiHeart 
            className={`w-4 h-4 ${memory.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} 
          />
        </button>

        {/* Actions Menu */}
        {showActions && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}
                className="p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <FiMoreVertical className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>

              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit?.(memory);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onShare?.(memory);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiShare2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete?.(memory._id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Delete
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <Link to={`/memory/${memory._id}`} className="block p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {memory.title}
        </h3>

        {memory.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {memory.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiCalendar className="w-3.5 h-3.5" />
            {formatDate(memory.date)}
          </div>
          
          {memory.location?.name && (
            <div className="flex items-center gap-1">
              <FiMapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[100px]">{memory.location.name}</span>
            </div>
          )}

          {memory.media?.length > 0 && (
            <div className="flex items-center gap-1">
              <FiImage className="w-3.5 h-3.5" />
              {memory.media.length}
            </div>
          )}
        </div>

        {/* Emotions */}
        {memory.emotions?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {memory.emotions.slice(0, 3).map((emotion, index) => {
              const emotionData = EMOTIONS.find(e => e.value === emotion);
              return emotionData ? (
                <span 
                  key={index}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                >
                  {emotionData.icon}
                </span>
              ) : null;
            })}
            {memory.emotions.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-500">
                +{memory.emotions.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {memory.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {memory.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default MemoryCard;

