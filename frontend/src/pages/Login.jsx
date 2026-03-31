import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight, GraduationCap } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  
  // Extract login function from store
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Call the store login (which calls the backend)
    const success = await login(formData);
    
    setLoading(false);
    if (success) {
      navigate("/"); // Redirect to dashboard on success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-6 font-manrope">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-[450px]"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-br from-[#0058be] to-[#6b38d4] p-3 rounded-2xl shadow-xl mb-4">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-[#191c1d]">Welcome Back</h1>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0058be] transition-colors" size={18} />
                <input
                  type="email"
                  required
                  placeholder="admin@school.com"
                  className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20 transition-all"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0058be] transition-colors" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20 transition-all"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading} 
              className="w-full bg-[#191c1d] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-70 group"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={18} /></>}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-[#0058be] font-bold hover:underline">Register School</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;