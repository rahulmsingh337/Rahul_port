import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, ArrowUpDown, Code } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  const allTech = useMemo(() => {
    const techs = new Set<string>();
    resumeData.projects.forEach(p => p.stack.forEach(s => techs.add(s)));
    return ['All', ...Array.from(techs)];
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...resumeData.projects];
    
    if (filter !== 'All') {
      result = result.filter(p => p.stack.includes(filter));
    }

    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      const dateA = new Date(a.dates.split(' – ')[0]).getTime();
      const dateB = new Date(b.dates.split(' – ')[0]).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [filter, sortBy]);

  return (
    <section id="projects" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-950/50 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row"
        >
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-4xl font-bold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
              Technical <span className="text-blue-500">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Showcasing my technical implementations and problem-solving.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm dark:bg-slate-900">
              <Filter size={16} className="ml-2 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent px-2 py-1 text-sm font-medium outline-none dark:text-white"
              >
                {allTech.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm dark:bg-slate-900">
              <ArrowUpDown size={16} className="ml-2 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent px-2 py-1 text-sm font-medium outline-none dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                    <Code size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">{project.dates}</span>
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="mb-8 flex-grow space-y-2">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400">
                      • {bullet}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-2 text-sm font-bold text-blue-500 transition-colors hover:text-blue-600">
                  View Details <ExternalLink size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
