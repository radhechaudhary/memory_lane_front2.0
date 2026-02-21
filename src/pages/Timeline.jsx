import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiGrid, FiList, FiCalendar } from 'react-icons/fi';
import { useMemory } from '../context/MemoryContext';
import MemoryCard from '../components/memory/MemoryCard';
import MemoryForm from '../components/memory/MemoryForm';
import TimelineItem from '../components/user/TimelineItem';
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

  // Get all timeline entries sorted by date
  const getTimelineEntries = () => {
    const entries = [];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    Object.entries(timelineData).forEach(([year, monthsData]) => {
      months.forEach((month) => {
        const monthMemories = monthsData[month];
        if (monthMemories && monthMemories.length > 0) {
          entries.push({
            year,
            month,
            memories: monthMemories
          });
        }
      });
    });
    
    return entries.sort((a, b) => {
      if (a.year !== b.year) return parseInt(b.year) - parseInt(a.year);
      return months.indexOf(b.month) - months.indexOf(a.month);
    });
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
          <h1 className="text-2xl font-bold text-stone-900">
            Timeline
          </h1>
          <p className="text-stone-500">
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
          <div className="flex bg-stone-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-amber-600 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'timeline' 
                  ? 'bg-white text-amber-600 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700'
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
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 rounded-xl font-semibold text-sm hover:from-amber-500 hover:to-amber-600 transition-all"
          >
            <FiPlus className="w-5 h-5" />
            Add Memory
          </motion.button>
        </div>
      </div>

      {/* Content */}
      {memories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <FiCalendar className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-stone-900 mb-2">
            No memories yet
          </h3>
          <p className="text-stone-500 max-w-md mb-6">
            Start capturing your precious moments and they'll appear here on your timeline.
          </p>
          <button
            onClick={() => setShowMemoryForm(true)}
            className="btn-gold"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Create Your First Memory
          </button>
        </div>
      ) : searchQuery && filteredMemories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-500">
            No memories found for "{searchQuery}"
          </p>
        </div>
      ) : viewMode === 'timeline' ? (
        /* Vertical Timeline View */
        <div className="max-w-4xl mx-auto">
          {getTimelineEntries().map((entry, entryIndex) => (
            <div key={`${entry.year}-${entry.month}`} className="mb-12">
              {/* Date Separator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="flex-1 h-px bg-stone-200" />
                <div className="text-center">
                  <span className="text-lg font-bold text-stone-800">
                    {entry.month}
                  </span>
                  <span className="text-lg font-bold text-stone-800 ml-2">
                    {entry.year}
                  </span>
                </div>
                <div className="flex-1 h-px bg-stone-200" />
              </motion.div>

              {/* Timeline Items */}
              <div className="space-y-6">
                {entry.memories.map((memory, index) => (
                  <TimelineItem
                    key={memory._id}
                    memory={memory}
                    index={index}
                    alignment={index % 2 === 0 ? 'left' : 'right'}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Grid View */
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

