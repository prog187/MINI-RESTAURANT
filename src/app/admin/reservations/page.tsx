'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/navigation';
import {
  CheckCircle, XCircle, Clock, Calendar, Users, Phone,
  Mail, LogOut, RefreshCw, ChevronDown, Search, Loader2
} from 'lucide-react';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

type Status = 'pending' | 'confirmed' | 'cancelled';

interface Reservation {
  id: number;
  documentId: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  statut: Status;
  createdAt: string;
  message?: string;
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  pending: { label: 'En attente', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
  confirmed: { label: 'Confirmée', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  cancelled: { label: 'Refusée', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
};

function StatusBadge({ statut }: { statut: Status }) {
  const c = STATUS_CONFIG[statut];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-body font-bold tracking-widest uppercase border ${c.color} ${c.bg} ${c.border}`}>
      {statut === 'pending' && <Clock size={10} />}
      {statut === 'confirmed' && <CheckCircle size={10} />}
      {statut === 'cancelled' && <XCircle size={10} />}
      {c.label}
    </span>
  );
}

export default function ReservationsPage() {
  const { token, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [optMessages, setOptMessages] = useState<Record<number, string>>({});

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchReservations = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/reservations?sort=createdAt:desc&pagination[limit]=100`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setReservations(data.data || []);
    } catch {
      showToast('Impossible de charger les réservations', 'error');
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    if (!authLoading && !token) router.push('/admin/login');
  }, [token, authLoading, router]);

  useEffect(() => {
    if (token) fetchReservations();
  }, [token, fetchReservations]);

  const updateStatus = async (r: Reservation, statut: Status, optMessage: string) => {
    setActionLoading(r.documentId);
    console.log(`${STRAPI_URL}/api/reservations/${r.documentId}`, 'route')
    try {
      const res = await fetch(`${STRAPI_URL}/api/reservations/${r.documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            statut,
            message: optMessage
          }
        }),
      });
      //call webhook
      await fetch('http://localhost:5678/webhook-test/87ebfc11-f5ac-45c7-94de-b89349927778', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        body: JSON.stringify({
          statut,
          message: optMessage,
          first_name: r.first_name,
          last_name: r.last_name,
          telephone: r.phone,
          date: r.date,
          time: r.time,
          guests: r.guests
        })
      });
      if (!res.ok) throw new Error();
      setReservations((prev) =>
        prev.map((r) => r.documentId === r.documentId ? { ...r, statut, optMessage } : r)
      );
      showToast(
        statut === 'confirmed' ? 'Réservation confirmée ✓' : 'Réservation refusée',
        statut === 'confirmed' ? 'success' : 'error'
      );
    }

    catch {
      showToast('Erreur lors de la mise à jour', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Stats
  const stats = {
    all: reservations.length,
    pending: reservations.filter(r => r.statut === 'pending').length,
    confirmed: reservations.filter(r => r.statut === 'confirmed').length,
    cancelled: reservations.filter(r => r.statut === 'cancelled').length,
  };

  // Filter + search
  const filtered = reservations.filter((r) => {
    const matchStatus = filter === 'all' || r.statut === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || [r.first_name, r.last_name, r.email, r.phone]
      .some(v => v?.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  });

  if (authLoading) return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <Loader2 size={28} className="text-gold animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 text-sm font-body border flex items-center gap-2 shadow-xl ${toast.type === 'success'
          ? 'bg-green-400/10 border-green-400/30 text-green-400'
          : 'bg-red-400/10 border-red-400/30 text-red-400'
          }`}>
          {toast.type === 'success' ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-charcoal border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-lg text-cream">
            Saveurs<span className="text-gold">&apos;</span>Ailleurs
          </p>
          <p className="text-smoke text-[10px] tracking-widest uppercase">Gestion des réservations</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchReservations} className="p-2 text-smoke hover:text-gold transition-colors" title="Actualiser">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={logout} className="flex items-center gap-2 text-smoke hover:text-cream text-xs tracking-widest uppercase transition-colors">
            <LogOut size={13} /> Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {([
            { key: 'all', label: 'Total', value: stats.all, color: 'text-cream' },
            { key: 'pending', label: 'En attente', value: stats.pending, color: 'text-amber-400' },
            { key: 'confirmed', label: 'Confirmées', value: stats.confirmed, color: 'text-green-400' },
            { key: 'cancelled', label: 'Refusées', value: stats.cancelled, color: 'text-red-400' },
          ] as const).map(({ key, label, value, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`bg-charcoal border p-4 text-left transition-all ${filter === key ? 'border-gold' : 'border-white/5 hover:border-white/20'
                }`}
            >
              <p className={`font-display text-3xl ${color}`}>{value}</p>
              <p className="text-smoke text-xs tracking-widest uppercase mt-1">{label}</p>
            </button>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Status | 'all')}
            className="input-field w-auto text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmées</option>
            <option value="cancelled">Refusées</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="text-gold animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-white/5 bg-charcoal">
            <Calendar size={32} className="text-smoke mx-auto mb-3" />
            <p className="text-smoke">Aucune réservation trouvée</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((r) => {
              const isExpanded = expandedId === r.id;
              const isActioning = actionLoading === r.documentId;

              return (
                <div key={r.id} className={`bg-charcoal border transition-all ${isExpanded ? 'border-gold/30' : 'border-white/5 hover:border-white/15'
                  }`}>
                  {/* Row */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : r.id)}
                    className="w-full px-5 py-4 flex items-center gap-4 text-left"
                  >
                    {/* Date + Time */}
                    <div className="shrink-0 w-24 text-center bg-obsidian px-2 py-2 border border-white/5">
                      <p className="text-gold font-display text-lg leading-none">
                        {new Date(r.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                      </p>
                      <p className="text-smoke text-xs mt-1">{r.time}</p>
                    </div>

                    {/* Name + Email */}
                    <div className="flex-1 min-w-0">
                      <p className="text-cream font-body font-bold text-sm truncate">
                        {r.first_name} {r.last_name}
                      </p>
                      <p className="text-smoke text-xs truncate">{r.email}</p>
                    </div>

                    {/* Guests */}
                    <div className="hidden sm:flex items-center gap-1.5 text-smoke text-xs shrink-0">
                      <Users size={12} />
                      {r.guests} pers.
                    </div>

                    {/* Status */}
                    <div className="shrink-0">
                      <StatusBadge statut={r.statut} />
                    </div>

                    {/* Expand icon */}
                    <ChevronDown
                      size={14}
                      className={`text-smoke shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <textarea
                    value={optMessages[r.id] || ''}
                    onChange={(e) =>
                      setOptMessages(prev => ({
                        ...prev,
                        [r.id]: e.target.value
                      }))
                    }
                    placeholder="Message optionnel..."
                    className="input-field w-full text-sm mb-4"
                    rows={3}
                  />
                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={13} className="text-gold shrink-0" />
                          <a href={`tel:${r.phone}`} className="text-smoke hover:text-cream transition-colors">
                            {r.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={13} className="text-gold shrink-0" />
                          <a href={`mailto:${r.email}`} className="text-smoke hover:text-cream transition-colors truncate">
                            {r.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={13} className="text-gold shrink-0" />
                          <span className="text-smoke">
                            Reçue le {new Date(r.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {r.special_requests && (
                        <div className="bg-obsidian border border-white/5 px-4 py-3 mb-5">
                          <p className="text-gold text-[10px] tracking-widest uppercase mb-1">Demandes particulières</p>
                          <p className="text-smoke text-sm">{r.special_requests}</p>
                        </div>
                      )}

                      {/* Actions */}
                      {r.statut === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateStatus(r, 'confirmed', optMessages[r.id] || '')}
                            disabled={isActioning}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-400/10 border border-green-400/30 text-green-400 text-xs font-body font-bold tracking-widest uppercase hover:bg-green-400/20 transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                            Confirmer
                          </button>
                          <button
                            onClick={() => updateStatus(r, 'cancelled', optMessages[r.id] || '')}
                            disabled={isActioning}
                            className="flex items-center gap-2 px-5 py-2.5 bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-body font-bold tracking-widest uppercase hover:bg-red-400/20 transition-colors disabled:opacity-50"
                          >
                            {isActioning ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />}
                            Refuser
                          </button>
                        </div>
                      )}

                      {r.statut === 'confirmed' && (
                        <button
                          onClick={() => updateStatus(r, 'cancelled', optMessages[r.id] || '')}
                          disabled={isActioning}
                          className="flex items-center gap-2 px-5 py-2.5 bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-body font-bold tracking-widest uppercase hover:bg-red-400/20 transition-colors disabled:opacity-50"
                        >
                          {isActioning ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />}
                          Annuler la réservation
                        </button>
                      )}

                      {r.statut === 'cancelled' && (
                        <button
                          onClick={() => updateStatus(r, 'confirmed', optMessages[r.id] || '')}
                          disabled={isActioning}
                          className="flex items-center gap-2 px-5 py-2.5 bg-green-400/10 border border-green-400/30 text-green-400 text-xs font-body font-bold tracking-widest uppercase hover:bg-green-400/20 transition-colors disabled:opacity-50"
                        >
                          {isActioning ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                          Rétablir
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
