import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronRight,
  FiChevronLeft,
  FiRefreshCw,
  FiSave,
} from "react-icons/fi";
import Modal from "../shared/Modal";
import { getReflectionPrompts } from "../../utils/milestoneUtils";

const ReflectionPromptModal = ({
  isOpen,
  onClose,
  milestone,
  onSaveReflection,
}) => {
  const prompts = getReflectionPrompts(milestone?.type) || [];
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [reflection, setReflection] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!milestone || prompts.length === 0) return null;

  const currentPrompt = prompts[currentPromptIndex];

  const handleNextPrompt = () => {
    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setReflection("");
    }
  };

  const handlePrevPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
      setReflection("");
    }
  };

  const handleRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setCurrentPromptIndex(randomIndex);
    setReflection("");
  };

  const handleSave = async () => {
    if (!reflection.trim()) {
      alert("Please write your reflection before saving");
      return;
    }

    setIsSaving(true);
    try {
      await onSaveReflection({
        milestoneId: milestone._id,
        prompt: currentPrompt,
        reflection: reflection,
        type: milestone.type,
      });

      setReflection("");
      setCurrentPromptIndex(0);
    } catch (error) {
      console.error("Error saving reflection:", error);
      alert("Failed to save reflection. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Reflect on: ${milestone.title}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Milestone Info */}
        <div className="p-4 bg-indigo-50 rounded-xl">
          <p className="text-sm text-indigo-600 font-medium">
            {milestone.type?.replace(/_/g, " ").toUpperCase()}
          </p>
          <p className="text-lg font-semibold text-indigo-900">
            {milestone.title}
          </p>
        </div>

        {/* Prompt */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-stone-600 mb-2">
              Reflection Prompt ({currentPromptIndex + 1} of {prompts.length})
            </p>
            <motion.div
              key={currentPromptIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200"
            >
              <p className="text-lg font-medium text-stone-900">
                {currentPrompt}
              </p>
            </motion.div>
          </div>

          {/* Reflection Input */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Your Reflection
            </label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Take your time... share your thoughts, feelings, and memories..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none transition-all"
            />
            <p className="text-xs text-stone-500 mt-1">
              {reflection.length} characters
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2 pt-4 border-t">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevPrompt}
              disabled={currentPromptIndex === 0}
              className="p-2 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRandomPrompt}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
              title="Get a random prompt"
            >
              <FiRefreshCw className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextPrompt}
              disabled={currentPromptIndex === prompts.length - 1}
              className="p-2 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={!reflection.trim() || isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FiSave className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Reflection"}
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReflectionPromptModal;
