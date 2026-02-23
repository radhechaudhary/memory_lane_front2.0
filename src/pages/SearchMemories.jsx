import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiCalendar,
  FiTag,
  FiChevronDown,
} from "react-icons/fi";
import { useMemory } from "../context/MemoryContext";
import MemoryCard from "../components/memory/MemoryCard";
import Loader from "../components/shared/Loader";
import SearchBar from "../components/shared/SearchBar";
import {
  advancedSearch,
  extractUniqueTags,
  getMemoryDateRange,
  groupResultsByDate,
} from "../utils/searchUtils";
import { formatDate } from "../utils/formatDate";

const SearchMemories = () => {
  const { memories, loading } = useMemory();

  // Search state
  const [keywords, setKeywords] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedYear, setExpandedYear] = useState(null);

  // Get available tags and date range
  const availableTags = useMemo(() => extractUniqueTags(memories), [memories]);
  const dateRange = useMemo(() => getMemoryDateRange(memories), [memories]);

  // Perform advanced search
  const searchResults = useMemo(() => {
    return advancedSearch(memories, {
      keywords,
      tags: selectedTags,
      startDate,
      endDate,
    });
  }, [memories, keywords, selectedTags, startDate, endDate]);

  // Group results by date
  const groupedResults = useMemo(
    () => groupResultsByDate(searchResults),
    [searchResults],
  );

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleClearFilters = () => {
    setKeywords("");
    setSelectedTags([]);
    setStartDate("");
    setEndDate("");
    setShowFilters(false);
  };

  const hasActiveFilters =
    keywords || selectedTags.length > 0 || startDate || endDate;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" text="Loading memories..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Search Memories</h1>
        <p className="text-stone-500">
          Find your memories by keywords, tags, or dates
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              placeholder="Search memories by title, description..."
              onSearch={setKeywords}
              showFilterButton={true}
              filtersActive={showFilters}
              onFilterClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap p-3 bg-indigo-50 rounded-lg">
            <FiFilter className="w-4 h-4 text-indigo-600" />

            {/* Keyword Badge */}
            {keywords && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm border border-indigo-200">
                <span className="text-stone-700">{keywords}</span>
                <button
                  onClick={() => setKeywords("")}
                  className="hover:text-indigo-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Tag Badges */}
            {selectedTags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm border border-indigo-200"
              >
                <FiTag className="w-3 h-3 text-indigo-600" />
                <span className="text-stone-700">{tag}</span>
                <button
                  onClick={() => handleToggleTag(tag)}
                  className="hover:text-indigo-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Date Range Badge */}
            {(startDate || endDate) && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm border border-indigo-200">
                <FiCalendar className="w-3 h-3 text-indigo-600" />
                <span className="text-stone-700">
                  {startDate && formatDate(startDate)}
                  {startDate && endDate && " → "}
                  {endDate && formatDate(endDate)}
                </span>
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="hover:text-indigo-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="ml-auto text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-6 bg-white border border-gray-200 rounded-xl space-y-6"
        >
          {/* Tag Filter */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 mb-3">
              Filter by Tags ({selectedTags.length} selected)
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.length > 0 ? (
                availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-stone-700 hover:bg-gray-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <p className="text-stone-500 text-sm">
                  No tags available in your memories
                </p>
              )}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 mb-3">
              Filter by Date Range
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-stone-600 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={`${dateRange.minYear}-01-01`}
                  max={`${dateRange.maxYear}-12-31`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-stone-600 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={`${dateRange.minYear}-01-01`}
                  max={`${dateRange.maxYear}-12-31`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="space-y-8">
          <div className="text-sm text-stone-600">
            Found{" "}
            <span className="font-semibold text-stone-900">
              {searchResults.length}
            </span>{" "}
            memory/memories
            {hasActiveFilters && " matching your filters"}
          </div>

          {Object.entries(groupedResults)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([yearMonth, monthMemories]) => {
              const [year, month] = yearMonth.split("-");
              const monthDate = new Date(year, parseInt(month) - 1);
              const monthName = monthDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              });
              const isExpanded = expandedYear === yearMonth;

              return (
                <div key={yearMonth}>
                  <button
                    onClick={() =>
                      setExpandedYear(isExpanded ? null : yearMonth)
                    }
                    className="flex items-center gap-3 mb-4 text-lg font-semibold text-stone-900 hover:text-indigo-600 transition-colors"
                  >
                    <FiChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isExpanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                    {monthName}
                    <span className="text-sm text-stone-500">
                      ({monthMemories.length})
                    </span>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {monthMemories.map((memory) => (
                        <MemoryCard key={memory._id} memory={memory} />
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-16">
          <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-stone-900 mb-2">
            No memories found
          </h3>
          <p className="text-stone-500">
            {hasActiveFilters
              ? "Try adjusting your search filters"
              : "Start searching by keywords, tags, or dates"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchMemories;
