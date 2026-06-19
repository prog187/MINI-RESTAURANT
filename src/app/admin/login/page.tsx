'use client';

import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Loader2, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(identifier, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-2xl text-cream">
            Saveurs<span className="text-gold">&apos;</span>Ailleurs
          </p>
          <p className="text-smoke text-xs tracking-[0.25em] uppercase mt-1">Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-charcoal border border-white/5 p-8 space-y-5">
          <h1 className="font-display text-xl text-cream mb-2">Connexion</h1>
          <div className="gold-divider mx-0 w-8 h-px bg-gold mb-6" />

          <div>
            <label className="text-smoke text-[10px] tracking-widest uppercase block mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="input-field pl-9"
                placeholder="admin@restaurant.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-smoke text-[10px] tracking-widest uppercase block mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-9"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Connexion...</> : 'Se connecter'}
          </button>
        </form>

        <p className="text-smoke text-xs text-center mt-6">
          
        </p>
      </div>
    </div>
  );
}
