
import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
        {STATS.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-8 backdrop-blur-xl border rounded-[32px] overflow-hidden text-center hover:border-violet-500/50 transition-all duration-300 dark:bg-slate-900/40 dark:border-white/10 bg-white border-slate-300 shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            {/* Hover Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-[32px] blur-xl opacity-0 group-hover:opacity-10 transition-opacity`} />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`p-4 rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform dark:bg-slate-800 bg-slate-50 border border-slate-200 dark:border-slate-700`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              
              <motion.span 
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                className="text-4xl md:text-5xl font-black mb-2 dark:text-white text-black"
              >
                {stat.value}
              </motion.span>
              
              <p className="text-sm font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
