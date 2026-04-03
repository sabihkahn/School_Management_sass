import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useStudentStore } from '../store/useStudentStore';
import { Trash2, CheckCircle, Search, Plus, Loader2, X, Edit2, User, Phone, Mail, BookOpen, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const StudentManagement = () => {
  const {
    students, getStudents, deleteStudent, markAsPaid, searchStudent,
    getUnpaidStudents, getStudentsByClass, getStudentCount, createStudent,
    updateStudent, totalStudents, loading, currentPage, setPage
  } = useStudentStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", classin: "", fatherName: "", motherName: "",
    lastPaidDate: "", coarse: "", image: "", parentsNumber: ""
  });

  useEffect(() => {
    getStudentCount();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchStudent(searchTerm);
      } else if (classFilter !== "") {
        getStudentsByClass(classFilter);
      } else {
        getStudents(currentPage);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage, classFilter]);

  useEffect(() => {
    if (selectedStudent) {
      setForm({
        ...selectedStudent,
        lastPaidDate: selectedStudent.lastPaidDate?.split('T')[0] || ""
      });
    }
  }, [selectedStudent]);

  const handleUpdate = async () => {
    const success = await updateStudent(selectedStudent._id, form);
    if (success) {
      setIsEditing(false);
      setSelectedStudent({ ...selectedStudent, ...form });
    }
  };

  return (
    <div className='flex min-h-screen bg-[#ffffff] text-slate-900 font-sans'>
      <Sidebar />

      <main className='flex-1 overflow-y-scroll h-160 p-4 md:p-8 overflow-x-hidden'>
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
          <div>
            <h1 className='text-3xl font-extrabold tracking-tight text-slate-950'>Student Directory</h1>
            <p className='text-slate-500 font-medium'>Manage {totalStudents} active student records</p>
          </div>
          <button
            onClick={() => {
              setForm({ name: "", email: "", classin: "", fatherName: "", motherName: "", lastPaidDate: "", coarse: "", image: "", parentsNumber: "" });
              setShowAddModal(true);
            }}
            className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95'
          >
            <Plus size={20} />
            <span className="font-semibold">Add New Student</span>
          </button>
        </div>

        {/* FILTERS */}
        <div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center'>
          <div className='relative flex-1 min-w-[280px]'>
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {loading ? <Loader2 className='animate-spin text-blue-500' size={18}/> : <Search className='text-slate-400' size={18}/>}
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search by name or email...'
              className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none'
            />
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className='px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none'
          >
            <option value="">All grades</option>
            {[...Array(12)].map((_, i) => <option key={i} value={i + 1}>Grade {i + 1}</option>)}
          </select>

          <button onClick={getUnpaidStudents} className='px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl'>
            Defaulters List
          </button>
        </div>

        {/* TABLE */}
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-50/50 border-b border-slate-200'>
                <th className='p-4 text-xs font-bold uppercase text-slate-500'>Student Profile</th>
                <th className='p-4 text-xs font-bold uppercase text-slate-500 hidden md:table-cell'>Academic Info</th>
                <th className='p-4 text-xs font-bold uppercase text-slate-500 hidden lg:table-cell'>Contact</th>
                <th className='p-4 text-xs font-bold uppercase text-slate-500 text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {students?.map((s) => (
                <tr key={s._id} onClick={() => { setSelectedStudent(s); setIsEditing(false); }} className='group hover:bg-blue-50/40 cursor-pointer transition-colors'>
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <img src={s.image || "https://via.placeholder.com/150"} alt="" className="h-10 w-10 rounded-full object-cover border" />
                      <div>
                        <div className='font-bold text-slate-900 capitalize'>{s.name}</div>
                        <div className='text-xs text-slate-500'>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className='p-4 hidden md:table-cell'>
                    <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700'>Grade {s.classin}</span>
                    <div className='text-xs text-slate-500 mt-1'>{s.coarse}</div>
                  </td>
                  <td className='p-4 hidden lg:table-cell text-sm text-slate-600'>{s.parentsNumber}</td>
                  <td className='p-4 text-right' onClick={(e) => e.stopPropagation()}>
                    <div className='flex justify-end gap-1'>
                      <button onClick={() => markAsPaid(s._id)} className='p-2 text-slate-400 hover:text-emerald-600'><CheckCircle size={18}/></button>
                      <button onClick={() => deleteStudent(s._id)} className='p-2 text-slate-400 hover:text-red-600'><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className='flex items-center justify-between mt-6'>
          <p className='text-sm text-slate-500'>Page <b>{currentPage}</b></p>
          <div className='flex gap-2'>
            <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} className='p-2 border rounded-lg bg-white disabled:opacity-50'><ChevronLeft size={20}/></button>
            <button onClick={() => setPage(currentPage + 1)} className='p-2 border rounded-lg bg-white'><ChevronRight size={20}/></button>
          </div>
        </div>
      </main>

      {/* SIDE PANEL (Profile/Full Edit Access) */}
      {selectedStudent && (
        <div className='fixed inset-0 z-[60] flex justify-end'>
          <div className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm' onClick={() => setSelectedStudent(null)} />
          <div className='relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col'>
            <div className='p-6 border-b flex items-center justify-between bg-slate-50'>
              <h2 className='text-xl font-extrabold'>Student Profile</h2>
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(!isEditing)} className='p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors'>
                  {isEditing ? <X size={20}/> : <Edit2 size={20}/>}
                </button>
                <button onClick={() => setSelectedStudent(null)} className='p-2 text-slate-400 hover:bg-slate-100 rounded-lg'><X size={20}/></button>
              </div>
            </div>
            
            <div className='flex-1 overflow-y-auto p-6 space-y-6'>
              <div className='flex flex-col items-center mb-4'>
                  <img src={form.image || "https://via.placeholder.com/150"} className='w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg mb-2' alt="Profile" />
                  {!isEditing && <h3 className='text-xl font-bold'>{form.name}</h3>}
              </div>

              <div className='grid grid-cols-1 gap-5'>
                <ProfileField label="Full Name" icon={<User size={18}/>} isEditing={isEditing} value={form.name} name="name" onChange={setForm} form={form} />
                <ProfileField label="Email Address" icon={<Mail size={18}/>} isEditing={isEditing} value={form.email} name="email" onChange={setForm} form={form} />
                
                <div className='grid grid-cols-2 gap-4'>
                    <ProfileField label="Class / Grade" icon={<BookOpen size={18}/>} isEditing={isEditing} value={form.classin} name="classin" type="number" onChange={setForm} form={form} />
                    <ProfileField label="Parent Contact" icon={<Phone size={18}/>} isEditing={isEditing} value={form.parentsNumber} name="parentsNumber" onChange={setForm} form={form} />
                </div>

                <ProfileField label="Course Name" icon={<BookOpen size={18}/>} isEditing={isEditing} value={form.coarse} name="coarse" onChange={setForm} form={form} />
                
                <div className='grid grid-cols-2 gap-4'>
                    <ProfileField label="Father's Name" icon={<User size={18}/>} isEditing={isEditing} value={form.fatherName} name="fatherName" onChange={setForm} form={form} />
                    <ProfileField label="Mother's Name" icon={<User size={18}/>} isEditing={isEditing} value={form.motherName} name="motherName" onChange={setForm} form={form} />
                </div>

                <ProfileField label="Last Payment Date" icon={<Calendar size={18}/>} isEditing={isEditing} value={form.lastPaidDate} name="lastPaidDate" type="date" onChange={setForm} form={form} />
                <ProfileField label="Profile Image URL" icon={<ImageIcon size={18}/>} isEditing={isEditing} value={form.image} name="image" onChange={setForm} form={form} />
              </div>

              {isEditing && (
                <button onClick={handleUpdate} className='w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all mt-4'>
                  Save All Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL (Full Input Fields) */}
      {showAddModal && (
        <div className='fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm'>
          <div className='bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl'>
            <div className='p-6 border-b flex justify-between items-center bg-slate-50'>
              <h2 className='text-2xl font-black text-slate-900'>New Student Enrollment</h2>
              <button onClick={() => setShowAddModal(false)} className='p-2 hover:bg-slate-200 rounded-full'><X/></button>
            </div>
            
            <div className='p-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {[
                  { label: "Student Name", key: "name", type: "text" },
                  { label: "Email Address", key: "email", type: "email" },
                  { label: "Father's Name", key: "fatherName", type: "text" },
                  { label: "Mother's Name", key: "motherName", type: "text" },
                  { label: "Parent's Phone", key: "parentsNumber", type: "text" },
                  { label: "Class/Grade", key: "classin", type: "number" },
                  { label: "Enrolled Course", key: "coarse", type: "text" },
                  { label: "Profile Image Link", key: "image", type: "text" }
                ].map((input) => (
                  <div key={input.key}>
                    <label className='text-xs font-bold text-slate-400 uppercase mb-1 block'>{input.label}</label>
                    <input 
                      type={input.type}
                      placeholder={`Enter ${input.label.toLowerCase()}`}
                      className='w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                      onChange={(e) => setForm({...form, [input.key]: e.target.value})} 
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className='text-xs font-bold text-slate-400 uppercase mb-1 block'>Last Paid Date</label>
                  <input 
                    type="date"
                    className='w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all'
                    onChange={(e) => setForm({...form, lastPaidDate: e.target.value})} 
                  />
                </div>
              </div>
              
              <button 
                onClick={async () => { if (await createStudent(form)) setShowAddModal(false); }} 
                className='mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl transition-all'
              >
                Enroll Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Sub-component for Profile Fields
const ProfileField = ({ label, icon, isEditing, value, name, type = "text", onChange, form }) => (
  <div className='group'>
    <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block'>{label}</label>
    <div className='flex items-center gap-3'>
      <div className='text-slate-400 group-hover:text-blue-500 transition-colors'>{icon}</div>
      {isEditing ? (
        <input 
          type={type} 
          value={value} 
          name={name}
          onChange={(e) => onChange({ ...form, [name]: e.target.value })} 
          className='flex-1 border-b border-slate-200 focus:border-blue-500 py-1 outline-none font-medium bg-transparent' 
        />
      ) : (
        <div className='font-semibold text-slate-700 truncate'>
            {type === 'date' && value ? new Date(value).toLocaleDateString('en-US', { dateStyle: 'long' }) : (value || 'Not provided')}
        </div>
      )}
    </div>
  </div>
);

export default StudentManagement;