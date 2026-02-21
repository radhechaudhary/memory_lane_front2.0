/**
 * Generate timeline data from memories
 * @param {Array} memories - Array of memory objects
 * @returns {Object} Timeline grouped by year and month
 */
export const generateTimeline = (memories = []) => {
  const timeline = {};
  
  memories.forEach(memory => {
    const date = new Date(memory.date);
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    
    if (!timeline[year]) {
      timeline[year] = {};
    }
    
    if (!timeline[year][month]) {
      timeline[year][month] = [];
    }
    
    timeline[year][month].push(memory);
  });
  
  // Sort years in descending order
  const sortedTimeline = {};
  const years = Object.keys(timeline).sort((a, b) => b - a);
  
  years.forEach(year => {
    sortedTimeline[year] = timeline[year];
  });
  
  return sortedTimeline;
};

/**
 * Get timeline years from memories
 * @param {Array} memories 
 * @returns {Array} Array of years
 */
export const getTimelineYears = (memories = []) => {
  const years = new Set();
  
  memories.forEach(memory => {
    if (memory.date) {
      const year = new Date(memory.date).getFullYear();
      years.add(year);
    }
  });
  
  return Array.from(years).sort((a, b) => b - a);
};

/**
 * Filter memories by date range
 * @param {Array} memories 
 * @param {string} range - 'today', 'week', 'month', 'year'
 * @returns {Array}
 */
export const filterByDateRange = (memories, range) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return memories.filter(memory => {
    const memoryDate = new Date(memory.date);
    
    switch (range) {
      case 'today':
        return memoryDate >= startOfDay;
      case 'week': {
        const weekAgo = new Date(startOfDay);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return memoryDate >= weekAgo;
      }
      case 'month': {
        const monthAgo = new Date(startOfDay);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return memoryDate >= monthAgo;
      }
      case 'year': {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        return memoryDate >= yearStart;
      }
      default:
        return true;
    }
  });
};

/**
 * Search memories by query
 * @param {Array} memories 
 * @param {string} query 
 * @returns {Array}
 */
export const searchMemories = (memories, query) => {
  if (!query || !query.trim()) return memories;
  
  const lowerQuery = query.toLowerCase();
  
  return memories.filter(memory => {
    const titleMatch = memory.title?.toLowerCase().includes(lowerQuery);
    const descMatch = memory.description?.toLowerCase().includes(lowerQuery);
    const tagMatch = memory.tags?.some(tag => 
      tag.toLowerCase().includes(lowerQuery)
    );
    const locationMatch = memory.location?.name?.toLowerCase().includes(lowerQuery);
    
    return titleMatch || descMatch || tagMatch || locationMatch;
  });
};

/**
 * Filter memories by tags
 * @param {Array} memories 
 * @param {Array} tags 
 * @returns {Array}
 */
export const filterByTags = (memories, tags) => {
  if (!tags || tags.length === 0) return memories;
  
  return memories.filter(memory => 
    tags.some(tag => memory.tags?.includes(tag))
  );
};

/**
 * Filter memories by emotions
 * @param {Array} memories 
 * @param {Array} emotions 
 * @returns {Array}
 */
export const filterByEmotions = (memories, emotions) => {
  if (!emotions || emotions.length === 0) return memories;
  
  return memories.filter(memory => 
    emotions.some(emotion => memory.emotions?.includes(emotion))
  );
};

/**
 * Sort memories
 * @param {Array} memories 
 * @param {string} sortBy - 'date', 'title', 'viewCount'
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array}
 */
export const sortMemories = (memories, sortBy = 'date', order = 'desc') => {
  const sorted = [...memories];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'title':
        comparison = (a.title || '').localeCompare(b.title || '');
        break;
      case 'viewCount':
        comparison = (a.viewCount || 0) - (b.viewCount || 0);
        break;
      default:
        comparison = 0;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
};

/**
 * Get all unique tags from memories
 * @param {Array} memories 
 * @returns {Array}
 */
export const getAllTags = (memories = []) => {
  const tags = new Set();
  
  memories.forEach(memory => {
    memory.tags?.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
};

/**
 * Get memory statistics
 * @param {Array} memories 
 * @returns {Object}
 */
export const getMemoryStats = (memories = []) => {
  const stats = {
    total: memories.length,
    byCategory: {},
    byEmotion: {},
    byYear: {},
    withLocation: 0,
    private: 0,
    public: 0
  };
  
  memories.forEach(memory => {
    // By category
    const category = memory.category || 'other';
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
    
    // By emotion
    memory.emotions?.forEach(emotion => {
      stats.byEmotion[emotion] = (stats.byEmotion[emotion] || 0) + 1;
    });
    
    // By year
    const year = new Date(memory.date).getFullYear();
    stats.byYear[year] = (stats.byYear[year] || 0) + 1;
    
    // Location
    if (memory.location?.coordinates) {
      stats.withLocation++;
    }
    
    // Privacy
    if (memory.isPrivate) {
      stats.private++;
    } else {
      stats.public++;
    }
  });
  
  return stats;
};

