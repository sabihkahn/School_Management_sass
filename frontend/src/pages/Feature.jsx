import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  CreditCard, 
  BarChart3, 
  Search, 
  ShieldCheck,
  Zap,
  LayoutDashboard
} from 'lucide-react';

// Animation variants aligned with the Design System
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Features = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: High-End Editorial Style */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-24 text-left max-w-3xl"
        >
          <span className="text-[#0058be] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Capabilities
          </span>
          <h1 className="text-5xl md:text-7xl font-black font-manrope leading-[1.05] mb-8 tracking-tighter text-[#191c1d]">
            Administrative power, <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0058be] to-[#6b38d4]">
              reimagined.
            </span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Your backend is already powerful. We’ve designed an interface that makes 
            managing students, teachers, and financial records as fluid as a single swipe.
          </p>
        </motion.div>

        {/* FEATURE GRID: Based on your Express Routes */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Dashboard Feature */}
          <FeatureItem 
            icon={<LayoutDashboard size={28} />}
            title="Intelligent Dashboard"
            description="Real-time aggregation of school health metrics. One endpoint, total visibility into your daily operations."
            route="/api/dashboardData"
          />

          {/* Student Management */}
          <FeatureItem 
            icon={<Users size={28} />}
            title="Student Lifecycle"
            description="From registration to graduation. Manage profiles, class transitions, and attendance with zero friction."
            route="/api/createstudent"
          />

          {/* Financials (Unpaid/Paid) */}
          <FeatureItem 
            icon={<CreditCard size={28} />}
            title="Financial Transparency"
            description="Track unpaid dues by class or individual. Convert 'Unpaid' to 'Paid' with a single authenticated click."
            route="/api/getAllunpaidstudents"
          />

          {/* Teacher Management */}
          <FeatureItem 
            icon={<UserCheck size={28} />}
            title="Faculty Governance"
            description="Dedicated teacher modules to handle staffing, performance updates, and departmental assignments."
            route="/api/createTeacher"
          />

          {/* Advanced Search */}
          <FeatureItem 
            icon={<Search size={28} />}
            title="Global Search"
            description="Instant querying for students and teachers by name or class, powered by optimized backend filtering."
            route="/api/StudentByName"
          />

          {/* Security/Auth */}
          <FeatureItem 
            icon={<ShieldCheck size={28} />}
            title="JWT Protected"
            description="Enterprise-grade Authorization middleware ensuring only verified admins access sensitive institutional data."
            route="/api/auth/login"
          />
        </motion.div>

        {/* THE "COURSE BLOOM" SECTION: Intentional Asymmetry */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          className="mt-32 p-12 md:p-20 bg-gradient-to-br from-[#191c1d] to-[#2d3135] rounded-[4rem] text-white overflow-hidden relative"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black font-manrope mb-6 leading-tight">
                Ready to sync your <br/> API with beauty?
              </h2>
              <p className="text-gray-400 mb-8 max-w-md">
                All routes are ready. All controllers are mapped. Switch your management 
                system to the modern era of educational SaaS.
              </p>
              <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-3 group">
                Deploy Dashboard 
                <Zap size={18} className="fill-current group-hover:text-blue-600 transition-colors" />
              </button>
            </div>
            
            {/* Abstract UI representation */}
            <div className="hidden md:block relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-2 w-20 bg-white/20 rounded" />
                    <div className="h-8 w-8 bg-blue-500 rounded-lg" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 w-full bg-white/10 rounded-xl" />
                    <div className="h-10 w-full bg-white/10 rounded-xl" />
                    <div className="h-10 w-3/4 bg-white/10 rounded-xl" />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description, route }) => (
  <motion.div 
    variants={fadeUp}
    whileHover={{ y: -8 }}
    className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group"
  >
    <div className="w-16 h-16 bg-[#f3f4f5] text-[#191c1d] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0058be] group-hover:text-white transition-colors duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-bold font-manrope mb-4 text-[#191c1d]">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-6">
      {description}
    </p>
    <div className="pt-4 border-t border-gray-50">
      <code className="text-[10px] font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
        {route}
      </code>
    </div>
  </motion.div>
);

export default Features;