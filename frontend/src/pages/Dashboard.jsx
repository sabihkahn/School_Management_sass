import React, { useEffect } from 'react';
import { Users, GraduationCap, DollarSign, AlertCircle, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useAuthStore } from '../store/useAuthStore';

const Dashboard = () => {
  // Pull what we need directly from the store
  const { Data, fetchDashboardData, isLoggingIn } = useAuthStore(); 
  // Note: I assume you have a loading state in your store. 
  // If not, I'll use a local one below.
  const [localLoading, setLocalLoading] = React.useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLocalLoading(true);
      await fetchDashboardData();
      setLocalLoading(false);
    };
    loadData();
  }, [fetchDashboardData]);

  if (localLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading institutional data...</p>
        </div>
      </div>
    );
  }

  // Use Data directly from store with fallbacks
  const chartData = [
    { name: 'Paid Students', value: Data?.paidCount || 0 },
    { name: 'Unpaid Students', value: Data?.unpaidStudets || 0 },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  return (
    <div className="min-h-screen bg-gray-50 p-4  md:p-8">
      <header className="mb-6 mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-7">
     
        <div className="bg-white px-12 py-3 mt-3 rounded-lg shadow-sm border border-gray-200 text-sm font-medium text-gray-600">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={Data?.totalStudents} icon={<Users className="text-blue-600" />} bgColor="bg-blue-50" />
        <StatCard title="Total Teachers" value={Data?.totalTeacher} icon={<GraduationCap className="text-purple-600" />} bgColor="bg-purple-50" />
        <StatCard title="Paid (Last 30d)" value={Data?.paidCount} icon={<DollarSign className="text-green-600" />} bgColor="bg-green-50" />
        <StatCard title="Pending Fees" value={Data?.unpaidStudets} icon={<AlertCircle className="text-red-600" />} bgColor="bg-red-50" />
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Pie Chart Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800">Fee Status Distribution</h2>
            <p className="text-sm text-gray-500">Comparison of paid vs unpaid enrollments</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800">Human Resources</h2>
            <p className="text-sm text-gray-500">Student to Teacher ratio analysis</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Students', count: Data?.totalStudents || 0 },
                { name: 'Teachers', count: Data?.totalTeacher || 0 }
              ]}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="count" fill="#6366F1" radius={[10, 10, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="flex items-center rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
    <div className={`mr-5 rounded-2xl p-4 ${bgColor} flex-shrink-0`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-black text-gray-900 mt-1">{value?.toLocaleString() || 0}</h3>
    </div>
  </div>
);

export default Dashboard;