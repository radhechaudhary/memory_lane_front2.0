import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Custom hook for authentication
 * @returns {Object} Auth utilities from AuthContext
 */
export const useAuth = () => {
  const auth = useAuthContext();
  return auth;
};

export default useAuth;

