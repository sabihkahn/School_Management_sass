import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Loader2 } from "lucide-react"; // For a nice loading spinner

// Store & Pages
import { useAuthStore } from './store/useAuthStore';
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Feature from "./pages/Feature";
import Register from "./pages/Register";

const App = () => {
  const { User, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // IMPORTANT: Show a loader while the app checks the cookie.
  // Otherwise, the protected route will redirect to /login before the check finishes.
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="animate-spin text-[#0058be]" size={40} />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/features" element={<Feature />} />

        {/* Redirect away from Login/Register if already logged in */}
        <Route path="/login" element={!User ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!User ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={User ? <Dashboard /> : <Navigate to="/login" />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;