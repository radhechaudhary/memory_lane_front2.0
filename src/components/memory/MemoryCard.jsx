import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShare2,
  FiMoreVertical,
  FiMapPin,
  FiCalendar,
  FiImage,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiDownload,
} from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";

const MemoryCard = ({
  memory,
  onEdit,
  onDelete,
  onToggleFavorite,
  onShare,
  showActions = true,
  variant = "default", // 'default', 'compact', 'featured'
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const mainMedia =
    memory.media?.find((m) => m.type === "image") || memory.media?.[0];
  const mainImage = mainMedia?.type === "image" ? mainMedia : null;
  const isMilestone = memory.isMilestone;
  const canDownload = Boolean(mainMedia?.url);
  const albumId =
    memory.album_id ||
    memory.albumId ||
    memory.album?.id ||
    memory.album?._id ||
    null;
  const isAlbumUploadedMemory =
    Boolean(albumId) ||
    /^uploaded from album/i.test(String(memory.description || "").trim());
  const contentLink = albumId
    ? `/albums/${albumId}`
    : isAlbumUploadedMemory
      ? "/albums"
      : `/memory/${memory._id}`;

  const variants = {
    default: "",
    compact: "flex-row",
    featured: "col-span-2 row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`
        group bg-white rounded-2xl overflow-hidden 
        border border-stone-100 shadow-sm hover:shadow-xl 
        transition-all duration-300
        ${variants[variant]}
        ${isMilestone ? "ring-2 ring-amber-200" : ""}
      `}
    >
      {/* Image */}
      <div
        className={`relative aspect-[4/3] overflow-hidden ${isAlbumUploadedMemory ? "cursor-pointer" : "cursor-zoom-in"}`}
        onClick={() => {
          if (albumId) {
            navigate(`/albums/${albumId}`);
            return;
          }

          if (isAlbumUploadedMemory) {
            navigate("/albums");
            return;
          }

          if (mainMedia?.url) {
            setShowPreview(true);
          }
        }}
      >
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center">
            <FiImage className="w-12 h-12 text-amber-300" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Milestone Badge */}
        {isMilestone && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
            <FiStar className="w-3 h-3" />
            Milestone
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.(memory._id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <FiHeart
            className={`w-4 h-4 ${memory.isFavorite ? "text-red-500 fill-current" : "text-stone-600"}`}
          />
        </button>

        {/* Actions Menu */}
        {showActions && (
          <div className="absolute bottom-3 right-3 opacity-100 transition-opacity duration-300 z-20">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
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
                  className="absolute right-0 bottom-full mb-2 w-44 bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden z-30"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEdit?.(memory);
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
                      e.stopPropagation();
                      onShare?.(memory);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
                  >
                    <FiShare2 className="w-4 h-4" />
                    Share
                  </button>
                  {(albumId || isAlbumUploadedMemory) && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (albumId) {
                          navigate(`/albums/${albumId}`);
                        } else {
                          navigate("/albums");
                        }
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      <FiImage className="w-4 h-4" />
                      {albumId ? "Open Album" : "Open Albums"}
                    </button>
                  )}
                  {canDownload && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const link = document.createElement("a");
                        link.href = mainMedia.url;
                        link.download = `${memory.title || "memory"}`;
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      <FiDownload className="w-4 h-4" />
                      Download
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete?.(memory._id);
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

        {/* Media Count */}
        {memory.media?.length > 0 && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 rounded-full text-white text-xs flex items-center gap-1">
            <FiImage className="w-3 h-3" />
            {memory.media.length}
          </div>
        )}
      </div>

      {/* Content */}
      <Link to={contentLink} className="block p-4">
        <h3 className="font-semibold text-stone-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {memory.title}
        </h3>

        {memory.description && (
          <p className="text-sm text-stone-600 mb-3 line-clamp-2">
            {memory.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <FiCalendar className="w-3.5 h-3.5" />
            {formatDate(memory.date)}
          </div>

          {memory.location?.name && (
            <div className="flex items-center gap-1">
              <FiMapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[100px]">
                {memory.location.name}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {memory.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {memory.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
            {memory.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-stone-400">
                +{memory.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </Link>

      {showPreview && mainMedia?.url ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="max-h-full max-w-5xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            {mainMedia.type === "image" ? (
              <img
                src={mainMedia.url}
                alt={memory.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
            ) : mainMedia.type === "video" ? (
              <video
                src={mainMedia.url}
                className="w-full max-h-[85vh] rounded-xl"
                controls
              />
            ) : (
              <audio src={mainMedia.url} className="w-full" controls />
            )}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};

export default MemoryCard;
