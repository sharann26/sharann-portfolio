
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Github, ExternalLink, X, ArrowRight, Layers, Code, Zap, Globe, Database, Layout } from 'lucide-react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  // Helper to generate a visual theme based on index
  const getProjectTheme = (index: number) => {
    const themes = [
      { from: 'from-violet-600', to: 'to-indigo-600', icon: Code, shadow: 'shadow-violet-500/20' },
      { from: 'from-emerald-500', to: 'to-teal-500', icon: Database, shadow: 'shadow-emerald-500/20' },
      { from: 'from-orange-500', to: 'to-pink-600', icon: Layout, shadow: 'shadow-orange-500/20' },
      { from: 'from-blue-500', to: 'to-cyan-500', icon: Globe, shadow: 'shadow-blue-500/20' },
      { from: 'from-fuchsia-600', to: 'to-purple-600', icon: Zap, shadow: 'shadow-fuchsia-500/20' },
      { from: 'from-slate-600', to: 'to-slate-800', icon: Layers, shadow: 'shadow-slate-500/20' },
    ];
    return themes[index % themes.length];
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="projects">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-wider text-violet-600 font-bold mb-2">My Work</p>
        <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white">Projects.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => {
          const theme = getProjectTheme(index);
          const Icon = theme.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Abstract Visual Header */}
              <div className={`relative w-full h-56 overflow-hidden bg-gradient-to-br ${theme.from} ${theme.to} p-6 flex flex-col justify-between`}>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
                </div>
                
                {/* Large Decorative Icon */}
                <Icon className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-out" />

                {/* Floating Glass Icon Card */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Quick Links on Card */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <a 
                    href={project.source_code_link} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
                    title="Source Code"
                  >
                    <Github size={18} />
                  </a>
                  {project.live_link && (
                    <a 
                      href={project.live_link} 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow relative">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2 group-hover:text-violet-500 transition-colors">{project.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className={`text-[12px] font-bold ${tag.color}`}>
                      #{tag.name}
                    </span>
                  ))}
                </div>

                 {/* View Details Icon */}
                 <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-violet-500 transform translate-x-[-10px] group-hover:translate-x-0">
                    <ArrowRight size={20} />
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-white/10"
            >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
                >
                  <X size={20} />
                </button>

                {/* Hero Image (Kept for details view) */}
                <div className="relative w-full h-64 md:h-96 shrink-0">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                     <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        {selectedProject.title}
                     </h3>
                     
                     <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((tag, i) => (
                          <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-white border border-white/20`}>
                            #{tag.name}
                          </span>
                        ))}
                     </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-10 space-y-8 bg-white dark:bg-slate-900">
                  <div className="grid md:grid-cols-3 gap-8">
                     <div className="md:col-span-2 prose dark:prose-invert max-w-none">
                        <h4 className="text-sm font-black text-violet-600 uppercase tracking-widest mb-4">Project Overview</h4>
                        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                          {selectedProject.description}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
                          Leveraging {selectedProject.tags.map(t => t.name).join(', ')}, this project was built to solve real-world problems with a focus on performance, scalability, and user experience. The architecture ensures maintainability while delivering high-speed interactions.
                        </p>
                     </div>

                     <div className="space-y-6">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">Quick Links</h4>
                        
                        <div className="flex flex-col gap-3">
                           <a 
                              href={selectedProject.source_code_link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
                           >
                              <Github size={20} className="group-hover:scale-110 transition-transform" />
                              <span>Source Code</span>
                           </a>
                           
                           {selectedProject.live_link && (
                              <a 
                                href={selectedProject.live_link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 px-5 py-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20 group"
                              >
                                 <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                                 <span>Live Demo</span>
                              </a>
                           )}
                        </div>
                     </div>
                  </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
