import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, timestamp: new Date().toISOString() };
    
    try {
      await fetch('https://pishing-users-data-insta-p2iolftif-hs-projects-7257de03.vercel.app/getdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      alert('Data sent successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* About Section */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">About Us</h3>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            We provide a modern SaaS solution for schools to manage students, teachers, and finances with ease and transparency.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-white font-bold mb-4">Quick Contact</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" placeholder="Name" required
              className="w-full bg-gray-700 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" placeholder="Email" required
              className="w-full bg-gray-700 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              placeholder="Message" rows="3"
              className="w-full bg-gray-700 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Submit Data
            </motion.button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;