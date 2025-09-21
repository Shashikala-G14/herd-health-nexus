import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

// Farmer Pages  
import Dashboard from "./pages/farmer/Dashboard";
import RiskAssessment from "./pages/farmer/RiskAssessment";
import Training from "./pages/farmer/Training";
import Alerts from "./pages/farmer/Alerts";
import Profile from "./pages/farmer/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import FarmerManagement from "./pages/admin/FarmerManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<Layout />}>
            {/* Farmer Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="risk-assessment" element={<RiskAssessment />} />
            <Route path="training" element={<Training />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="profile" element={<Profile />} />
            
            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/farmers" element={<FarmerManagement />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
