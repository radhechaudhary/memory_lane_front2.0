import { useEffect, useState } from 'react';
import { FiMail, FiLock, FiUser, FiShield } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [formError, setFormError] = useState('');
  const { register, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.role) {
      return;
    }
    navigate(user.role === 'admin' ? '/admin-dashboard' : '/dashboard', { replace: true });
  }, [isAuthenticated, user, navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setFormError('');
    const result = await register(name, email, password, role);
    if (!result.success) {
      setFormError(result.error || 'Signup failed.');
      return;
    }
    navigate(result.user.role === 'admin' ? '/admin-dashboard' : '/dashboard', { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-stone-900">Create Account</h1>
        <p className="mt-1 text-sm text-stone-600">
          Register as Admin or User. Data is stored locally in your browser.
        </p>

        {formError ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">Name</span>
            <div className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3">
              <FiUser className="text-stone-500" />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="w-full bg-transparent py-3 text-sm text-stone-900 outline-none"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">Email</span>
            <div className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3">
              <FiMail className="text-stone-500" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3 text-sm text-stone-900 outline-none"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">Password</span>
            <div className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3">
              <FiLock className="text-stone-500" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create password"
                className="w-full bg-transparent py-3 text-sm text-stone-900 outline-none"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">Role</span>
            <div className="relative">
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm text-stone-900 outline-none focus:border-amber-400"
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <FiShield className="pointer-events-none absolute right-3 top-3.5 text-stone-500" />
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
