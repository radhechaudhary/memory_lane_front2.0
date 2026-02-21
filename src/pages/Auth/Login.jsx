import { useEffect, useState } from 'react';
import { FiLogIn, FiMail, FiLock, FiShield, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, loginDemo, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.role) {
      return;
    }
    navigate(user.role === 'admin' ? '/admin-dashboard' : '/dashboard', { replace: true });
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setFormError('');
    const result = await login(email, password);
    if (!result.success) {
      setFormError(result.error || 'Login failed.');
      return;
    }
    navigate(result.user.role === 'admin' ? '/admin-dashboard' : '/dashboard', { replace: true });
  };

  const handleDemoLogin = async (role) => {
    setFormError('');
    const result = await loginDemo(role);
    if (!result.success) {
      setFormError(result.error || 'Demo login failed.');
      return;
    }
    navigate(result.user.role === 'admin' ? '/admin-dashboard' : '/dashboard', { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-stone-900">Login</h1>
        <p className="mt-1 text-sm text-stone-600">
          Sign in to continue to your MemoryLane account.
        </p>

        {formError ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                placeholder="Enter password"
                className="w-full bg-transparent py-3 text-sm text-stone-900 outline-none"
                required
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLogIn />
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="my-5 h-px bg-stone-200" />

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-stone-50 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
          >
            <FiShield />
            Login as Demo Admin
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('user')}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-stone-50 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
          >
            <FiUser />
            Login as Demo User
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-stone-600">
          No account yet?{' '}
          <Link to="/signup" className="font-medium text-amber-600 hover:text-amber-500">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
