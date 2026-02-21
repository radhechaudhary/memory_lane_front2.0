// AdminMemories - Memories management page
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiEye, FiEdit2, FiTrash2, FiMoreVertical, FiImage, FiHeart, FiShare2, FiFlag } from 'react-icons/fi';

const mockMemories = [
  { id: 1, title: 'Summer Vacation 2024', user: 'Sarah Johnson', type: 'Photo', date: 'Dec 10, 2024', likes: 24, shares: 5, status: 'public', thumbnail: '🏖️' },
  { id: 2, title: 'Birthday Celebration', user: 'Michael Chen', type: 'Photo', date: 'Dec 8, 2024', likes: 45, shares: 12, status: 'public', thumbnail: '🎂' },
  { id: 3, title: 'Family Reunion', user: 'Emma Williams', type: 'Video', date: 'Dec 5, 2024', likes: 67, shares: 18, status: 'public', thumbnail: '👨‍👩‍👧‍👦' },
  { id: 4, title: 'Wedding Day', user: 'James Brown', type: 'Photo', date: 'Dec 1, 2024', likes: 128, shares: 34, status: 'public', thumbnail: '💒' },
  { id: 5, title: 'Holiday Trip', user: 'Lisa Anderson', type: 'Photo', date: 'Nov 28, 2024', likes: 18, shares: 3, status: 'private', thumbnail: '✈️' },
  { id: 6, title: 'Graduation Day', user: 'David Wilson', type: 'Video', date: 'Nov 25, 2024', likes: 89, shares: 22, status: 'public', thumbnail: '🎓' },
];

const AdminMemories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMemories = mockMemories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || memory.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Memories Management</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">View and manage all memories on the platform</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-[var(--color-page-bg)] border border-[var(--color-surface-border)] rounded-xl text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] outline-none focus:border-[var(--color-accent-gold)] focus:ring-2 focus:ring-amber-100 transition-all w-full sm:w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 bg-[var(--color-page-bg)] border border-[var(--color-surface-border)] rounded-xl text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent-gold)] transition-colors"
            >
              <option value="all">All Status</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-[var(--color-surface-border)] overflow-hidden hover:shadow-lg hover:shadow-stone-200/50 transition-all group"
          >
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-5xl relative">
              {memory.thumbnail}
              <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-[var(--color-text-primary)]">
                {memory.type}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent-gold-dark)] transition-colors">
                {memory.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">by {memory.user}</p>
              
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-4">
                <span>{memory.date}</span>
                <span className={`px-2 py-0.5 rounded-full ${memory.status === 'public' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-600'}`}>
                  {memory.status}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-surface-border)]">
                <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                  <FiHeart className="w-4 h-4" />
                  <span>{memory.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                  <FiShare2 className="w-4 h-4" />
                  <span>{memory.shares}</span>
                </div>
                <div className="flex-1" />
                <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-[var(--color-text-secondary)]">
                  <FiEye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-[var(--color-text-secondary)]">
                  <FiFlag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminMemories;

