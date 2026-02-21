// UserTable - Premium data table for user management
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiEye, FiEdit2, FiTrash2, FiMoreVertical, FiChevronLeft, FiChevronRight, FiCheck, FiX } from 'react-icons/fi';

const mockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'User', memories: 24, status: 'active', avatar: 'SJ' },
  { id: 2, name: 'Michael Chen', email: 'm.chen@email.com', role: 'User', memories: 18, status: 'active', avatar: 'MC' },
  { id: 3, name: 'Emma Williams', email: 'emma.w@email.com', role: 'User', memories: 32, status: 'active', avatar: 'EW' },
  { id: 4, name: 'James Brown', email: 'j.brown@email.com', role: 'User', memories: 5, status: 'blocked', avatar: 'JB' },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.a@email.com', role: 'User', memories: 41, status: 'active', avatar: 'LA' },
  { id: 6, name: 'David Wilson', email: 'd.wilson@email.com', role: 'User', memories: 12, status: 'active', avatar: 'DW' },
  { id: 7, name: 'Jennifer Lee', email: 'j.lee@email.com', role: 'User', memories: 27, status: 'active', avatar: 'JL' },
  { id: 8, name: 'Robert Taylor', email: 'r.taylor@email.com', role: 'User', memories: 8, status: 'blocked', avatar: 'RT' },
];

const UserTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const itemsPerPage = 5;

  // Filter users based on search
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] overflow-hidden">
      {/* Table Header with Search */}
      <div className="p-6 border-b border-[var(--color-surface-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Users Management</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage and monitor all registered users</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2.5 bg-[var(--color-page-bg)] border border-[var(--color-surface-border)] rounded-xl text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] outline-none focus:border-[var(--color-accent-gold)] focus:ring-2 focus:ring-amber-100 transition-all w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-page-bg)]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Memories
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-surface-border)]">
            {paginatedUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-stone-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-700">{user.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-text-primary)]">{user.name}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-[var(--color-text-primary)]">{user.memories}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-rose-50 text-rose-600'
                  }`}>
                    {user.status === 'active' ? (
                      <>
                        <FiCheck className="w-3 h-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <FiX className="w-3 h-3" />
                        Blocked
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => toggleDropdown(user.id)}
                        className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                      >
                        <FiMoreVertical className="w-4 h-4 text-[var(--color-text-secondary)]" />
                      </button>
                      
                      {openDropdownId === user.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-[var(--color-surface-border)] shadow-lg overflow-hidden z-10"
                        >
                          <button className="w-full px-4 py-2.5 text-left text-sm text-[var(--color-text-primary)] hover:bg-stone-50 transition-colors flex items-center gap-2">
                            <FiEye className="w-4 h-4" />
                            View Profile
                          </button>
                          <button className="w-full px-4 py-2.5 text-left text-sm text-amber-600 hover:bg-amber-50 transition-colors flex items-center gap-2">
                            {user.status === 'active' ? 'Block' : 'Unblock'}
                          </button>
                          <button className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2">
                            <FiTrash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-[var(--color-surface-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </p>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-[var(--color-surface-border)] hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? 'bg-[var(--color-accent-gold)] text-white'
                  : 'border border-[var(--color-surface-border)] hover:bg-stone-50 text-[var(--color-text-primary)]'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-[var(--color-surface-border)] hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

