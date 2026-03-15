import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setStatus('success');
    reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-950/50 scroll-mt-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
            Get in <span className="text-blue-500">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Have a question or want to work together? Send me a message.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 md:p-12"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 font-bold text-blue-500 hover:text-blue-600"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Name</label>
                <input
                  {...register('name')}
                  className={`w-full rounded-2xl border bg-slate-50 px-6 py-4 outline-none transition-all dark:bg-slate-800/50 ${
                    errors.name ? 'border-red-500' : 'border-slate-200 focus:border-blue-500 dark:border-slate-800'
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-xs font-medium text-red-500">
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Email</label>
                <input
                  {...register('email')}
                  className={`w-full rounded-2xl border bg-slate-50 px-6 py-4 outline-none transition-all dark:bg-slate-800/50 ${
                    errors.email ? 'border-red-500' : 'border-slate-200 focus:border-blue-500 dark:border-slate-800'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-xs font-medium text-red-500">
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Message</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className={`w-full rounded-2xl border bg-slate-50 px-6 py-4 outline-none transition-all dark:bg-slate-800/50 ${
                    errors.message ? 'border-red-500' : 'border-slate-200 focus:border-blue-500 dark:border-slate-800'
                  }`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="flex items-center gap-1 text-xs font-medium text-red-500">
                    <AlertCircle size={12} /> {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 py-5 font-bold text-white transition-all hover:bg-blue-600 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Send Message <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
