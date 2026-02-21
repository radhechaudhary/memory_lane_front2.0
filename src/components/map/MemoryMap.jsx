import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiNavigation, FiX } from 'react-icons/fi';

const MemoryMap = ({ 
  memories = [], 
  onMarkerClick,
  center = { lat: 40.7128, lng: -74.0060 },
  zoom = 4,
  height = '400px'
}) => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filter memories with location data
  const memoriesWithLocation = memories.filter(m => m.location?.coordinates);

  const handleMarkerClick = (memory) => {
    setSelectedMemory(memory);
    onMarkerClick?.(memory);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ height }}>
      {/* Map Placeholder - In production, integrate with Mapbox or Google Maps */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
      </div>

      {/* Map Markers */}
      <div className="absolute inset-0">
        {memoriesWithLocation.map((memory, index) => {
          // Calculate position based on coordinates (simplified)
          const latRange = 20;
          const lngRange = 40;
          const defaultCenter = { lat: 40.7128, lng: -74.0060 };
          
          const x = 50 + ((memory.location.coordinates.lng - defaultCenter.lng) / lngRange) * 50;
          const y = 50 - ((memory.location.coordinates.lat - defaultCenter.lat) / latRange) * 50;

          return (
            <motion.button
              key={memory._id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMarkerClick(memory)}
              className={`
                absolute transform -translate-x-1/2 -translate-y-1/2
                w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-200 hover:scale-110 z-10
                ${selectedMemory?._id === memory._id 
                  ? 'bg-indigo-600 ring-4 ring-indigo-300 dark:ring-indigo-500/50' 
                  : 'bg-white dark:bg-gray-800 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                }
              `}
              style={{ left: `${Math.min(90, Math.max(10, x))}%`, top: `${Math.min(90, Math.max(10, y))}%` }}
            >
              <FiMapPin className={`w-5 h-5 ${selectedMemory?._id === memory._id ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 px-3 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg text-xs text-gray-600 dark:text-gray-400">
        {memoriesWithLocation.length} {memoriesWithLocation.length === 1 ? 'location' : 'locations'}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <FiNavigation className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Selected Memory Card */}
      {selectedMemory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 right-4 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          <button
            onClick={() => setSelectedMemory(null)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
          >
            <FiX className="w-4 h-4 text-gray-500" />
          </button>

          {selectedMemory.media?.[0]?.type === 'image' && (
            <img
              src={selectedMemory.media[0].url}
              alt={selectedMemory.title}
              className="w-full h-32 object-cover"
            />
          )}

          <div className="p-3">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {selectedMemory.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {formatDate(selectedMemory.date)}
            </p>
            {selectedMemory.location?.name && (
              <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1 mb-3">
                <FiMapPin className="w-3 h-3" />
                {selectedMemory.location.name}
              </p>
            )}
            <Link
              to={`/memory/${selectedMemory._id}`}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Memory →
            </Link>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {memoriesWithLocation.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <FiMapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No memories with locations yet
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryMap;

