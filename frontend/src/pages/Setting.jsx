import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, User as UserIcon, ShieldCheck, School, Mail, Save } from "lucide-react";
import toast from "react-hot-toast"; // Only import toast, NOT Toaster
import { motion } from "framer-motion";

const Setting = () => {
  const { User, setUser } = useAuthStore();
  const [form, setForm] = useState({
    schoolName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (User) {
      setForm({
        schoolName: User.schoolName || "",
        password: "",
      });
    }
  }, [User]);

  // UI Logic: Check if anything actually changed
  const isChanged = form.schoolName !== User?.schoolName || form.password.length > 0;
  const isNameEmpty = !form.schoolName.trim();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // STRICT VALIDATION
    if (isNameEmpty) {
      return toast.error("School name cannot be empty");
    }
    if (!isChanged) {
      return toast.error("No changes were made");
    }

    try {
      setLoading(true);
      const payload = {};
      if (form.schoolName !== User?.schoolName) payload.schoolName = form.schoolName;
      if (form.password) payload.password = form.password;

      const res = await axiosInstance.put("/auth/update", payload);
      setUser(res.data.schooldata);
      toast.success("Profile updated!");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      {/* IMPORTANT: I removed <Toaster /> from here. 
         Check your App.jsx for the single instance of <Toaster /> 
      */}

      <main className="flex-1 overflow-y-scroll h-150 flex flex-col items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          {/* Card Container */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden">
            
            {/* Header Section */}
            <div className="bg-blue-600 px-8 py-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-2xl font-bold">School Settings</h1>
                <p className="text-blue-100 text-sm opacity-90">Update your account preferences</p>
              </div>
              {/* Abstract decoration */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="p-8 lg:p-10">
              {/* Profile Avatar Area */}
              <div className="flex items-center gap-5 mb-10 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                  <UserIcon size={28} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">{User?.schoolName}</h2>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <Mail size={14} /> {User?.email}
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Input Groups */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">School Name</label>
                    <div className="relative group">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input
                        type="text"
                        name="schoolName"
                        value={form.schoolName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                    <div className="relative group">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <motion.button
                  whileHover={isChanged && !isNameEmpty ? { scale: 1.02 } : {}}
                  whileTap={isChanged && !isNameEmpty ? { scale: 0.98 } : {}}
                  disabled={loading || !isChanged || isNameEmpty}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg
                    ${isChanged && !isNameEmpty 
                      ? "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700" 
                      : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200"
                    }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Save size={18} />
                      Update Profile
                    </>
                  )}
                </motion.button>
                
                {!isChanged && !loading && (
                  <p className="text-center text-xs text-slate-400">Change a field to enable the update button</p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Setting;