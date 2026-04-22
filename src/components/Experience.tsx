import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    company: "Accenture",
    role: "Software Development Lead",
    period: "Dec 2025 – Present",
    location: "Noida, UP",
    points: [
      "Leading SAP ABAP development and ECC to S/4HANA migration initiatives for global enterprise clients.",
      "Performing HANA remediation on custom ABAP programs to ensure seamless S/4HANA compatibility.",
      "Developing and optimizing modern CDS Views, OData Services, and RAP-based applications.",
      "Working with SmartShift team to develop automation tools for enhancing critical business activities.",
      "Redesigning legacy ABAP programs for database performance optimization on SAP HANA.",
      "Conducting technical code reviews and maintaining enterprise-grade quality standards."
    ],
    isCurrent: true,
    tech: ["ABAP Cloud", "S/4HANA", "RAP", "SmartShift", "CDS Views"]
  },
  {
    company: "Infosys Private Limited",
    role: "SAP ABAP & Fiori Consultant",
    period: "May 2021 – Dec 2025",
    location: "Noida , UP",
    points: [
      "Infosys Certified SAP Fiori Consultant. Contributed as a top performer in EAS SAP Unit.",
      "Developed high-performance Reports (ALV) and interface programs (Proxies, RFC, IDocs, Web Dynpro).",
      "Designed layouts and programmed Smart Forms, Adobe Forms, and SAPscript for diverse business outputs.",
      "Applied ABAP 7.5 techniques (inline declarations, ABAP SQL enhancements) to modernize legacy cores.",
      "Acted as AMS Track Lead (Aug 2022 – Dec 2025): Resolved complex technical issues and submitted critical POCs.",
      "Integrated SAP systems with various external APIs to support business process automation."
    ],
    isCurrent: false,
    tech: ["SAP Fiori", "Web Dynpro", "ALE/IDocs", "Adobe Forms", "ABAP 7.5"]
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-royal-indigo">Professional Path</h2>
          <h3 className="mt-4 text-5xl font-bold text-white tracking-tight">The Journey</h3>
        </motion.div>

        <div className="relative space-y-24 before:absolute before:left-[17px] before:top-2 before:h-full before:w-px before:bg-white/5">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12"
            >
              {/* Timeline Marker */}
              <div className={`absolute left-0 top-2 h-9 w-9 rounded-full border-4 border-surface bg-navy flex items-center justify-center ${exp.isCurrent ? 'ring-2 ring-vibrant-cyan ring-offset-4 ring-offset-surface' : ''}`}>
                <Briefcase size={14} className={exp.isCurrent ? 'text-vibrant-cyan' : 'text-slate-500'} />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h4>
                  <p className="mt-1 text-lg font-medium text-electric-blue">{exp.company}</p>
                </div>
                <div className="flex flex-col gap-1 text-slate-500 font-mono text-[10px] uppercase tracking-widest md:text-right">
                  <div className="flex items-center gap-2 md:justify-end">
                    <Calendar size={12} className="text-royal-indigo" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                <ul className="space-y-4">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-4 group">
                      <CheckCircle2 size={16} className="mt-1 shrink-0 text-white/10 group-hover:text-vibrant-cyan transition-colors" />
                      <span className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-200 transition-colors">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                  {exp.tech.map(t => (
                    <span key={t} className="rounded-lg bg-white/5 border border-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-500 hover:text-white hover:border-royal-indigo transition-all">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
