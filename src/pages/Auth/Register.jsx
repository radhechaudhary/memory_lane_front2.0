import { useEffect, useState } from "react";
import { FiMail, FiLock, FiUser, FiShield, FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Toast from "../../components/shared/Toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.role) {
      return;
    }
    navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard", {
      replace: true,
    });
  }, [isAuthenticated, user, navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setFormError("");
    const result = await register(name, email, password, role);
    if (!result.success) {
      setFormError(result.error || "Signup failed.");
      return;
    }
    setSuccessMessage("Account created successfully! Redirecting...");
    setTimeout(() => {
      navigate(
        result.user.role === "admin" ? "/admin-dashboard" : "/dashboard",
        {
          replace: true,
        },
      );
    }, 3500);
  };

  const handleBackClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 via-white to-amber-50/30 px-4 py-10">
      <Toast
        message={successMessage}
        type="success"
        onClose={() => setSuccessMessage("")}
      />
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
            Create Account
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Register as Admin or User. Data is stored locally in your browser.
          </p>

          {formError ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {formError}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleRegister}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-700">
                Full Name
              </span>
              <div className="flex items-center gap-3 rounded-lg border border-stone-300 bg-white px-4 transition focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-200">
                <FiUser className="text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-transparent py-3 text-sm text-stone-900 placeholder-stone-400 outline-none"
                  required
                />
              </div>
            </label>

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
                  placeholder="Create a password"
                  className="w-full bg-transparent py-3 text-sm text-stone-900 placeholder-stone-400 outline-none"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-medium text-stone-700">
                Account Type
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    role === "user"
                      ? "border-amber-400 bg-amber-50"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  }`}
                >
                  <FiUser
                    className={
                      role === "user" ? "text-amber-600" : "text-stone-400"
                    }
                  />
                  <div className="text-left">
                    <p
                      className={`text-sm font-semibold ${role === "user" ? "text-amber-900" : "text-stone-900"}`}
                    >
                      User
                    </p>
                    <p className="text-xs text-stone-500">Store memories</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    role === "admin"
                      ? "border-amber-400 bg-amber-50"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  }`}
                >
                  <FiShield
                    className={
                      role === "admin" ? "text-amber-600" : "text-stone-400"
                    }
                  />
                  <div className="text-left">
                    <p
                      className={`text-sm font-semibold ${role === "admin" ? "text-amber-900" : "text-stone-900"}`}
                    >
                      Admin
                    </p>
                    <p className="text-xs text-stone-500">Manage all</p>
                  </div>
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-semibold text-stone-900 transition hover:from-amber-500 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-amber-600 transition hover:text-amber-700"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
