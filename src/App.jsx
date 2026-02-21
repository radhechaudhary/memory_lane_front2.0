import { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import { AdminRoute, UserRoute } from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MemoryProvider } from './context/MemoryContext';
import { ThemeProvider } from './context/ThemeContext';
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMemories from './pages/admin/AdminMemories';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Timeline from './pages/Timeline';
import Albums from './pages/Albums';
import Milestones from './pages/Milestones';
import MapView from './pages/MapView';
import SharedMemories from './pages/SharedMemories';
import NotFound from './pages/NotFound';

const AppLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <div className="flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-20' : 'ml-[260px]'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === 'user') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => (
  <>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="memories" element={<AdminMemories />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      {/* Legacy admin route redirect */}
      <Route
        path="/admin-dashboard"
        element={<Navigate to="/admin" replace />}
      />

      {/* User Routes */}
      <Route
        path="/dashboard"
        element={
          <UserRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </UserRoute>
        }
      />
      <Route
        path="/timeline"
        element={
          <UserRoute>
            <AppLayout>
              <Timeline />
            </AppLayout>
          </UserRoute>
        }
      />
      <Route
        path="/albums"
        element={
          <UserRoute>
            <AppLayout>
              <Albums />
            </AppLayout>
          </UserRoute>
        }
      />
      <Route
        path="/milestones"
        element={
          <UserRoute>
            <AppLayout>
              <Milestones />
            </AppLayout>
          </UserRoute>
        }
      />
      <Route
        path="/map"
        element={
          <UserRoute>
            <AppLayout>
              <MapView />
            </AppLayout>
          </UserRoute>
        }
      />
      <Route
        path="/shared"
        element={
          <UserRoute>
            <AppLayout>
              <SharedMemories />
            </AppLayout>
          </UserRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>

    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </>
);

const App = () => (
  <Router>
    <ThemeProvider>
      <AuthProvider>
        <MemoryProvider>
          <AppRoutes />
        </MemoryProvider>
      </AuthProvider>
    </ThemeProvider>
  </Router>
);

export default App;

