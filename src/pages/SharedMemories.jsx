import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiLock, FiGlobe, FiHeart } from 'react-icons/fi';
import { useMemory } from '../context/MemoryContext';
import MemoryCard from '../components/memory/MemoryCard';
import SearchBar from '../components/shared/SearchBar';
import Loader from '../components/shared/Loader';

const SharedMemories = () => {
  const { sharedMemories, loading, fetchSharedMemories, toggleFavorite } = useMemory();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'public', 'shared'

  useEffect(() => {
    fetchSharedMemories();
  }, [fetchSharedMemories]);

  const filteredMemories = sharedMemories.filter(m => {
    const matchesSearch = !searchQuery || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'public') return matchesSearch && !m.isPrivate;
    if (filter === 'shared') return matchesSearch && m.sharedWith?.length > 0;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" text="Loading shared memories..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Shared Memories
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Memories shared with you by others
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            placeholder="Search shared memories..."
            onSearch={setSearchQuery}
            className="w-64"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-colors
            ${filter === 'all' 
              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          All ({sharedMemories.length})
        </button>
        <button
          onClick={() => setFilter('public')}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2
            ${filter === 'public' 
              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          <FiGlobe className="w-4 h-4" />
          Public
        </button>
        <button
          onClick={() => setFilter('shared')}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2
            ${filter === 'shared' 
              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          <FiUsers className="w-4 h-4" />
          Shared with me
        </button>
      </div>

      {/* Content */}
      {sharedMemories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FiUsers className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No shared memories yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            When someone shares their memories with you, they'll appear here.
          </p>
        </div>
      ) : filteredMemories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            No shared memories found for "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory._id}
              memory={memory}
              onToggleFavorite={toggleFavorite}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedMemories;

