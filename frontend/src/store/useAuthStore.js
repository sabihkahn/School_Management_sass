import { create } from 'zustand';
import axios from 'axios';
import baseUrl from '../BaseUrl';
import toast from 'react-hot-toast';

// Create an axios instance that sends cookies automatically
export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/api`,
    withCredentials: true, // Crucial for reading/setting cookies
});

export const useAuthStore = create((set) => ({
    User: null,
    isCheckingAuth: true,

    // Set user manually if needed
    setUser: (data) => set({ User: data }),

    // Login Function
    login: async (formData) => {
        try {
            const res = await axiosInstance.post("/auth/login", formData);
            set({ User: res.data.schooldata });
            toast.success("Welcome back!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            return false;
        }
    },


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ User: res.data.schooldata });
        } catch (error) {
            set({ User: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (formData) => {
        try {
            const res = await axiosInstance.post("/auth/register", formData);
            set({ User: res.data.schooldata });
            toast.success("School Registered Successfully!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            return false;
        }
    },
    
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ User: null }); // This is what updates your Header instantly
            toast.success("Logged out successfully");
            return true;
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Logout failed");
            return false;
        }
    },

}));