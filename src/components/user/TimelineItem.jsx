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
  FiStar,
} from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";

const TimelineItem = ({
  memory,
  index,
  onEdit,
  onDelete,
  onToggleFavorite,
  onShare,
  alignment = "left", // 'left' or 'right'
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const mainImage = memory.media?.find((m) => m.type === "image");
  const isMilestone = memory.isMilestone;
  const albumId =
    memory.album_id ||
    memory.albumId ||
    memory.album?.id ||
    memory.album?._id ||
    null;
  const contentLink = albumId ? `/albums/${albumId}` : `/memory/${memory._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative flex gap-6 mb-12
        ${alignment === "right" ? "flex-row-reverse" : ""}
        lg:flex-row
      `}
    >
      {/* Timeline Line */}
      <div className="hidden lg:block absolute left-[19px] top-10 bottom-[-50px] w-0.5 bg-stone-200" />

      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div
          className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${
            isMilestone
              ? "bg-gradient-to-br from-amber-400 to-amber-500"
              : "bg-gradient-to-br from-amber-300 to-amber-400"
          }
          ${isMilestone ? "shadow-[0_0_0_4px_rgba(244,180,0,0.2)]" : ""}
        `}
        >
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
        {isMilestone && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
            <FiStar className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>

      {/* Content Card */}
      <div
        className={`
        flex-1 max-w-xl
        ${alignment === "right" ? "text-right" : "text-left"}
      `}
      >
        {/* Date and Time Row */}
        <div className="mb-3 flex w-full items-center justify-between rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-600">
          <div className="inline-flex items-center gap-2">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>{formatDate(memory.date, "short")}</span>
            {isMilestone && (
              <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Milestone
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-stone-500">
            {formatDate(memory.date, "time")}
          </span>
        </div>

        {/* Memory Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className={`
            group bg-white rounded-2xl overflow-hidden
            border border-stone-100 shadow-sm hover:shadow-lg
            transition-all duration-300
            ${isMilestone ? "ring-2 ring-amber-200" : ""}
          `}
        >
          {/* Image */}
          <div
            className="relative aspect-[16/9] overflow-hidden cursor-pointer"
            onClick={() => navigate(contentLink)}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

            {/* Media Count */}
            {memory.media?.length > 0 && (
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 rounded-full text-white text-xs flex items-center gap-1">
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

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
              {memory.location?.name && (
                <div className="flex items-center gap-1">
                  <FiMapPin className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[100px]">
                    {memory.location.name}
                  </span>
                </div>
              )}

              {/* Tags */}
              {memory.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {memory.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {memory.tags.length > 2 && (
                    <span className="text-stone-400">
                      +{memory.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
