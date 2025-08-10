import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import JobSearch from "./pages/JobSearch";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
import JobDetail from "./components/jobs/JobDetail";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import EmployerJobDetails from "./pages/EmployerJobDetails";
import About from "./pages/About";
import EmployerAnalytics from "./pages/employer/EmployerAnalytics";
import EmployerJobs from "./pages/employer/EmployerJobs";
import JobAnalytics from "./pages/employer/JobAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/about" element={<About />} />

              {/* Job Seeker Routes */}
              <Route
                path="/seeker"
                element={
                  <ProtectedRoute requiredRole="jobseeker">
                    <Navigate to="/seeker/dashboard" replace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seeker/dashboard"
                element={
                  <ProtectedRoute requiredRole="jobseeker">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Employer Routes */}
              <Route
                path="/employer"
                element={
                  <ProtectedRoute requiredRole="employer">
                    <Navigate to="/employer/dashboard" replace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/dashboard"
                element={
                  <ProtectedRoute requiredRole="employer">
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/post-job"
                element={
                  <ProtectedRoute requiredRole="employer">
                    <PostJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/jobs/:id"
                element={<EmployerJobDetails />}
              />
              <Route
                path="/employer/analytics"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/jobs"
                element={
                  <ProtectedRoute requiredRole="employer">
                    <EmployerJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/jobs/:id/analytics"
                element={
                  <ProtectedRoute requiredRole="employer">
                    <JobAnalytics />
                  </ProtectedRoute>
                }
              />

              {/* Legacy Routes - Redirects to new structured routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="jobseeker">
                    <Navigate to="/seeker/dashboard" replace />
                  </ProtectedRoute>
                }
              />

              {/* Profile Route */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
