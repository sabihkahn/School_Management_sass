import React, {  useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Settings, 
  ChevronRight, 
  LogOut,
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {useAuthStore} from '../store/useAuthStore'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
const {User} = useAuthStore()

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Student Management', icon: <Users size={20} />, path: '/dashboard/students' },
    { name: 'Teacher Management', icon: <GraduationCap size={20} />, path: '/dashboard/teacher' },
    { name: 'Academic Records', icon: <BookOpen size={20} />, path: '/dashboard/records' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={() => setIsOpen(false)}
        className={`flex items-center justify-between px-4 py-3 mb-2 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
        }`}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span className="font-medium">{item.name}</span>
        </div>
        {isActive && <ChevronRight size={16} />}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-72 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        flex flex-col h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo Section */}
        <div className="p-6 mb-4">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {User.schoolName} 
                         </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Main Menu
          </p>
          {menuItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        {/* Bottom Profile/Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors group">
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;