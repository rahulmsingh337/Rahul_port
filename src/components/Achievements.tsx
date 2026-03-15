import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Achievements: React.FC = () => {
  const icons = [Trophy, Award, Medal, Star];

  return (
    <section id="achievements" className="py-24 px-6 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
            Awards & <span className="text-blue-500">Achievements</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Recognitions for technical excellence and commitment.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resumeData.awards.map((award, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={32} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{award.title}</h3>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-500">{award.org}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{award.desc}</p>
                
                {/* Decorative glow */}
                <div className="absolute inset-0 -z-10 bg-blue-500/0 blur-2xl transition-all group-hover:bg-blue-500/5" />
              </motion.div>
            );
          })}
        </div>

        {/* Impact Highlights Panel */}
        <div className="mt-16 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-8 backdrop-blur-sm dark:bg-blue-500/10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <Medal size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Impact Highlights</h4>
                <p className="text-slate-600 dark:text-slate-400">Key measurable results from my professional career.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl bg-white px-6 py-4 shadow-sm dark:bg-slate-900">
                <span className="block text-2xl font-bold text-blue-500">16</span>
                <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Consecutive Insta Rewards</span>
              </div>
              <div className="rounded-2xl bg-white px-6 py-4 shadow-sm dark:bg-slate-900">
                <span className="block text-2xl font-bold text-blue-500">5</span>
                <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Unit Rise Awards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
