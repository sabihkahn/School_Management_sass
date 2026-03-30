import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Users, DollarSign, Trash2 } from 'lucide-react';

const Hero = () => {

  const stats = [
    { label: 'Total Students', value: '1,240', icon: Users, color: 'text-blue-600' },
    { label: 'Active Teachers', value: '48', icon: UserPlus, color: 'text-green-600' },
    { label: 'Unpaid Fees', value: '12', icon: DollarSign, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900">School Management</h1>
          <p className="text-gray-500 mt-2">Welcome back, Administrator.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h2>
              </div>
              <div className={`${stat.color} bg-opacity-10 p-4 rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Management Table Mockup */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Recent Records</h3>
            <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold">Get Records</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Ali Ahmed', role: 'Student', status: 'Unpaid', color: 'bg-red-100 text-red-600' },
                  { name: 'Sara Khan', role: 'Teacher', status: 'Active', color: 'bg-green-100 text-green-600' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 text-gray-600">{row.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.color}`}>{row.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3 text-gray-400">
                      <button className="hover:text-red-500"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;