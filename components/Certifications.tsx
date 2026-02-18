
import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';
import { Award } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-widest text-slate-600 dark:text-slate-500 mb-2">Verified Excellence</p>
        <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white">Certifications.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CERTIFICATIONS.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ 
              rotateY: 10, 
              rotateX: -5,
              z: 20,
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)" 
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative p-8 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-300 dark:border-white/10 overflow-hidden cursor-default perspective-1000 shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${cert.color} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />
            
            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} text-white mb-6 shadow-lg`}>
                <Award className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-violet-500 transition-colors text-slate-950 dark:text-white">{cert.title}</h3>
              <p className="text-slate-700 dark:text-slate-400 font-bold text-sm mb-4">{cert.issuer} • {cert.date}</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {cert.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
