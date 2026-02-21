import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiClock,
  FiImage,
  FiStar,
  FiMapPin,
  FiPlus,
  FiSun,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useMemory } from "../context/MemoryContext";
import MemoryCard from "../components/memory/MemoryCard";
import MemoryMap from "../components/map/MemoryMap";
import MemoryForm from "../components/memory/MemoryForm";
import ReminisceModal from "../components/modal/ReminisceModal";
import Loader from "../components/shared/Loader";

const Dashboard = () => {
  const { user } = useAuth();
  const {
    memories = [],
    albums = [],
    milestones = [],
    loading,
    fetchMemories,
    createMemory,
    toggleFavorite,
  } = useMemory();
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [showReminisce, setShowReminisce] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMemories();
    }
  }, [user, fetchMemories]);

  // Redirect to login if no user
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  // Get recent memories (last 6)
  const recentMemories = memories.slice(0, 6);

  // Get favorite memories
  const favoriteMemories = memories.filter((m) => m.isFavorite);

  // Get memories with location
  const memoriesWithLocation = memories.filter((m) => m.location?.coordinates);

  const stats = [
    {
      label: "Total Memories",
      value: memories.length,
      icon: FiClock,
      gradient: "from-amber-400 to-amber-500",
      link: "/timeline",
    },
    {
      label: "Albums",
      value: albums.length,
      icon: FiImage,
      gradient: "from-amber-300 to-amber-400",
      link: "/albums",
    },
    {
      label: "Milestones",
      value: milestones.length,
      icon: FiStar,
      gradient: "from-amber-500 to-amber-600",
      link: "/milestones",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" text="Loading your memories..." />
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={item} className="premium-header p-8">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-2">
              Welcome back, {user?.username || "there"}! 👋
            </h1>
            <p className="text-stone-600 text-lg">
              You have{" "}
              <span className="font-semibold text-amber-600">
                {memories.length} memories
              </span>{" "}
              to cherish. Keep preserving your journey!
            </p>
          </div>

          {/* Reminisce Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 30px rgba(244, 180, 0, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowReminisce(true)}
            className="btn-reminisce"
          >
            <FiSun className="w-5 h-5" />
            Reminisce
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {stats.map((stat, index) => (
          <Link key={index} to={stat.link} className="stat-card group">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-sm text-stone-500 font-medium">{stat.label}</p>
          </Link>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Memories */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-900">
              Recent Memories
            </h2>
            <Link
              to="/timeline"
              className="text-amber-600 text-sm font-semibold hover:underline flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          {recentMemories.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {recentMemories.map((memory) => (
                <MemoryCard
                  key={memory._id}
                  memory={memory}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-stone-100">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">
                No memories yet
              </h3>
              <p className="text-stone-500 mb-4">
                Start capturing your precious moments
              </p>
              <button
                onClick={() => setShowMemoryForm(true)}
                className="btn-gold"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Create Your First Memory
              </button>
            </div>
          )}
        </motion.div>

        {/* Sidebar Content */}
        <motion.div variants={item} className="space-y-6">
          {/* Map Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-stone-900">Memory Map</h2>
              <Link
                to="/map"
                className="text-amber-600 text-sm font-semibold hover:underline"
              >
                View Full →
              </Link>
            </div>
            <MemoryMap memories={memoriesWithLocation} height="200px" />
          </div>

          {/* Favorites */}
          <div className="bg-white rounded-2xl p-5 border border-stone-100">
            <div className="flex items-center gap-2 mb-4">
              <FiStar className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-stone-900">Favorites</h3>
            </div>
            {favoriteMemories.length > 0 ? (
              <div className="space-y-3">
                {favoriteMemories.slice(0, 3).map((memory) => (
                  <Link
                    key={memory._id}
                    to={`/memory/${memory._id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    {memory.media?.[0]?.type === "image" ? (
                      <img
                        src={memory.media[0].url}
                        alt={memory.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                        <FiClock className="w-5 h-5 text-amber-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 text-sm truncate">
                        {memory.title}
                      </p>
                      <p className="text-xs text-stone-500">
                        {memory.media?.length || 0} media
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No favorites yet. Heart your best memories!
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <FiSun className="w-5 h-5" />
              <h3 className="font-semibold">This Month</h3>
            </div>
            <p className="text-4xl font-bold">
              {
                memories.filter((m) => {
                  const memoryDate = new Date(m.date);
                  const now = new Date();
                  return (
                    memoryDate.getMonth() === now.getMonth() &&
                    memoryDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </p>
            <p className="text-white/80 text-sm mt-1">new memories created</p>
          </div>
        </motion.div>
      </div>

      {/* Memory Form Modal */}
      <MemoryForm
        isOpen={showMemoryForm}
        onClose={() => setShowMemoryForm(false)}
        onSubmit={async (data) => {
          const result = await createMemory(data);
          if (result?.success) {
            toast.success("Memory created successfully!");
            setShowMemoryForm(false);
          } else {
            toast.error(result?.error || "Failed to create memory");
          }
        }}
      />

      {/* Reminisce Modal */}
      <ReminisceModal
        isOpen={showReminisce}
        onClose={() => setShowReminisce(false)}
        memories={memories}
      />
    </motion.div>
  );
};

export default Dashboard;
