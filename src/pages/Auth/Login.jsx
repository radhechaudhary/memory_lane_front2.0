import { useEffect, useState } from "react";
import {
  FiLogIn,
  FiMail,
  FiLock,
  FiShield,
  FiUser,
  FiArrowLeft,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const { login, loginDemo, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.role) {
      return;
    }
    navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard", {
      replace: true,
    });
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setFormError("");
    const result = await login(email, password);
    if (!result.success) {
      setFormError(result.error || "Login failed.");
      return;
    }
    navigate(result.user.role === "admin" ? "/admin-dashboard" : "/dashboard", {
      replace: true,
    });
  };

  const handleDemoLogin = async (role) => {
    setFormError("");
    const result = await loginDemo(role);
    if (!result.success) {
      setFormError(result.error || "Demo login failed.");
      return;
    }
    navigate(result.user.role === "admin" ? "/admin-dashboard" : "/dashboard", {
      replace: true,
    });
  };

  const handleBackClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 via-white to-amber-50/30 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
          aria-label="Go back to landing page"
        >
          <FiArrowLeft className="h-5 w-5" />
          Back to Memona
        </button>

        <div className="rounded-3xl border border-stone-200/60 bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-semibold text-stone-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Sign in to continue to your MemoryLane account.
          </p>

          {formError ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {formError}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-700">
                Email Address
              </span>
              <div className="flex items-center gap-3 rounded-lg border border-stone-300 bg-white px-4 transition focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-200">
                <FiMail className="text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-3 text-sm text-stone-900 placeholder-stone-400 outline-none"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-700">
                Password
              </span>
              <div className="flex items-center gap-3 rounded-lg border border-stone-300 bg-white px-4 transition focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-200">
                <FiLock className="text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-3 text-sm text-stone-900 placeholder-stone-400 outline-none"
                  required
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-semibold text-stone-900 transition hover:from-amber-500 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiLogIn />
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs font-medium text-stone-500 uppercase">
              Or
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 py-3 text-sm font-medium text-amber-900 transition hover:bg-amber-100"
            >
              <FiShield />
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
            >
              <FiUser />
              Demo User
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-stone-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-amber-600 transition hover:text-amber-700"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
