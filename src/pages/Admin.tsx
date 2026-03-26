import React, { useState } from 'react';
import { motion } from 'motion/react';
import Calendar from '../components/Calendar';
import { Lock } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Hardcoded simple password for demonstration purposes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-32 flex justify-center px-4 relative">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 p-10 max-w-md w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-full">
                    <Lock className="w-8 h-8 text-red-500" />
                </div>
            </div>
            <h2 className="text-2xl font-black text-white text-center uppercase tracking-tight mb-8">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-4 bg-black/50 border border-white/10 text-white focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder-zinc-700" 
                        placeholder="••••••••" 
                    />
                    {error && <p className="text-red-500 text-xs font-bold uppercase mt-2">Invalid Password</p>}
                </div>
                <button
                    type="submit"
                    className="w-full px-8 py-4 text-sm font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
                >
                    Login
                </button>
            </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Availability Manager</h1>
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded">Admin</span>
          </div>
          <p className="text-zinc-400">
            Click on any available time slot to block it from customer reservations. Click a blocked slot to make it available again.
          </p>
        </motion.div>

        <motion.div 
          className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
          
          <Calendar 
            onSelectSlot={() => {}} 
            isAdmin={true} 
          />
          
        </motion.div>
      </div>
    </div>
  );
}
