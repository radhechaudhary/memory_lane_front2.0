import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiGrid, FiList, FiCalendar } from 'react-icons/fi';
import { useMemory } from '../context/MemoryContext';
import MemoryCard from '../components/memory/MemoryCard';
import MemoryTimeline from '../components/memory/MemoryTimeline';
import MemoryForm from '../components/memory/MemoryForm';
import SearchBar from '../components/shared/SearchBar';
import { generateTimeline } from '../utils/generateTimeline';
import Loader from '../components/shared/Loader';

const Timeline = () => {
  const { 
    memories, 
    loading, 
    fetchMemories, 
    deleteMemory, 
    toggleFavorite,
    updateMemory 
  } = useMemory();
  
  const [viewMode, setViewMode] = useState('timeline'); // 'grid', 'timeline'
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  // Generate timeline data
  const timelineData = generateTimeline(memories);

  // Filter memories by search
  const filteredMemories = searchQuery
    ? memories.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : memories;

  const handleEdit = (memory) => {
    setEditingMemory(memory);
    setShowMemoryForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      await deleteMemory(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" text="Loading timeline..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Timeline
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {memories.length} {memories.length === 1 ? 'memory' : 'memories'} in your journey
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            placeholder="Search memories..."
            onSearch={setSearchQuery}
            className="w-64"
          />

          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>

          {/* Add Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingMemory(null);
              setShowMemoryForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Add Memory
          </motion.button>
        </div>
      </div>

      {/* Content */}
      {memories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FiCalendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No memories yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
            Start capturing your precious moments and they'll appear here on your timeline.
          </p>
          <button
            onClick={() => setShowMemoryForm(true)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            Create Your First Memory
          </button>
        </div>
      ) : searchQuery && filteredMemories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            No memories found for "{searchQuery}"
          </p>
        </div>
      ) : viewMode === 'timeline' ? (
        <MemoryTimeline
          timelineData={timelineData}
          onEditMemory={handleEdit}
          onDeleteMemory={handleDelete}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory._id}
              memory={memory}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Memory Form Modal */}
      <MemoryForm
        isOpen={showMemoryForm}
        onClose={() => {
          setShowMemoryForm(false);
          setEditingMemory(null);
        }}
        onSubmit={async (data) => {
          if (editingMemory) {
            await updateMemory(editingMemory._id, data);
          }
          setShowMemoryForm(false);
          setEditingMemory(null);
        }}
        memory={editingMemory}
      />
    </div>
  );
};

export default Timeline;

