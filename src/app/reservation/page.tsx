'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, Users, CheckCircle, Loader2 } from 'lucide-react';
import { ReservationInput } from '@/types';
import { p } from 'framer-motion/client';
interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: string;
  special_requests: string;
}

const TIMES = [
  '12:00', '12:30', '13:00', '13:30', '14:00',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
];

export default function ReservationPage() {
  const [form, setForm] = useState<ReservationInput>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    special_requests: '',
  });
  const [etat, setEtat] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

// handleSubmit — envoyer le bon payload à Strapi
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setEtat('loading');
  setErrorMsg('');

  try {
    const res = await fetch('http://localhost:1337/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {                          // ← Strapi attend { data: {...} }
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          date: form.date,               // string "2024-06-17"
          time: form.time,
          guests: form.guests,           // number
          special_requests: form.special_requests,
          statut: 'pending',
        }
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }
    setEtat('success');
  } catch (err) {
    setEtat('error');
    setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.');
  }
};

  // Today minimum date
  const today = new Date().toISOString().split('T')[0];

  if (etat === 'success') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <CheckCircle size={56} className="text-gold mx-auto mb-6" />
            <h1 className="font-display text-4xl text-cream mb-4">Réservation confirmée</h1>
            <div className="gold-divider" />
            <p className="text-smoke leading-relaxed mb-3">
              Merci, <span className="text-cream">{form.first_name}</span>. Votre demande de réservation
              a bien été reçue pour le <strong className="text-gold">{form.date}</strong> à <strong className="text-gold">{form.time}</strong>.
            </p>
            <p className="text-smoke text-sm">
              Notre équipe vous contactera sous 2 heures pour confirmer votre table.
              Un email de confirmation vous sera envoyé à <span className="text-cream">{form.email}</span>.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <div className="py-20 px-6 text-center"
          style={{ background: 'linear-gradient(180deg, #1E1208 0%, #0D0D0D 100%)' }}
        >
          <p className="section-eyebrow mb-3">Venez nous rejoindre</p>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-4">Réservation</h1>
          <div className="gold-divider" />
          <p className="text-smoke text-sm max-w-md mx-auto">
            Réservez votre table en ligne. Nous confirmons chaque réservation
            manuellement dans les 2 heures qui suivent.
          </p>
        </div>

        <form className="max-w-2xl mx-auto px-6 py-16" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First name */}
            <div>
              <label className="section-eyebrow text-[10px] mb-2 block">Prénom *</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="Jean"
                className="input-field"
                required
              />
            </div>
            {/* Last name */}
            <div>
              <label className="section-eyebrow text-[10px] mb-2 block">Nom *</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Dupont"
                className="input-field"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="section-eyebrow text-[10px] mb-2 block">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jean@exemple.com"
                className="input-field"
                required
              />
            </div>
            {/* Phone */}
            <div>
              <label className="section-eyebrow text-[10px] mb-2 block">Téléphone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+226 70 00 00 00"
                className="input-field"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="section-eyebrow text-[10px] mb-2 flex items-center gap-2 block">
                <Calendar size={11} /> Date *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={today}
                className="input-field [color-scheme:dark]"
                required
              />
            </div>
            {/* Time */}
            <div>
              <label className="section-eyebrow text-[10px] mb-2 flex items-center gap-2 block">
                <Clock size={11} /> Heure *
              </label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choisir une heure</option>
                <optgroup label="Déjeuner">
                  {TIMES.slice(0, 5).map((t) => <option key={t} value={t}>{t}</option>)}
                </optgroup>
                <optgroup label="Dîner">
                  {TIMES.slice(5).map((t) => <option key={t} value={t}>{t}</option>)}
                </optgroup>
              </select>
            </div>

            {/* Guests */}
            <div className="md:col-span-2">
              <label className="section-eyebrow text-[10px] mb-2 flex items-center gap-2 block">
                <Users size={11} /> Nombre de convives *
              </label>
              <div className="flex gap-3 flex-wrap">
                {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => (
                  <button
                    key={n}
                    type="button"
                    // Boutons guests — convertir en number
                    onClick={() => setForm((p) => ({ ...p, guests: n === '8+' ? 8 : parseInt(n) }))}
                    className={`px-4 py-2 border rounded-md text-sm font-medium
                      ${form.guests === (n === '8+' ? 8 : parseInt(n)) ? 'bg-gold text-obsidian' : 'bg-obsidian text-smoke border-white/10'}
                      hover:bg-gold hover:text-obsidian transition-colors duration-200`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Special requests */}
            <div className="md:col-span-2">
              <label className="section-eyebrow text-[10px] mb-2 block">
                Demandes particulières
              </label>
              <textarea
                name="special_requests"
                value={form.special_requests}
                onChange={handleChange}
                rows={4}
                placeholder="Allergies alimentaires, occasion spéciale, préférence de table..."
                className="input-field resize-none"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="mt-4 text-red-400 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={etat === 'loading'}
            className="btn-primary w-full mt-8 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {etat === 'loading' ? (
              <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
            ) : (
              'Confirmer la réservation'
            )}
          </button>

          <p className="text-smoke text-xs text-center mt-4">
            Pour les groupes de plus de 8 personnes ou événements privés, veuillez nous contacter
            directement au <a href="tel:+22670000000" className="text-gold hover:underline">+226 70 00 00 00</a>.
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}
