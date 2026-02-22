import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiGlobe, FiLock } from "react-icons/fi";
import { useMemory } from "../context/MemoryContext";
import MemoryCard from "../components/memory/MemoryCard";
import SearchBar from "../components/shared/SearchBar";
import Loader from "../components/shared/Loader";

const SharedMemories = () => {
  const { sharedMemories, loading, fetchSharedMemories, toggleFavorite } =
    useMemory();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'public', 'shared'

  useEffect(() => {
    fetchSharedMemories();
  }, [fetchSharedMemories]);

  const normalizeSearchText = (value) => String(value || "").toLowerCase();

  const filteredMemories = sharedMemories.filter((m) => {
    const matchesSearch =
      !searchQuery ||
      normalizeSearchText(m.title).includes(normalizeSearchText(searchQuery)) ||
      normalizeSearchText(m.description).includes(
        normalizeSearchText(searchQuery),
      );

    if (filter === "all") return matchesSearch;
    if (filter === "public") return matchesSearch && !m.isPrivate;
    if (filter === "shared") {
      return (
        matchesSearch && Array.isArray(m.sharedWith) && m.sharedWith.length > 0
      );
    }
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
          <h1 className="text-2xl font-bold text-stone-900">Shared Memories</h1>
          <p className="text-stone-500">Memories shared with you by others</p>
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
          onClick={() => setFilter("all")}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all
            ${
              filter === "all"
                ? "bg-amber-100 text-amber-700"
                : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
            }
          `}
        >
          All ({sharedMemories.length})
        </button>
        <button
          onClick={() => setFilter("public")}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
            ${
              filter === "public"
                ? "bg-amber-100 text-amber-700"
                : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
            }
          `}
        >
          <FiGlobe className="w-4 h-4" />
          Public
        </button>
        <button
          onClick={() => setFilter("shared")}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
            ${
              filter === "shared"
                ? "bg-amber-100 text-amber-700"
                : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
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
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <FiUsers className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-2">
            No shared memories yet
          </h3>
          <p className="text-stone-500 max-w-md">
            When someone shares their memories with you, they'll appear here.
          </p>
        </div>
      ) : filteredMemories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-500">
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
