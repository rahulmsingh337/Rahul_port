import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved !== 'light';
    }
    return true;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/80 py-3 backdrop-blur-lg dark:bg-slate-950/80' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white"
        >
          RS<span className="text-blue-500">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400"
            >
              {link.name}
            </motion.a>
          ))}
          
          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="relative flex h-8 w-14 items-center rounded-full bg-slate-200 p-1 transition-colors dark:bg-slate-800"
            aria-label="Toggle Theme"
          >
            <motion.div
              animate={{ x: isDark ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-900"
            >
              {isDark ? (
                <Moon size={12} className="text-blue-400" />
              ) : (
                <Sun size={12} className="text-amber-500" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="relative flex h-7 w-12 items-center rounded-full bg-slate-200 p-1 transition-colors dark:bg-slate-800"
          >
            <motion.div
              animate={{ x: isDark ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-900"
            >
              {isDark ? (
                <Moon size={10} className="text-blue-400" />
              ) : (
                <Sun size={10} className="text-amber-500" />
              )}
            </motion.div>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-900 dark:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white dark:bg-slate-950 md:hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-900 dark:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
