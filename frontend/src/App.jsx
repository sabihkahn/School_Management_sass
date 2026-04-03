import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Added useLocation
import { Toaster } from 'react-hot-toast';
import { Loader2 } from "lucide-react";

// Store & Pages
import { useAuthStore } from './store/useAuthStore';
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Feature from "./pages/Feature";
import Register from "./pages/Register";
import NewDashboard from "./pages/NewDashboard";
import StudentManagement from "./pages/StudentManagement";
import TeacherManagement from './pages/TeacherManagement'
import Setting from "./pages/Setting";


const App = () => {
  const { User, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation(); // Get current route

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Check if the current route is a dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

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
      
    
      {!isDashboard && <Header />}

      <main className={isDashboard ? "" : "min-h-[80vh]"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/features" element={<Feature />} />

          <Route path="/login" element={!User ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!User ? <Register /> : <Navigate to="/dashboard" />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={User ? <NewDashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/students" element={User ?<StudentManagement /> :  <Navigate to="/login" />} />
          <Route path="/dashboard/teacher" element={User?<TeacherManagement /> : <Navigate to="/login" /> } />
          <Route path="/dashboard/settings" element={User?<Setting /> : <Navigate to="/login" /> } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      
      {!isDashboard && <Footer />}
    </>
  );
};

export default App;