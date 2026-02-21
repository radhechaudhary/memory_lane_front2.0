import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiLayers, FiList } from 'react-icons/fi';
import { useMemory } from '../context/MemoryContext';
import MemoryMap from '../components/map/MemoryMap';
import MemoryCard from '../components/memory/MemoryCard';
import SearchBar from '../components/shared/SearchBar';
import Loader from '../components/shared/Loader';

const MapView = () => {
  const { memories, loading, fetchMemories, toggleFavorite } = useMemory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map', 'list'

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  // Filter memories with location
  const memoriesWithLocation = memories.filter(m => m.location?.coordinates);
  
  const filteredMemories = searchQuery
    ? memoriesWithLocation.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : memoriesWithLocation;

  const handleMarkerClick = (memory) => {
    setSelectedMemory(memory);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" text="Loading map..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Memory Map
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {memoriesWithLocation.length} {memoriesWithLocation.length === 1 ? 'location' : 'locations'} across your memories
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            placeholder="Search locations..."
            onSearch={setSearchQuery}
            className="w-64"
          />

          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'map' 
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FiMapPin className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {memoriesWithLocation.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FiMapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No locations yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Add locations to your memories to see them on the map.
          </p>
        </div>
      ) : viewMode === 'map' ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <MemoryMap
              memories={filteredMemories}
              onMarkerClick={handleMarkerClick}
              height="600px"
            />
          </div>

          {/* Sidebar - Memory List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Memories at this location
            </h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredMemories.map((memory) => (
                <motion.div
                  key={memory._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`
                    p-3 rounded-xl cursor-pointer transition-all
                    ${selectedMemory?._id === memory._id 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-500' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                  onClick={() => setSelectedMemory(memory)}
                >
                  <MemoryCard
                    memory={memory}
                    showActions={false}
                    variant="compact"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // List View
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory._id}
              memory={memory}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MapView;

