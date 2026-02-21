import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import { debounce } from "../../utils/formatDate";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  onFilterClick,
  filtersActive = false,
  className = "",
  showFilterButton = false,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Debounced search
  const debouncedSearch = useRef(
    debounce((value) => {
      if (onSearch) {
        onSearch(value);
      }
    }, 300),
  ).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClear();
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          flex items-center gap-2 px-4 py-2.5 
          bg-gray-100 
          rounded-xl border-2 transition-all duration-200
          ${
            isFocused
              ? "border-indigo-500 ring-2 ring-indigo-500/20"
              : "border-transparent"
          }
        `}
      >
        <FiSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            flex-1 bg-transparent 
            text-gray-900 
            placeholder-gray-400
            outline-none text-sm
          "
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FiX className="w-4 h-4 text-gray-500" />
            </motion.button>
          )}
        </AnimatePresence>

        {showFilterButton && (
          <button
            onClick={onFilterClick}
            className={`
              p-2 rounded-lg transition-colors
              ${
                filtersActive
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-200 text-gray-500"
              }
            `}
          >
            <FiFilter className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Advanced Search with suggestions
export const AdvancedSearch = ({
  suggestions = [],
  onSearch,
  placeholder = "Search memories...",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <SearchBar
        placeholder={placeholder}
        onSearch={(value) => {
          setQuery(value);
          onSearch?.(value);
        }}
      />

      <AnimatePresence>
        {showSuggestions && query && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  onSearch?.(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full px-4 py-2.5 text-left hover:bg-gray-100 transition-colors text-sm text-gray-700"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
