import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiAlertCircle, FiX } from "react-icons/fi";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const borderColor =
    type === "success" ? "border-green-200" : "border-red-200";
  const textColor = type === "success" ? "text-green-700" : "text-red-700";
  const iconColor = type === "success" ? "text-green-600" : "text-red-600";
  const icon = type === "success" ? FiCheck : FiAlertCircle;
  const Icon = icon;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 flex items-center gap-3 rounded-lg border ${borderColor} ${bgColor} px-4 py-3 shadow-lg z-50`}
        >
          <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
          <button
            onClick={onClose}
            className={`ml-2 ${textColor} hover:opacity-70 transition-opacity`}
          >
            <FiX className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
