import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, Edit2, Trash2, User, Mail, X, Camera,
  Phone, GraduationCap, DollarSign, BookOpen, 
  ChevronLeft, ChevronRight, RotateCcw, Loader2, Briefcase
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "../api/AxiosInstance";
import Sidebar from "../components/Sidebar";

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Matches your backend default

  const [form, setForm] = useState({
    name: "", email: "", phoneNumber: "",
    degree: "", image: "", Salary: "", subject: "",
  });

  const fetchTeachers = useCallback(async (page = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const endpoint = searchQuery 
        ? `/searchTeacher?name=${searchQuery}` 
        : `/getAllteacher?page=${page}&limit=${limit}`;
      const res = await axiosInstance.get(endpoint);
      // Your backend returns the array directly: res.status(200).send(teachers)
      setTeachers(res.data || []);
    } catch (err) {
      setTeachers([]);
      if (err.response?.status !== 400) toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTeachers(currentPage); }, [currentPage, fetchTeachers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = editingId
      ? axiosInstance.put(`/updateTeacher/${editingId}`, form)
      : axiosInstance.post("/createTeacher", form);

    toast.promise(promise, {
      loading: 'Saving to database...',
      success: () => {
        setForm({ name: "", email: "", phoneNumber: "", degree: "", image: "", Salary: "", subject: "" });
        setEditingId(null);
        fetchTeachers(currentPage);
        return editingId ? "Updated successfully!" : "Teacher created!";
      },
      error: (err) => err.response?.data?.message || "Operation failed",
    });
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this teacher record?")) return;
    try {
      await axiosInstance.delete(`/deleteTeacher/${id}`);
      toast.success("Record deleted");
      fetchTeachers(currentPage);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] text-slate-900">
      <Toaster position="top-right" />
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Teacher Administration</h1>
            <p className="text-blue-600/60 text-sm font-medium">Manage faculty records and payroll</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-blue-100">
            <div className="flex items-center px-3 gap-2">
              <Search className="text-blue-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search name..."
                className="bg-transparent border-none focus:ring-0 text-sm w-40 lg:w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button onClick={() => fetchTeachers(1, search)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all">
              Search
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Registration Form */}
          <section className="xl:col-span-4">
            <motion.div layout className="bg-white p-6 rounded-3xl shadow-md border border-blue-50">
              <h2 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                <div className={`p-2 rounded-lg ${editingId ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                  {editingId ? <Edit2 size={18}/> : <Plus size={18}/>}
                </div>
                {editingId ? "Modify Teacher" : "Register Teacher"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormInput icon={User} name="name" placeholder="Full Name" value={form.name} onChange={setForm} />
                  <FormInput icon={Mail} name="email" type="email" placeholder="Email Address" value={form.email} onChange={setForm} />
                  <FormInput icon={Phone} name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={setForm} />
                  <FormInput icon={BookOpen} name="subject" placeholder="Teaching Subject" value={form.subject} onChange={setForm} />
                  <FormInput icon={GraduationCap} name="degree" placeholder="Qualification/Degree" value={form.degree} onChange={setForm} />
                  <FormInput icon={DollarSign} name="Salary" placeholder="Monthly Salary" value={form.Salary} onChange={setForm} />
                  <FormInput icon={Camera} name="image" placeholder="Image URL (e.g. https://...)" value={form.image} onChange={setForm} />
                </div>

                <button className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all shadow-lg ${editingId ? 'bg-amber-500 shadow-amber-100 hover:bg-amber-600' : 'bg-blue-600 shadow-blue-100 hover:bg-blue-700'}`}>
                  {editingId ? "Update Teacher" : "Save Record"}
                </button>
                {editingId && (
                  <button type="button" onClick={() => {setEditingId(null); setForm({name:"",email:"",phoneNumber:"",degree:"",image:"",Salary:"",subject:""})}} className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors">Cancel</button>
                )}
              </form>
            </motion.div>
          </section>

          {/* Teacher Table */}
          <section className="xl:col-span-8">
            <div className="bg-white rounded-3xl shadow-md border border-blue-50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-blue-50/50 text-blue-900/40 text-[10px] uppercase tracking-[0.2em] font-black border-b border-blue-50">
                    <tr>
                      <th className="px-6 py-5">Profile</th>
                      <th className="px-6 py-5">Expertise</th>
                      <th className="px-6 py-5">Salary</th>
                      <th className="px-6 py-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50">
                    {loading ? (
                      <tr><td colSpan="4" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                    ) : teachers.map((t) => (
                      <motion.tr 
                        key={t._id} 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={() => setSelectedTeacher(t)}
                        className="hover:bg-blue-50/30 cursor-pointer transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={t.image || "https://ui-avatars.com/api/?name="+t.name} alt="" className="w-10 h-10 rounded-xl object-cover border border-blue-100" />
                            <div>
                              <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                              <div className="text-slate-400 text-[11px]">{t.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100/50 text-blue-700 rounded-lg text-[10px] font-black uppercase">{t.subject}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-600">${t.Salary}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); setForm(t); setEditingId(t._id); window.scrollTo({top:0, behavior:'smooth'})}} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
                            <button onClick={(e) => handleDelete(e, t._id)} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="p-4 bg-slate-50/50 flex justify-between items-center border-t border-blue-50">
                <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-blue-100 transition-all text-blue-600 disabled:opacity-30" disabled={currentPage === 1}><ChevronLeft size={20}/></button>
                <span className="text-xs font-black text-blue-900/30 uppercase tracking-widest">Page {currentPage}</span>
                <button onClick={() => setCurrentPage(p => p + 1)} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-blue-100 transition-all text-blue-600 disabled:opacity-30" disabled={teachers.length < limit}><ChevronRight size={20}/></button>
              </div>
            </div>
          </section>
        </div>

        {/* --- TEACHER DETAIL DRAWER --- */}
        <AnimatePresence>
          {selectedTeacher && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTeacher(null)} className="fixed inset-0 bg-blue-900/20 backdrop-blur-md z-40" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-8">
                <button onClick={() => setSelectedTeacher(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
                
                <div className="mt-8 text-center">
                  <img src={selectedTeacher.image} alt={selectedTeacher.name} className="w-32 h-32 rounded-[2.5rem] mx-auto object-cover border-4 border-blue-50 shadow-xl mb-6" />
                  <h2 className="text-2xl font-black text-blue-900">{selectedTeacher.name}</h2>
                  <p className="text-blue-500 font-bold uppercase text-xs tracking-widest mb-8">{selectedTeacher.subject} Faculty</p>
                  
                  <div className="grid grid-cols-1 gap-4 text-left">
                    <DetailCard icon={Mail} label="Email" value={selectedTeacher.email} />
                    <DetailCard icon={Phone} label="Phone" value={selectedTeacher.phoneNumber} />
                    <DetailCard icon={GraduationCap} label="Degree" value={selectedTeacher.degree} />
                    <DetailCard icon={Briefcase} label="Department" value={selectedTeacher.subject} />
                    <div className="flex items-center justify-between p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                      <div className="flex items-center gap-3">
                        <DollarSign size={20} />
                        <span className="text-sm font-medium">Monthly Compensation</span>
                      </div>
                      <span className="text-xl font-black">${selectedTeacher.Salary}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const FormInput = ({ icon: Icon, name, value, onChange, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 group-focus-within:text-blue-500 transition-colors">
      <Icon size={16} />
    </div>
    <input
      required
      className="w-full pl-11 pr-4 py-3 bg-blue-50/50 border border-blue-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
      value={value}
      name={name}
      onChange={(e) => onChange(prev => ({ ...prev, [name]: e.target.value }))}
      {...props}
    />
  </div>
);

const DetailCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="p-2.5 bg-white rounded-xl text-blue-500 shadow-sm"><Icon size={18}/></div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value}</p>
    </div>
  </div>
);