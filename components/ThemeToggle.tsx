
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 w-16 h-9 rounded-full bg-slate-300 dark:bg-slate-800 transition-colors duration-1000 focus:outline-none"
      aria-label="Toggle Theme"
    >
      <motion.div
        className="absolute left-1 top-1 w-7 h-7 bg-white dark:bg-violet-600 rounded-full flex items-center justify-center shadow-md"
        animate={{
          x: theme === 'dark' ? 28 : 0,
          rotate: theme === 'dark' ? 360 : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
