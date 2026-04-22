import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Database, Zap, Share2, Terminal } from 'lucide-react';
import { contentData } from '../data/ContentData';

export const Projects: React.FC = () => {
  const [feedbackGiven, setFeedbackGiven] = React.useState<Record<string, boolean>>({});

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-royal-indigo">Core Initiatives</h2>
          <h3 className="mt-4 text-5xl font-bold text-white md:text-6xl tracking-tighter">Impact & Innovation</h3>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {contentData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ 
                scale: 1.01,
                borderColor: "rgba(139, 92, 246, 0.4)"
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0F172A]/40 p-12 transition-all duration-500 backdrop-blur-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="p-5 rounded-2xl bg-surface/50 border border-white/10 text-royal-indigo group-hover:scale-110 group-hover:bg-royal-indigo/10 transition-all">
                    {index % 2 === 0 ? <Database size={28} /> : <Terminal size={28} />}
                  </div>
                  <div className="flex gap-4">
                    <motion.div whileHover={{ scale: 1.2, color: "#fff" }} className="text-slate-600 transition-colors cursor-pointer">
                      <Share2 size={20} />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2, color: "#fff" }} className="text-slate-600 transition-colors cursor-pointer">
                      <ExternalLink size={20} />
                    </motion.div>
                  </div>
                </div>

                <h4 className="text-3xl font-bold text-white mb-6 group-hover:text-vibrant-cyan transition-colors leading-tight">
                  {project.title}
                </h4>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-white/5 border border-white/5 px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-300 transition-all hover:bg-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Feedback Mechanism */}
                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                  <AnimatePresence mode="wait">
                    {feedbackGiven[project.id] ? (
                      <motion.span
                        key="thanks"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-sans text-[10px] uppercase tracking-widest text-vibrant-cyan font-bold"
                      >
                        Thanks for your feedback!
                      </motion.span>
                    ) : (
                      <motion.div 
                        key="rating"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between w-full"
                      >
                        <span className="font-sans text-[10px] uppercase tracking-widest text-slate-500">Was this helpful?</span>
                        <div className="flex gap-4">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <motion.button
                              key={rating}
                              whileHover={{ scale: 1.2, color: "var(--color-vibrant-cyan)" }}
                              whileTap={{ scale: 0.9 }}
                              className="text-slate-600 hover:text-white transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFeedbackGiven(prev => ({ ...prev, [project.id]: true }));
                              }}
                            >
                              <Zap size={14} className={rating <= 3 ? "opacity-30" : "opacity-100"} />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {project.metrics && (
                <div className="mt-12 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-vibrant-cyan shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                      Outcome: {project.metrics}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-royal-indigo/5 blur-2xl group-hover:bg-royal-indigo/20 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
