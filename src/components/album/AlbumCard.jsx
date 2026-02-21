import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiImage, FiMoreVertical, FiEdit2, FiTrash2, FiShare2, FiLock } from 'react-icons/fi';
import { useState } from 'react';

const AlbumCard = ({ 
  album, 
  onEdit, 
  onDelete, 
  onShare,
  showActions = true 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const coverImage = album.memories?.[0]?.media?.find(m => m.type === 'image')?.url ||
    album.coverImage ||
    null;

  const memoryCount = album.memories?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      {/* Cover Image */}
      <Link to={`/albums/${album._id}`} className="block relative aspect-[4/3] overflow-hidden">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={album.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
            <FiImage className="w-12 h-12 text-indigo-300 dark:text-indigo-600" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Privacy Badge */}
        {album.isPrivate && (
          <div className="absolute top-3 left-3 p-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
            <FiLock className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          </div>
        )}

        {/* Memory Count */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-sm font-medium text-white">
          {memoryCount} {memoryCount === 1 ? 'memory' : 'memories'}
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                      onEdit?.(album);
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
                      onShare?.(album);
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
                      onDelete?.(album._id);
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
      </Link>

      {/* Content */}
      <Link to={`/albums/${album._id}`} className="block p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {album.name}
        </h3>
        
        {album.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {album.description}
          </p>
        )}

        {/* Tags */}
        {album.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {album.tags.slice(0, 3).map((tag, index) => (
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

export default AlbumCard;

