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
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
    >
      {/* Cover Image */}
      <Link to={`/albums/${album._id}`} className="block relative aspect-[4/3] overflow-hidden album-cover">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={album.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center">
            <FiImage className="w-12 h-12 text-amber-300" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Privacy Badge */}
        {album.isPrivate && (
          <div className="absolute top-3 left-3 p-1.5 rounded-full bg-white/90 backdrop-blur-sm">
            <FiLock className="w-3 h-3 text-stone-600" />
          </div>
        )}

        {/* Memory Count */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-amber-500 rounded-full text-sm font-medium text-white">
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
                className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
              >
                <FiMoreVertical className="w-4 h-4 text-stone-700" />
              </button>

              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden z-10"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit?.(album);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
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
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
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
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
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
        <h3 className="font-semibold text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">
          {album.name}
        </h3>
        
        {album.description && (
          <p className="text-sm text-stone-600 line-clamp-2">
            {album.description}
          </p>
        )}

        {/* Tags */}
        {album.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {album.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs"
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

