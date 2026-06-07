import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { motion } from 'motion/react';
import { Bot, User as UserIcon, Clock, Lock } from 'lucide-react';

const ADMIN_EMAIL = 'rs58598@gmail.com';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
  createdAt: any;
  userEmail: string;
}

const LoginScreen: React.FC<{ onLogin: (email: string, password: string) => Promise<void>; error: string }> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-royal-indigo/10 text-royal-indigo">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Admin Access</h2>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">Chat History Viewer</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-royal-indigo border border-white/5"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-royal-indigo border border-white/5"
          />
          {error && (
            <p className="text-red-400 text-xs font-mono">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-royal-indigo text-white rounded-xl py-3 text-sm font-bold uppercase tracking-widest hover:bg-royal-indigo/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export const AdminChatHistory: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const db = getFirestore();
        const q = query(collection(db, 'chat_history'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const history: ChatMessage[] = [];
        snapshot.forEach(doc => {
          history.push({ id: doc.id, ...doc.data() } as ChatMessage);
        });
        setMessages(history);
      } catch (err) {
        console.error('Failed to fetch chat history', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    setLoginError('');
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setLoginError('Invalid credentials. Access denied.');
    }
  };

  // Not yet checked auth state
  if (!authChecked) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">Checking access...</div>;
  }

  // Not logged in — show login screen
  if (!user) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />;
  }

  // Logged in but not the admin email
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <Lock size={40} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-white font-bold text-xl mb-2">Access Denied</h2>
          <p className="text-slate-500 text-sm">This panel is restricted to the site administrator.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">Loading chat history...</div>;

  return (
    <section className="min-h-screen bg-slate-950 py-20 px-6 text-slate-300">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white">Chat History</h2>
          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">{messages.length} messages</span>
        </div>

        {messages.length === 0 ? (
          <p className="text-slate-500 text-center py-20">No chat history yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl bg-white/5 border border-white/5 p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-royal-indigo">
                    {msg.role === 'bot' ? <Bot size={14} /> : <UserIcon size={14} />}
                    <span>{msg.role}</span>
                    {msg.userEmail && <span className="text-slate-600">· {msg.userEmail}</span>}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                    <Clock size={11} />
                    {msg.createdAt?.toDate?.()?.toLocaleString() ?? '—'}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{msg.text}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
