import { create } from 'zustand';
import { axiosInstance } from '../api/AxiosInstance.jsx';
import toast from 'react-hot-toast';

export const useStudentStore = create((set, get) => ({
  students: [],
  unpaidStudents: [],
  totalStudents: 0,
  loading: false,
  loadnow: false,
  currentPage: 1,

  setPage: (page) => set({ currentPage: page }),

  // CREATE STUDENT
  createStudent: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/createstudent', data);
      toast.success(res.data.message || "Student created successfully");
      get().getStudents(get().currentPage);
      get().getStudentCount();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating student");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // GET ALL STUDENTS
  getStudents: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/students?page=${page}&limit=${limit}`);
      set({ students: res.data.students || res.data || [] });
    } catch (error) {
      toast.error("Failed to fetch students");
      set({ students: [] });
    } finally {
      set({ loading: false });
    }
  },

  // DELETE STUDENT (Optimistic Update)
  deleteStudent: async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    const previousStudents = get().students;
    
    set((state) => ({
      students: state.students.filter((s) => s._id !== id),
      totalStudents: Math.max(0, state.totalStudents - 1)
    }));

    try {
      await axiosInstance.delete(`/deletestudent/${id}`);
      toast.success("Student deleted");
    } catch (error) {
      toast.error("Delete failed. Rolling back...");
      set({ students: previousStudents });
    }
  },

  // UPDATE STUDENT
  updateStudent: async (id, data) => {
    try {
      await axiosInstance.put(`/updatestudent/${id}`, data);
      toast.success("Updated successfully");
      set((state) => ({
        students: state.students.map((s) => (s._id === id ? { ...s, ...data } : s)),
      }));
      return true;
    } catch (error) {
      toast.error("Update failed");
      return false;
    }
  },

  // MARK AS PAID
  markAsPaid: async (id) => {
    try {
      await axiosInstance.put(`/setunpaidstudent/${id}`);
      toast.success("Payment status updated");
      get().getStudents(get().currentPage); 
    } catch (error) {
      toast.error("Failed to update payment");
    }
  },

  // SEARCH
  searchStudent: async (name) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/StudentByName?name=${name}`);
      set({ students: Array.isArray(res.data) ? res.data : [res.data] });
    } catch (error) {
      set({ students: [] });
    } finally {
      set({ loading: false });
    }
  },

  // GET STUDENTS BY CLASS
  getStudentsByClass: async (classin) => {
    if (!classin) return get().getStudents();
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/getallstudentsbyclassname?classin=${classin}`);
      set({ students: res.data });
    } catch (error) {
      toast.error("No students found for this class");
      set({ students: [] });
    } finally {
      set({ loading: false });
    }
  },

  // GET UNPAID STUDENTS
  getUnpaidStudents: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/getAllunpaidstudents`);
      set({ students: res.data });
    } catch (error) {
      set({ students: [] });
      toast.error("No unpaid records found");
    } finally {
      set({ loading: false });
    }
  },

  // COUNT
  getStudentCount: async () => {
    try {
      const res = await axiosInstance.get('/allStudentscount');
      set({ totalStudents: res.data.TotalStudentCount });
    } catch (error) {
      console.error("Count Error:", error);
    }
  },
}));