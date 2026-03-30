import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, FileText, Database, Server } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const Privacy = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            <ShieldCheck size={14} /> Trust & Transparency
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#191c1d] mb-6 font-manrope tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            At SchoolSaaS, we treat your institutional data with the same level of care and 
            security as our own. Here is how we protect your digital ecosystem.
          </p>
        </motion.div>

        {/* POLICY GRID */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <PrivacyCard 
            icon={<Database className="text-blue-600" />}
            title="Data Collection"
            description="We only collect essential records (student IDs, teacher schedules, and grades) required for the core functionality of the platform."
          />
          <PrivacyCard 
            icon={<Eye className="text-purple-600" />}
            title="Usage Clarity"
            description="Your data is never sold to third parties. It is used strictly to power analytics and improve the educational experience."
          />
          <PrivacyCard 
            icon={<Lock className="text-emerald-600" />}
            title="Encryption"
            description="All data is encrypted in transit and at rest using AES-256 standards, ensuring your records remain private and secure."
          />
        </motion.div>

        {/* DETAILED CONTENT SECTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100"
        >
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <div className="sticky top-24">
                <FileText className="text-blue-600 mb-4" size={32} />
                <h2 className="text-2xl font-bold text-[#191c1d] mb-4 font-manrope">
                  Detailed Terms
                </h2>
                <p className="text-sm text-gray-400">Last updated: March 2026</p>
              </div>
            </div>
            
            <div className="space-y-10 text-gray-600 leading-relaxed">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Information Governance</h3>
                <p>
                  SchoolSaaS acts as a data processor. Your educational institution retains full ownership 
                  of all student and staff data. We provide the infrastructure; you provide the oversight.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Infrastructure Security</h3>
                <p>
                  Our servers are hosted in ISO 27001 certified data centers with 24/7 physical monitoring 
                  and automated threat detection systems to prevent unauthorized access.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Compliance Standards</h3>
                <p>
                  We are fully compliant with GDPR, FERPA, and COPPA regulations, ensuring that student 
                  privacy is protected at a global standard.
                </p>
              </section>
            </div>
          </div>
        </motion.div>

        {/* CALL TO ACTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">Have questions regarding your data?</p>
          <button className="px-8 py-3 bg-[#191c1d] text-white rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg">
            Contact Privacy Officer
          </button>
        </motion.div>

      </div>
    </div>
  );
};

// Sub-component for the grid cards
const PrivacyCard = ({ icon, title, description }) => (
  <motion.div
    variants={fadeUp}
    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h2 className="text-xl font-bold mb-3 font-manrope text-gray-900">
      {title}
    </h2>
    <p className="text-gray-500 text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default Privacy;