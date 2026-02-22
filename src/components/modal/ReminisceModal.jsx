import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiCalendar,
  FiImage,
  FiStar,
} from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";

const ReminisceModal = ({ isOpen, onClose, memories = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset to random memory when opened
  useEffect(() => {
    if (isOpen && memories.length > 0) {
      const randomIndex = Math.floor(Math.random() * memories.length);
      setCurrentIndex(randomIndex);
    }
  }, [isOpen, memories.length]);

  useEffect(() => {
    if (currentIndex >= memories.length && memories.length > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, memories.length]);

  useEffect(() => {
    if (!isOpen || memories.length <= 1) return;

    const autoSlideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 5000);

    return () => clearInterval(autoSlideInterval);
  }, [isOpen, memories.length]);

  const currentMemory = memories[currentIndex];

  const handleNext = () => {
    if (!memories.length) return;
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    if (!memories.length) return;
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  if (!currentMemory) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100"
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <FiStar className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900">
              No memories yet
            </h3>
            <p className="mt-2 text-sm text-stone-600">
              Create your first memory to start reminiscing.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-300"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const mainImage = currentMemory.media?.find((m) => m.type === "image");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <FiX className="w-5 h-5 text-stone-700" />
          </button>

          {/* Hero Image */}
          <div className="relative h-72 sm:h-96 overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={currentMemory.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-amber-300 to-amber-500 flex items-center justify-center">
                <FiStar className="w-16 h-16 text-white" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-amber-500 rounded-full text-xs font-semibold flex items-center gap-1">
                  ✨ Reminisce
                </span>
                {currentMemory.isMilestone && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    Milestone
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {currentMemory.title}
              </h2>

              {/* Date & Location */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  {formatDate(currentMemory.date)}
                </div>
                {currentMemory.location?.name && (
                  <div className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {currentMemory.location.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            {currentMemory.description && (
              <p className="text-stone-600 mb-6 leading-relaxed">
                {currentMemory.description}
              </p>
            )}

            {/* Tags */}
            {currentMemory.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {currentMemory.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Emotions */}
            {currentMemory.emotions?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {currentMemory.emotions.map((emotion, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            )}

            {/* Media Count */}
            {currentMemory.media?.length > 1 && (
              <div className="flex items-center gap-2 text-stone-500 text-sm mb-6">
                <FiImage className="w-4 h-4" />
                {currentMemory.media.length} memories in this moment
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {memories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      w-2 h-2 rounded-full transition-all
                      ${
                        index === currentIndex
                          ? "bg-amber-500 w-6"
                          : "bg-stone-300 hover:bg-stone-400"
                      }
                    `}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Next
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReminisceModal;
