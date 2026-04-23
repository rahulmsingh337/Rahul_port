/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import Skills from './components/Skills';
import { ImpactStrip } from './components/ImpactStrip';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { AnimatedBackground } from './components/AnimatedBackground';
import { FeedbackBot } from './components/FeedbackBot';
import { AdminChatHistory } from './components/AdminChatHistory';
import { Linkedin, Mail, Phone, Instagram, Github } from 'lucide-react';

function MouseFollower() {
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal-indigo/5 blur-[120px]"
      style={{ x: mouseX, y: mouseY }}
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
        setIsAdmin(true);
    }
  }, []);

  if (isAdmin) {
    return <AdminChatHistory />;
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms moved to top level to comply with Rules of Hooks
  const footerY1 = useTransform(scrollYProgress, [0.8, 1], [0, -100]);
  const footerOpacity1 = useTransform(scrollYProgress, [0.8, 1], [0, 0.4]);
  const footerY2 = useTransform(scrollYProgress, [0.8, 1], [0, -150]);
  const footerOpacity2 = useTransform(scrollYProgress, [0.8, 1], [0, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen selection:bg-royal-indigo/30 selection:text-white">
      <MouseFollower />
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute h-24 w-24 rounded-full border-4 border-slate-900 border-t-royal-indigo animate-spin" />
                <div className="h-16 w-16 rounded-full border-4 border-slate-900 border-b-vibrant-cyan animate-[spin_1.5s_linear_infinite_reverse]" />
                <div className="absolute h-8 w-8 rounded-lg bg-gradient-to-br from-royal-indigo to-vibrant-cyan animate-pulse" />
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500"
              >
                Syncing Neural Architecture...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-gradient-to-r from-royal-indigo via-vibrant-cyan to-electric-blue"
            style={{ scaleX }}
          />
          
          <AnimatedBackground />
          <Navbar />
          
          <main className="relative z-10 flex flex-col gap-32 pb-32">
            <Hero />
            <div className="space-y-48">
              <ImpactStrip />
              <Skills />
              <Certifications />
              <Experience />
              <Education />
              <Projects />
            </div>
          </main>
          
          <FeedbackBot />
          
          <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-surface/80 py-24 px-6 backdrop-blur-xl">
            {/* Parallax Background Elements */}
            <motion.div 
              style={{ 
                y: footerY1,
                opacity: footerOpacity1
              }}
              className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-royal-indigo/10 blur-3xl pointer-events-none"
            />
            <motion.div 
              style={{ 
                y: footerY2,
                opacity: footerOpacity2
              }}
              className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-vibrant-cyan/10 blur-3xl pointer-events-none"
            />

            <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-16 md:flex-row relative z-10">
              <div className="max-w-md text-center md:text-left">
                <h5 className="font-display text-3xl font-bold tracking-tighter text-white mb-6">RAHUL SINGH</h5>
                <p className="text-slate-500 font-sans text-sm leading-relaxed">
                  Lead SAP Consultant optimizing global enterprise systems at Accenture. <br className="hidden md:block" />
                  Specialized in S/4HANA Transformation & Modern Digital Cores.
                </p>
              </div>
              <div className="flex flex-col gap-6 text-center md:items-end md:text-right">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-end">
                  <a href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-royal-indigo transition-colors"><Linkedin size={20} /></a>
                  <a href="https://github.com/rahulmsingh337/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-royal-indigo transition-colors"><Github size={20} /></a>
                  <a href="https://www.instagram.com/squatile3375/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-royal-indigo transition-colors"><Instagram size={20} /></a>
                  <a href="https://wa.me/918989805836" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-royal-indigo transition-colors"><Phone size={20} /></a>
                  <a href="mailto:rs58598@gmail.com" className="text-slate-500 hover:text-royal-indigo transition-colors"><Mail size={20} /></a>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-end text-slate-700">
                  <div className="h-1 w-1 rounded-full bg-slate-800" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Noida, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
