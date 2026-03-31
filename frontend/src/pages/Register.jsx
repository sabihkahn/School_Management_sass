import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight, GraduationCap, Building2, MapPin, ImageIcon, Hash } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    schoolName: "",
    address: "",
    schoolLogo: "",
    email: "",
    password: "",
    classes: "" // Handled as a single value
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Data Cleaning & Type Casting
    const classNum = Number(formData.classes);
    const payload = {
        ...formData,
        classes: classNum, // Sending as a single number, not an array
        email: formData.email.trim().toLowerCase(),
    };

    // 2. Strict Length & Value Validation
    if (formData.schoolName.length < 3 || formData.schoolName.length > 50) {
        return toast.error("School name must be between 3 and 50 characters");
    }
    if (formData.address.length < 5 || formData.address.length > 100) {
        return toast.error("Address must be between 5 and 100 characters");
    }
    if (classNum <= 0 || classNum > 100) {
        return toast.error("Please enter a valid number of classes (1-100)");
    }
    
    // 3. Password Regex (8-12 chars, letter + number) - Matches your Backend
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!passwordRegex.test(formData.password)) {
      return toast.error("Password: 8-12 chars, must include a letter and a number");
    }

    setLoading(true);
    const success = await register(payload);
    setLoading(false);
    
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-[#f8f9fa] px-6 font-manrope">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-[550px]"
      >
        {/* BRANDING */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-[#0058be] to-[#6b38d4] p-4 rounded-2xl shadow-xl mb-4">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-[#191c1d]">Register School</h1>
        </div>

        {/* FORM CARD */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white">
          <form onSubmit={handleRegister} className="space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SCHOOL NAME */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">School Name</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
                  <input 
                    type="text" 
                    required 
                    maxLength={50}
                    placeholder="Global Academy"
                    className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20" 
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} 
                  />
                </div>
              </div>

              {/* SINGLE CLASS NUMBER */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Total Classes</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
                  <input 
                    type="number" 
                    required 
                    placeholder="e.g. 15"
                    className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20" 
                    onChange={(e) => setFormData({ ...formData, classes: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            {/* LOGO URL */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Logo URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
                <input 
                  type="url" 
                  required 
                  maxLength={200}
                  placeholder="https://example.com/logo.png"
                  className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20" 
                  onChange={(e) => setFormData({ ...formData, schoolLogo: e.target.value })} 
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Physical Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
                <input 
                  type="text" 
                  required 
                  maxLength={100}
                  placeholder="123 Education Lane, NY"
                  className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20" 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
                  <input 
                    type="email" 
                    required 
                    maxLength={50}
                    placeholder="admin@school.com"
                    className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20" 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
                  <input 
                    type="password" 
                    required 
                    maxLength={12}
                    placeholder="8-12 chars"
                    className="w-full bg-[#f3f4f5] border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0058be]/20" 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading} 
              className="w-full bg-[#191c1d] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-4 transition-all hover:bg-black disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>Register School <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          Already registered?{" "}
          <Link to="/login" className="text-[#0058be] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;