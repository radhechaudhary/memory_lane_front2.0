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
  const [showPreview, setShowPreview] = useState(false);

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
    <>
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
        <div className="hidden lg:block absolute left-[19px] top-10 bottom-[-50px] w-0.5 bg-[var(--color-surface-border)]" />

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

        {/* Content Card container */}
        <div
          className={`
        flex-1 max-w-lg
        ${alignment === "right" ? "text-right" : "text-left"}
      `}
        >
          {/* Date and Time Row */}
          <div className="mb-2 flex w-fit items-center gap-4 rounded-full bg-[var(--color-surface-bg)]/80 px-4 py-1 text-xs text-[var(--color-text-secondary)] backdrop-blur-sm border border-[var(--color-surface-border)]">
            <div className="inline-flex items-center gap-1.5">
              <FiCalendar className="w-3 h-3 text-amber-600" />
              <span className="font-semibold">
                {formatDate(memory.date, "short")}
              </span>
              {isMilestone && (
                <span className="ml-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  MILESTONE
                </span>
              )}
            </div>
            <div className="w-px h-3 bg-[var(--color-surface-border)]" />
            <span className="text-[10px] font-medium text-stone-500 tabular-nums">
              {formatDate(memory.date, "time")}
            </span>
          </div>

          {/* Memory Card */}
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className={`
            group bg-[var(--color-surface-bg)] rounded-xl overflow-hidden
            border border-[var(--color-surface-border)] shadow-sm hover:shadow-md
            transition-all duration-300
            ${isMilestone ? "ring-1 ring-accent-gold/30" : ""}
          `}
          >
            {/* Split Layout: Image & Text side by side on desktop */}
            <div className="flex flex-col sm:flex-row h-full">
              {/* Image Container */}
              <div
                className="relative w-full sm:w-40 md:w-48 aspect-video sm:aspect-square flex-shrink-0 overflow-hidden cursor-pointer"
                onClick={() => mainImage?.url && setShowPreview(true)}
              >
                {mainImage ? (
                  <img
                    src={mainImage.url}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-amber-50 flex items-center justify-center">
                    <FiImage className="w-8 h-8 text-amber-200" />
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text Content */}
              <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <Link to={contentLink} className="block group/title">
                      <h3 className="font-bold text-[var(--color-text-primary)] text-sm md:text-base line-clamp-1 group-hover/title:text-amber-600 transition-colors">
                        {memory.title}
                      </h3>
                    </Link>

                    {/* Actions */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleFavorite?.(memory._id);
                      }}
                      className="p-1.5 rounded-full hover:bg-[var(--color-page-bg)] transition-colors"
                    >
                      <FiHeart
                        className={`w-3.5 h-3.5 ${memory.isFavorite ? "text-rose-500 fill-current" : "text-stone-400 hover:text-rose-500"}`}
                      />
                    </button>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[var(--color-text-secondary)] mt-1">
                    {memory.location?.name && (
                      <div className="flex items-center gap-1 bg-[var(--color-page-bg)] px-2 py-0.5 rounded-md border border-[var(--color-surface-border)]">
                        <FiMapPin className="w-3 h-3 text-amber-500" />
                        <span className="truncate max-w-[120px] font-medium text-[var(--color-text-primary)]">
                          {memory.location.name}
                        </span>
                      </div>
                    )}

                    {memory.media?.length > 1 && (
                      <div className="flex items-center gap-1 text-stone-400">
                        <FiImage className="w-3 h-3" />
                        <span>+{memory.media.length - 1} more</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags Tray */}
                {memory.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {memory.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[var(--color-page-bg)] text-[var(--color-text-secondary)] border border-[var(--color-surface-border)] rounded-md text-[10px] font-medium hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 hover:border-amber-100 transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {showPreview && mainImage?.url ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-6 backdrop-blur-md"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="max-h-full max-w-5xl w-full flex flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              className="fixed top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md z-[10000]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={mainImage.url}
              alt={memory.title}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {memory.title && (
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-medium">
                  {memory.title}
                </h3>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TimelineItem;
