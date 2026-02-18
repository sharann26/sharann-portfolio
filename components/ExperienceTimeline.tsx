import { motion } from "framer-motion";
import React from "react";
import { EXPERIENCES } from "../constants";
import { Experience } from "../types";

const ExperienceCard: React.FC<{ experience: Experience; index: number }> = ({
  experience,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-20 md:mb-32 flex flex-col md:flex-row items-center w-full">
      {/* Central Connector Circle with Logo */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-14 h-14 rounded-2xl border-4 border-slate-200 dark:border-slate-900 bg-white shadow-2xl overflow-hidden flex items-center justify-center p-2"
        >
          <img
            src={experience.icon}
            alt={experience.company}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "";
            }}
          />
        </motion.div>
      </div>

      {/* Content Card */}
      <div
        className={`w-full md:w-[42%] ml-16 md:ml-0 ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
      >
        <motion.div
          initial={{ x: isEven ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="bg-slate-50 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[32px] border border-slate-300 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none relative group hover:border-violet-500/30 transition-colors"
        >
          {/* Accent Line (Bottom) */}
          <div className="absolute bottom-0 left-8 right-8 h-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-[1px]" />

          <div className="flex flex-col gap-1 mb-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-violet-600 uppercase">
              {experience.date}
            </span>
            <h3 className="text-2xl font-black dark:text-white text-slate-950 leading-tight">
              {experience.title}
            </h3>
            <p className="text-slate-700 dark:text-slate-500 font-bold text-sm tracking-wide">
              {experience.company}
            </p>
          </div>

          <ul className="space-y-3">
            {experience.points.map((point, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed group/item"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0 group-hover/item:scale-150 transition-transform" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="relative py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 mb-4">
          Professional Odyssey
        </p>
        <h2 className="text-5xl md:text-6xl font-black text-slate-950 dark:text-white">
          Experience.
        </h2>
      </div>

      <div className="relative">
        {/* Vertical Center Line */}
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-300 via-violet-500 to-slate-300 dark:from-violet-500 dark:via-fuchsia-500 dark:to-transparent opacity-30" />

        <div className="space-y-4">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
