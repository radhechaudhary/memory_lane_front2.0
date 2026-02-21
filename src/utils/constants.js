// API URLs
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const APP_NAME = import.meta.env.VITE_APP_NAME || "Memona";

// Memory Categories
export const MEMORY_CATEGORIES = [
  { value: "moment", label: "Moment", icon: "✨" },
  { value: "milestone", label: "Milestone", icon: "🎯" },
  { value: "achievement", label: "Achievement", icon: "🏆" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧" },
  { value: "friends", label: "Friends", icon: "👥" },
  { value: "work", label: "Work", icon: "💼" },
  { value: "hobby", label: "Hobby", icon: "🎨" },
  { value: "other", label: "Other", icon: "📌" },
];

// Emotions
export const EMOTIONS = [
  { value: "happy", label: "Happy", icon: "😊", color: "#f59e0b" },
  { value: "sad", label: "Sad", icon: "😢", color: "#6366f1" },
  { value: "excited", label: "Excited", icon: "🤩", color: "#f59e0b" },
  { value: "peaceful", label: "Peaceful", icon: "😌", color: "#10b981" },
  { value: "grateful", label: "Grateful", icon: "🙏", color: "#ec4899" },
  { value: "nostalgic", label: "Nostalgic", icon: "🥹", color: "#8b5cf6" },
  { value: "proud", label: "Proud", icon: "🥳", color: "#f59e0b" },
  { value: "love", label: "Love", icon: "❤️", color: "#ec4899" },
  { value: "adventure", label: "Adventure", icon: "🗺️", color: "#10b981" },
  { value: "serene", label: "Serene", icon: "🌅", color: "#3b82f6" },
];

// Milestone Categories
export const MILESTONE_CATEGORIES = [
  { value: "birthday", label: "Birthday", icon: "🎂", color: "#ec4899" },
  { value: "graduation", label: "Graduation", icon: "🎓", color: "#3b82f6" },
  { value: "marriage", label: "Marriage", icon: "💒", color: "#ec4899" },
  { value: "career", label: "Career", icon: "💼", color: "#6366f1" },
  { value: "travel", label: "Travel", icon: "✈️", color: "#10b981" },
  { value: "achievement", label: "Achievement", icon: "🏆", color: "#f59e0b" },
  { value: "health", label: "Health", icon: "❤️", color: "#ef4444" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧", color: "#8b5cf6" },
  { value: "other", label: "Other", icon: "⭐", color: "#6b7280" },
];

// Album Icons
export const ALBUM_ICONS = [
  { value: "album", label: "Album", icon: "🖼️" },
  { value: "heart", label: "Heart", icon: "❤️" },
  { value: "star", label: "Star", icon: "⭐" },
  { value: "camera", label: "Camera", icon: "📷" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧" },
  { value: "friends", label: "Friends", icon: "👥" },
  { value: "work", label: "Work", icon: "💼" },
  { value: "nature", label: "Nature", icon: "🌿" },
  { value: "music", label: "Music", icon: "🎵" },
];

// Theme Colors
export const THEME_COLORS = [
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
  "#ef4444", // Red
  "#14b8a6", // Teal
  "#f97316", // Orange
  "#06b6d4", // Cyan
];

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Date Ranges
export const DATE_RANGES = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
  { value: "all", label: "All Time" },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "viewCount-desc", label: "Most Viewed" },
];

// Media Types
export const MEDIA_TYPES = {
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
};

// Max File Sizes (in bytes)
export const MAX_FILE_SIZES = {
  IMAGE: 10 * 1024 * 1024, // 10MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  AUDIO: 20 * 1024 * 1024, // 20MB
};

// Supported File Types
export const SUPPORTED_FILE_TYPES = {
  IMAGE: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  VIDEO: ["video/mp4", "video/webm", "video/quicktime"],
  AUDIO: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/webm"],
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "memona_token",
  USER: "memona_user",
  THEME: "memona_theme",
  SIDEBAR_COLLAPSED: "memona_sidebar_collapsed",
  SUPPORT_TICKETS: "memona_support_tickets",
};

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  TIMELINE: "/timeline",
  ALBUMS: "/albums",
  ALBUM_DETAIL: "/albums/:id",
  MILESTONES: "/milestones",
  MAP: "/map",
  SHARED: "/shared",
  SETTINGS: "/settings",
  PROFILE: "/profile",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized. Please login again.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  USERNAME_TAKEN: "Username is already taken.",
  EMAIL_TAKEN: "Email is already registered.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Welcome back!",
  REGISTER: "Account created successfully!",
  MEMORY_CREATED: "Memory saved!",
  MEMORY_UPDATED: "Memory updated!",
  MEMORY_DELETED: "Memory deleted!",
  ALBUM_CREATED: "Album created!",
  ALBUM_UPDATED: "Album updated!",
  ALBUM_DELETED: "Album deleted!",
  MILESTONE_CREATED: "Milestone created!",
  MILESTONE_UPDATED: "Milestone updated!",
  MILESTONE_DELETED: "Milestone deleted!",
  PROFILE_UPDATED: "Profile updated!",
  PASSWORD_CHANGED: "Password changed!",
};
