import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserSquare2, 
  GraduationCap, 
  Menu, 
  X, 
  LogOut,
  School
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const SidebarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, User } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Students', path: '/students', icon: <UserSquare2 size={20} /> },
    { name: 'Manage Teachers', path: '/teachers', icon: <GraduationCap size={20} /> },
  ];

  const activeClass = "bg-blue-600 text-white shadow-md shadow-blue-200";
  const inactiveClass = "text-gray-600 hover:bg-gray-100";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <School size={24} />
            </div>
            <span className="font-bold text-xl text-gray-800 truncate">
              {User?.schoolName || "EduManager"}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  location.pathname === item.path ? activeClass : inactiveClass
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-gray-800">{User?.schoolName}</p>
               <p className="text-xs text-gray-500">{User?.email}</p>
             </div>
             <img 
               src={User?.schoolLogo || "https://ui-avatars.com/api/?name=School"} 
               alt="Logo" 
               className="h-10 w-10 rounded-full border border-gray-200 object-cover"
             />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;