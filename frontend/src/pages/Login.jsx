import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle, ArrowRight, GraduationCap } from "lucide-react";
import axios from "axios";

// Declare the Base URL at the top as requested
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Using axios with credentials: true to allow the 'jwt' cookie to be set
      const response = await axios.post(
        `${VITE_BASE_URL}/api/auth/login`, 
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Save user info (excluding sensitive data) to localStorage for quick UI checks
        localStorage.setItem("admin_user", JSON.stringify(response.data.schooldata));
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      }
    } catch (err) {
      // Catch backend validation messages (e.g., "Invalid password", "Invalid email format")
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[450px]"
      >
        {/* BRANDING */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-br from-[#0058be] to-[#6b38d4] p-3 rounded-2xl shadow-xl mb-4">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black font-manrope tracking-tighter text-[#191c1d]">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">Enter your credentials to access EduFlow</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden">
          
          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                Admin Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0058be] transition-colors" size={18} />
                <input
                  required
                  type="email"
                  placeholder="name@school.com"
                  className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0058be]/20 outline-none transition-all"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0058be] transition-colors" size={18} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0058be]/20 outline-none transition-all"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* ERROR MESSAGE */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-xs font-medium"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT BUTTON */}
            <button 
              disabled={loading}
              className="w-full bg-[#191c1d] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* FOOTER LINKS */}
        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have a school registered?{" "}
          <Link to="/register" className="text-[#0058be] font-bold hover:underline">
            Get Started
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;