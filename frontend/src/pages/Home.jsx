import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Star,
  CheckCircle2
} from 'lucide-react';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
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
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide uppercase bg-purple-100 text-purple-700 rounded-full">
              Version 2.0 Now Live
            </span>
            <h1 className="text-6xl md:text-7xl font-black font-manrope leading-[1.1] mb-6 tracking-tight">
              Manage Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0058be] to-[#6b38d4]">
                School Smarter
              </span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
              All-in-one platform for managing students and teachers efficiently. 
              Streamline admissions, grading, and administration with a single, elegant interface.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-[#0058be] to-[#6b38d4] text-white rounded-full font-bold shadow-lg hover:shadow-purple-200 transition-all flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-all">
                Login
              </button>
            </div>
            <div className="mt-10 flex items-center gap-3">
               <div className="flex -space-x-3">
                 {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />)}
               </div>
               <p className="text-sm text-gray-400 font-medium">Trusted by 200+ Institutions</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="bg-[#191c1d] rounded-[3rem] p-4 shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
               <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-[2rem] border border-gray-700 p-6">
                  {/* Mock UI Content */}
                  <div className="h-4 w-1/3 bg-gray-700 rounded mb-8" />
                  <div className="grid grid-cols-3 gap-4">
                    {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-800/50 rounded-xl border border-white/5" />)}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 bg-[#f3f4f5]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Empowering Education</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Everything you need to run a modern educational institution in one secure place.</p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <FeatureCard 
            icon={<GraduationCap className="text-blue-600" />} 
            title="Student Management" 
            desc="Complete digital profiles, attendance tracking, and performance analytics."
          />
          <FeatureCard 
            icon={<Users className="text-purple-600" />} 
            title="Teacher Management" 
            desc="Simplified scheduling, payroll integration, and collaborative tools."
          />
          <FeatureCard 
            icon={<Layers className="text-indigo-600" />} 
            title="Multi-School Admin" 
            desc="Centralized control for educational groups managing multiple campuses."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-emerald-600" />} 
            title="Secure Data Handling" 
            desc="Enterprise-grade encryption and GDPR compliance for all sensitive data."
          />
        </motion.div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500">Choose the plan that fits your institution's size.</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <PriceCard plan="Starter" price="49" features={["Up to 100 Students", "Core Management Tools", "Standard Support"]} />
          <PriceCard plan="Professional" price="129" popular features={["Up to 500 Students", "Advanced Analytics", "Priority Support", "Mobile App Access"]} />
          <PriceCard plan="Enterprise" price="Custom" features={["Unlimited Students", "Multi-School Admin", "Dedicated Manager", "Custom Integration"]} />
        </div>
      </section>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-white p-8 rounded-[2rem] hover:shadow-xl transition-shadow duration-500 group"
  >
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

const PriceCard = ({ plan, price, features, popular }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`p-10 rounded-[3rem] ${popular ? 'bg-[#f8f9fa] border-2 border-purple-500 relative' : 'bg-white border border-gray-100'}`}
  >
    {popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>}
    <h3 className="text-xl font-bold mb-2">{plan}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-black">${price}</span>
      {price !== "Custom" && <span className="text-gray-400">/month</span>}
    </div>
    <ul className="space-y-4 mb-10">
      {features.map(f => (
        <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
          <CheckCircle2 size={18} className="text-blue-500" /> {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-full font-bold transition-all ${popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600'}`}>
      {price === "Custom" ? "Contact Sales" : "Get Started"}
    </button>
  </motion.div>
);

export default Home;