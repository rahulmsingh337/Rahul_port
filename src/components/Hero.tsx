import React from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight, Linkedin, Mail, Phone } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-12 scroll-mt-20">
      <div className="mx-auto flex max-w-7xl flex-grow flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-500"
        >
          Available for Opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-5xl font-bold tracking-tighter text-slate-900 dark:text-white md:text-8xl"
        >
          {resumeData.basics.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-xl font-medium text-blue-500 md:text-3xl"
        >
          {resumeData.basics.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
        >
          {resumeData.basics.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#experience"
            className="group flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 font-bold text-white transition-all hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            View Experience
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/resume.pdf"
            download="Rahul_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-black hover:shadow-black/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:hover:shadow-white/10"
          >
            <Download size={18} />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-slate-400"
        >
          <a href={resumeData.basics.links[0].url} target="_blank" className="transition-colors hover:text-blue-500">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${resumeData.basics.email}`} className="transition-colors hover:text-blue-500">
            <Mail size={20} />
          </a>
          <a href={`tel:${resumeData.basics.phone}`} className="transition-colors hover:text-blue-500">
            <Phone size={20} />
          </a>
        </motion.div>
      </div>

      {/* Impact Strip - Moved into normal flow to prevent overlap */}
      <div className="mt-16 w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "Experience", value: "4+ Years" },
            { label: "Projects Delivered", value: "10+" },
            { label: "Awards Won", value: "20+" }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md dark:bg-slate-900/20"
            >
              <span className="text-sm font-medium uppercase tracking-widest text-slate-400">{stat.label}</span>
              <span className="text-2xl font-bold text-blue-500">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Hero;
