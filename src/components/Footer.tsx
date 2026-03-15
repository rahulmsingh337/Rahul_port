import React from 'react';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 px-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <a href="#" className="mb-6 block text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              RS<span className="text-blue-500">.</span>
            </a>
            <p className="max-w-xs text-sm text-slate-600 dark:text-slate-400">
              SAP ABAP Consultant dedicated to technical excellence and innovative solutions.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Contact Info</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                {resumeData.basics.email}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                {resumeData.basics.phone}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-500" />
                {resumeData.basics.location}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Social</h4>
            <div className="flex gap-4">
              <a
                href={resumeData.basics.links[0].url}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-500 hover:text-blue-500 dark:border-slate-800 dark:text-slate-400"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${resumeData.basics.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-500 hover:text-blue-500 dark:border-slate-800 dark:text-slate-400"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} Rahul Singh. All rights reserved. Designed for excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
