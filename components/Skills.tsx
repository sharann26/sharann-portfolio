
import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto" id="skills">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-wider text-violet-600 font-bold mb-2">Technical Arsenal</p>
        <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white">Skills.</h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 backdrop-blur-xl border border-slate-300 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
        {SKILL_CATEGORIES.map((category, idx) => (
          <div 
            key={category.title} 
            className={`flex flex-col md:flex-row items-center gap-8 p-8 ${
              idx !== SKILL_CATEGORIES.length - 1 ? 'border-b border-slate-300 dark:border-white/5' : ''
            }`}
          >
            {/* Category Name */}
            <div className="w-full md:w-1/3 md:text-right">
              <h3 className="text-lg font-bold text-slate-950 dark:text-slate-300">
                {category.title}
              </h3>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden md:block w-[1px] h-12 bg-slate-300 dark:bg-white/10" />

            {/* Skills Grid */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 w-full md:w-2/3">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-violet-500/20 hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-300"
                >
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" title={skill.name} />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {skill.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
