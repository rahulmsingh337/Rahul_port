import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Arsenal', href: '#skills' },
    { name: 'Journey', href: '#experience' },
    { name: 'Impact', href: '#projects' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full pointer-events-none">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center justify-between gap-8 px-12 py-5 transition-all duration-500 backdrop-blur-xl ${
            isScrolled ? 'bg-surface/90 border-b border-white/5 shadow-2xl' : 'bg-transparent'
          }`}
        >
          <a href="#" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-royal-indigo to-vibrant-cyan flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Cpu size={20} />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-xl bg-royal-indigo/30 -z-10"
              />
            </div>
            <div className="flex flex-col">
              <span className="hidden sm:block font-display text-sm font-extrabold uppercase tracking-tighter text-white group-hover:text-vibrant-cyan transition-colors">Rahul Singh</span>
              <span className="hidden sm:block font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">SAP Lead</span>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-white group/nav"
              >
                {link.name}
                <motion.div 
                  className="absolute -bottom-1 left-0 h-px w-0 bg-vibrant-cyan group-hover/nav:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
            <div className="h-4 w-px bg-white/10" />
            <motion.a
              href="mailto:rs58598@gmail.com"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "var(--color-royal-indigo)", 
                color: "#fff",
                boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border border-royal-indigo/30 bg-royal-indigo/10 px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition-all"
            >
              Contact <ArrowUpRight size={12} />
            </motion.a>
          </div>

          <button 
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-surface/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center gap-10 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="font-display text-4xl font-bold text-white hover:text-royal-indigo transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="mailto:rs58598@gmail.com" 
                className="mt-6 text-2xl font-mono uppercase tracking-widest text-vibrant-cyan"
                onClick={() => setIsMenuOpen(false)}
              >
                Collaborate
              </a>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-10 right-10 text-white p-4"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
