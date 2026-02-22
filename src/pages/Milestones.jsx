import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiStar, FiTarget, FiCheck } from "react-icons/fi";
import { useMemory } from "../context/MemoryContext";
import MemoryMilestone from "../components/memory/MemoryMilestone";
import Modal from "../components/shared/Modal";
import SearchBar from "../components/shared/SearchBar";
import { formatDateForInput } from "../utils/formatDate";
import Loader from "../components/shared/Loader";

const Milestones = () => {
  const {
    milestones,
    loading,
    fetchMilestones,
    createMilestone,
    updateMilestone,
    deleteMilestone,
  } = useMemory();
  const [showForm, setShowForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: formatDateForInput(new Date()),
    targetDate: "",
    targetCount: 10,
    isPrivate: false,
  });

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones]);

  const normalizeSearchText = (value) => String(value || "").toLowerCase();

  const filteredMilestones = searchQuery
    ? milestones.filter(
        (m) =>
          normalizeSearchText(m.title).includes(
            normalizeSearchText(searchQuery),
          ) ||
          normalizeSearchText(m.description).includes(
            normalizeSearchText(searchQuery),
          ),
      )
    : milestones;

  const handleEdit = (milestone) => {
    setEditingMilestone(milestone);
    setFormData({
      title: milestone.title,
      description: milestone.description || "",
      date: formatDateForInput(milestone.date),
      targetDate: milestone.targetDate
        ? formatDateForInput(milestone.targetDate)
        : "",
      targetCount: milestone.targetCount || 10,
      isPrivate: milestone.isPrivate || false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      await deleteMilestone(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingMilestone) {
      await updateMilestone(editingMilestone._id, formData);
    } else {
      await createMilestone(formData);
    }
    setShowForm(false);
    setEditingMilestone(null);
    setFormData({
      title: "",
      description: "",
      date: formatDateForInput(new Date()),
      targetDate: "",
      targetCount: 10,
      isPrivate: false,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" text="Loading milestones..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Milestones</h1>
          <p className="text-stone-500">
            Track your achievements and special moments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            placeholder="Search milestones..."
            onSearch={setSearchQuery}
            className="w-64"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingMilestone(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 rounded-xl font-semibold text-sm hover:from-amber-500 hover:to-amber-600 transition-all"
          >
            <FiPlus className="w-5 h-5" />
            Create Milestone
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <FiStar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">
                {milestones.length}
              </p>
              <p className="text-sm text-stone-500">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <FiCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">
                {milestones.filter((m) => m.isCompleted).length}
              </p>
              <p className="text-sm text-stone-500">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {milestones.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <FiStar className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-stone-900 mb-2">
            No milestones yet
          </h3>
          <p className="text-stone-500 max-w-md mb-6">
            Create milestones to track your achievements and special moments.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-gold">
            Create Your First Milestone
          </button>
        </div>
      ) : searchQuery && filteredMilestones.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-500">
            No milestones found for "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMilestones.map((milestone) => (
            <MemoryMilestone
              key={milestone._id}
              milestone={milestone}
              onClick={() => handleEdit(milestone)}
            />
          ))}
        </div>
      )}

      {/* Milestone Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingMilestone(null);
        }}
        title={editingMilestone ? "Edit Milestone" : "Create Milestone"}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-transparent bg-stone-50 text-stone-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              placeholder="Milestone title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-transparent bg-stone-50 text-stone-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none"
              placeholder="Describe this milestone..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border-2 border-transparent bg-stone-50 text-stone-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={formData.targetDate}
                onChange={(e) =>
                  setFormData({ ...formData, targetDate: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border-2 border-transparent bg-stone-50 text-stone-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Target Memories
            </label>
            <input
              type="number"
              min="1"
              value={formData.targetCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetCount: parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border-2 border-transparent bg-stone-50 text-stone-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingMilestone(null);
              }}
              className="px-6 py-2.5 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 rounded-xl font-semibold transition-colors"
            >
              {editingMilestone ? "Update" : "Create"} Milestone
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Milestones;
