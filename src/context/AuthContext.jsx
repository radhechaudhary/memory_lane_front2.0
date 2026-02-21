import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext(null);

const USERS_KEY = 'memona_users';
const DEMO_USERS = [
  {
    id: 'demo-admin',
    name: 'Demo Admin',
    username: 'Demo Admin',
    email: 'admin@demo.memona',
    password: 'demo-admin',
    role: 'admin',
    isDemo: true
  },
  {
    id: 'demo-user',
    name: 'Demo User',
    username: 'Demo User',
    email: 'user@demo.memona',
    password: 'demo-user',
    role: 'user',
    isDemo: true
  }
];

const normalizeRole = (role) => (role || '').toLowerCase();

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const buildAllUsers = () => [...DEMO_USERS, ...getStoredUsers()];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (['admin', 'user'].includes(parsedUser?.role)) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password, role) => {
    setError('');
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRole = normalizeRole(role);

    const allowedRoles = ['admin', 'user'];
    if (!allowedRoles.includes(normalizedRole)) {
      setLoading(false);
      setError('Please choose a valid role.');
      return { success: false, error: 'Please choose a valid role.' };
    }

    const existingUsers = buildAllUsers();
    const alreadyExists = existingUsers.some(
      (candidate) => candidate.email.toLowerCase() === normalizedEmail
    );

    if (alreadyExists) {
      setLoading(false);
      setError('Email already registered.');
      return { success: false, error: 'Email already registered.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      username: name.trim(),
      email: normalizedEmail,
      password,
      role: normalizedRole,
      isDemo: false
    };

    const storedUsers = getStoredUsers();
    saveUsers([...storedUsers, newUser]);

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
    return { success: true, user: newUser };
  };

  const login = async (email, password) => {
    setError('');
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = buildAllUsers().find(
      (candidate) =>
        candidate.email.toLowerCase() === normalizedEmail &&
        candidate.password === password
    );

    if (!matchedUser) {
      setLoading(false);
      setError('Invalid email or password.');
      return { success: false, error: 'Invalid email or password.' };
    }

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(matchedUser));
    setUser(matchedUser);
    setLoading(false);
    return { success: true, user: matchedUser };
  };

  const loginDemo = async (role) => {
    setError('');
    setLoading(true);
    const normalizedRole = normalizeRole(role);
    const demoUser = DEMO_USERS.find((candidate) => candidate.role === normalizedRole);

    if (!demoUser) {
      setLoading(false);
      setError('Demo user not found.');
      return { success: false, error: 'Demo user not found.' };
    }

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(demoUser));
    setUser(demoUser);
    setLoading(false);
    return { success: true, user: demoUser };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  const value = {
    user,
    loading,
    isLoading: loading,
    error,
    login,
    loginDemo,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

