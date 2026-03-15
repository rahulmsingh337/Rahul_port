/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-blue-500"
            style={{ scaleX }}
          />
          
          <AnimatedBackground />
          <Navbar />
          
          <main className="relative z-10">
            <Hero />
            <Experience />
            <Projects />
            <Achievements />
            <Skills />
            <Education />
            <ContactForm />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );

}

