import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiClock, FiImage, FiStar, FiMapPin, FiUsers, 
  FiTrendingUp, FiPlus, FiHeart
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMemory } from '../context/MemoryContext';
import MemoryCard from '../components/memory/MemoryCard';
import MemoryMap from '../components/map/MemoryMap';
import MemoryForm from '../components/memory/MemoryForm';
import Loader from '../components/shared/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const { memories = [], albums = [], milestones = [], loading, fetchMemories, toggleFavorite } = useMemory();
  const [showMemoryForm, setShowMemoryForm] = useState(false);

  // Redirect to login if no user
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  // Get recent memories (last 6)
  const recentMemories = memories.slice(0, 6);
  
  // Get favorite memories
  const favoriteMemories = memories.filter(m => m.isFavorite);
  
  // Get memories with location
  const memoriesWithLocation = memories.filter(m => m.location?.coordinates);

  const stats = [
    { 
      label: 'Total Memories', 
      value: memories.length, 
      icon: FiClock,
      color: 'from-indigo-500 to-purple-600',
      link: '/timeline'
    },
    { 
      label: 'Albums', 
      value: albums.length, 
      icon: FiImage,
      color: 'from-pink-500 to-rose-500',
      link: '/albums'
    },
    { 
      label: 'Milestones', 
      value: milestones.length, 
      icon: FiStar,
      color: 'from-amber-400 to-orange-500',
      link: '/milestones'
    },
    { 
      label: 'Locations', 
      value: memoriesWithLocation.length, 
      icon: FiMapPin,
      color: 'from-emerald-500 to-teal-600',
      link: '/map'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
      <motion.div variants={item} className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.username || 'there'}! 👋
            </h1>
            <p className="text-white/80">
              You have {memories.length} memories to cherish. Keep preserving your journey!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMemoryForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FiPlus className="w-5 h-5" />
            Add Memory
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow border border-stone-100"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-sm text-stone-500">{stat.label}</p>
          </Link>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Memories */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-stone-900">
              Recent Memories
            </h2>
            <Link 
              to="/timeline" 
              className="text-indigo-600 text-sm font-medium hover:underline"
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
              <FiClock className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-semibold text-stone-900 mb-2">
                No memories yet
              </h3>
              <p className="text-stone-500 mb-4">
                Start capturing your precious moments
              </p>
              <button
                onClick={() => setShowMemoryForm(true)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
              >
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
              <h2 className="text-xl font-bold text-stone-900">
                Memory Map
              </h2>
              <Link 
                to="/map" 
                className="text-indigo-600 text-sm font-medium hover:underline"
              >
                View Full →
              </Link>
            </div>
            <MemoryMap 
              memories={memoriesWithLocation} 
              height="200px"
            />
          </div>

          {/* Favorites */}
          <div className="bg-white rounded-2xl p-5 border border-stone-100">
            <div className="flex items-center gap-2 mb-4">
              <FiHeart className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-stone-900">
                Favorites
              </h3>
            </div>
            {favoriteMemories.length > 0 ? (
              <div className="space-y-3">
                {favoriteMemories.slice(0, 3).map((memory) => (
                  <Link
                    key={memory._id}
                    to={`/memory/${memory._id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    {memory.media?.[0]?.type === 'image' ? (
                      <img
                        src={memory.media[0].url}
                        alt={memory.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <FiClock className="w-5 h-5 text-indigo-500" />
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
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FiTrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-stone-900">
                This Month
              </h3>
            </div>
            <p className="text-3xl font-bold text-indigo-600">
              {memories.filter(m => {
                const memoryDate = new Date(m.date);
                const now = new Date();
                return memoryDate.getMonth() === now.getMonth() && 
                       memoryDate.getFullYear() === now.getFullYear();
              }).length}
            </p>
            <p className="text-sm text-stone-500">
              new memories created
            </p>
          </div>
        </motion.div>
      </div>

      {/* Memory Form Modal */}
      <MemoryForm
        isOpen={showMemoryForm}
        onClose={() => setShowMemoryForm(false)}
        onSubmit={async (data) => {
          // Handle form submission
          setShowMemoryForm(false);
        }}
      />
    </motion.div>
  );
};

export default Dashboard;

