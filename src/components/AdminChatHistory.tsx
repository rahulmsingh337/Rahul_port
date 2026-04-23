import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { motion } from 'motion/react';
import { Bot, User, Clock } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
  createdAt: any;
  userEmail: string;
}

export const AdminChatHistory: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const auth = getAuth();
      if (auth.currentUser?.email === 'rs58598@gmail.com') {
        const db = getFirestore();
        const q = query(collection(db, 'chat_history'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const history: ChatMessage[] = [];
        querySnapshot.forEach((doc) => {
          history.push({ id: doc.id, ...doc.data() } as ChatMessage);
        });
        setMessages(history);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="p-10 text-center text-white">Loading Admin Data...</div>;
  if (!messages.length) return <div className="p-10 text-center text-white">No chat history available.</div>;

  return (
    <section className="min-h-screen bg-slate-950 py-32 px-6 text-slate-300">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-white mb-10">Chat History (Admin)</h2>
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-white/5 border border-white/5 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-royal-indigo">
                  {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  {msg.role} | {msg.userEmail}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-600">
                  <Clock size={12} />
                  {msg.createdAt?.toDate().toLocaleString()}
                </div>
              </div>
              <p className="leading-relaxed">{msg.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
