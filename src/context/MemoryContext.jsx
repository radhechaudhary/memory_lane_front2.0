import { createContext, useContext, useState, useCallback } from "react";
import { albumsAPI, memoriesAPI, milestonesAPI } from "../services/api";

const MemoryContext = createContext(null);

export const useMemoryContext = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error("useMemoryContext must be used within a MemoryProvider");
  }
  return context;
};

export const useMemory = useMemoryContext;

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [sharedMemories, setSharedMemories] = useState([]);
  const [currentMemory, setCurrentMemory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  const fetchMemories = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await memoriesAPI.getAll(params);

      if (response.data.success) {
        setMemories(response.data.data.memories);
        setPagination(response.data.data.pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch memories");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMemory = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await memoriesAPI.getById(id);

      if (response.data.success) {
        setCurrentMemory(response.data.data.memory);
        return response.data.data.memory;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch memory");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createMemory = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await memoriesAPI.create(data);

      if (response.data.success) {
        setMemories((prev) => [response.data.data.memory, ...prev]);
        return { success: true, memory: response.data.data.memory };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create memory";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateMemory = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await memoriesAPI.update(id, data);

      if (response.data.success) {
        setMemories((prev) =>
          prev.map((m) => (m._id === id ? response.data.data.memory : m)),
        );
        if (currentMemory?._id === id) {
          setCurrentMemory(response.data.data.memory);
        }
        return { success: true, memory: response.data.data.memory };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update memory";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const deleteMemory = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await memoriesAPI.delete(id);

      if (response.data.success) {
        setMemories((prev) => prev.filter((m) => m._id !== id));
        if (currentMemory?._id === id) {
          setCurrentMemory(null);
        }
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete memory";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const response = await memoriesAPI.toggleFavorite(id);

      if (response.data.success) {
        setMemories((prev) =>
          prev.map((m) =>
            m._id === id
              ? { ...m, isFavorite: response.data.data.isFavorite }
              : m,
          ),
        );
        return { success: true, isFavorite: response.data.data.isFavorite };
      }
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const fetchMapLocations = useCallback(async () => {
    try {
      const response = await memoriesAPI.getMapLocations();
      if (response.data.success) {
        return response.data.data.memories;
      }
      return [];
    } catch (err) {
      console.error("Failed to fetch map locations:", err);
      return [];
    }
  }, []);

  const fetchTimeline = useCallback(async (year) => {
    try {
      const response = await memoriesAPI.getTimeline(year);
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch timeline:", err);
      return null;
    }
  }, []);

  const fetchAlbums = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await albumsAPI.getAll(params);
      if (response.data?.success) {
        const nextAlbums =
          response.data?.data?.albums || response.data?.data || [];
        setAlbums(Array.isArray(nextAlbums) ? nextAlbums : []);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch albums");
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAlbum = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await albumsAPI.create(data);
      if (response.data?.success) {
        const album = response.data?.data?.album || response.data?.data;
        if (album) {
          setAlbums((prev) => [album, ...prev]);
        }
        return { success: true, album };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create album";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateAlbum = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await albumsAPI.update(id, data);
      if (response.data?.success) {
        const updatedAlbum = response.data?.data?.album || response.data?.data;
        if (updatedAlbum) {
          setAlbums((prev) =>
            prev.map((a) => (a._id === id ? updatedAlbum : a)),
          );
        }
        return { success: true, album: updatedAlbum };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update album";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await albumsAPI.delete(id);
      if (response.data?.success) {
        setAlbums((prev) => prev.filter((a) => a._id !== id));
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete album";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const fetchMilestones = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await milestonesAPI.getAll(params);
      if (response.data?.success) {
        const nextMilestones =
          response.data?.data?.milestones || response.data?.data || [];
        setMilestones(Array.isArray(nextMilestones) ? nextMilestones : []);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch milestones");
      setMilestones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createMilestone = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await milestonesAPI.create(data);
      if (response.data?.success) {
        const milestone = response.data?.data?.milestone || response.data?.data;
        if (milestone) {
          setMilestones((prev) => [milestone, ...prev]);
        }
        return { success: true, milestone };
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create milestone";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateMilestone = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await milestonesAPI.update(id, data);
      if (response.data?.success) {
        const updatedMilestone =
          response.data?.data?.milestone || response.data?.data;
        if (updatedMilestone) {
          setMilestones((prev) =>
            prev.map((m) => (m._id === id ? updatedMilestone : m)),
          );
        }
        return { success: true, milestone: updatedMilestone };
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update milestone";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const deleteMilestone = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await milestonesAPI.delete(id);
      if (response.data?.success) {
        setMilestones((prev) => prev.filter((m) => m._id !== id));
        return { success: true };
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to delete milestone";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const fetchSharedMemories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await memoriesAPI.getAll({ shared: true });
      if (response.data?.success) {
        const nextShared =
          response.data?.data?.memories || response.data?.data || [];
        setSharedMemories(Array.isArray(nextShared) ? nextShared : []);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch shared memories",
      );
      setSharedMemories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    memories,
    albums,
    milestones,
    sharedMemories,
    currentMemory,
    loading,
    error,
    pagination,
    fetchMemories,
    fetchMemory,
    createMemory,
    updateMemory,
    deleteMemory,
    toggleFavorite,
    fetchMapLocations,
    fetchTimeline,
    fetchAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    fetchMilestones,
    createMilestone,
    updateMilestone,
    deleteMilestone,
    fetchSharedMemories,
    setCurrentMemory,
  };

  return (
    <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>
  );
};

export default MemoryContext;
