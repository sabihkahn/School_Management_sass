import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Privacy', path: '/privacy' },
  ];

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          
          {/* LOGO: The Academic Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-[#0058be] to-[#6b38d4] p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-[#191c1d] font-manrope">
              SchoolSaaS
            </span>
          </motion.div>

          {/* DESKTOP NAV: Editorial Style */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8 text-[13px] font-bold uppercase tracking-[0.15em] text-gray-500">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`hover:text-[#0058be] transition-colors relative group ${
                    location.pathname === link.path ? 'text-[#0058be]' : ''
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0058be] transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-gray-200 mx-2" />

            <button 
              onClick={() => navigate("/login")}
              className="relative group px-7 py-3 overflow-hidden rounded-full bg-[#191c1d] text-white font-bold text-sm transition-all hover:pr-10"
            >
              <span className="relative z-10">Login</span>
              <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-white w-4 h-4" />
              {/* Subtle primary glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0058be] to-[#6b38d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 bg-gray-100 rounded-xl text-gray-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU: Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6 font-manrope">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-gray-900 hover:text-[#0058be]"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-100" />
              <button 
                onClick={() => { navigate("/login"); setIsOpen(false); }}
                className="w-full py-4 bg-[#191c1d] text-white rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                Access Dashboard <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;