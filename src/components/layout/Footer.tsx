import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ember border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="font-display text-2xl text-cream mb-3">
            Saveurs<span className="text-gold">&apos;</span>Ailleurs
          </p>
          <p className="text-smoke text-sm leading-relaxed mb-6 max-w-xs">
            Une expérience culinaire qui célèbre l&apos;héritage gastronomique d&apos;Afrique de l&apos;Ouest
            avec une élégance contemporaine.
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-white/10 flex items-center justify-center
                         text-smoke hover:border-gold hover:text-gold transition-all"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-white/10 flex items-center justify-center
                         text-smoke hover:border-gold hover:text-gold transition-all"
              aria-label="Facebook"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="section-eyebrow mb-4">Contact</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-smoke text-sm">
              <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
              Avenue Kwamé N&apos;Krumah, Ouagadougou, Burkina Faso
            </li>
            <li className="flex items-center gap-3 text-smoke text-sm">
              <Phone size={14} className="text-gold shrink-0" />
              <a href="tel:+22670000000" className="hover:text-gold transition-colors">
                +226 70 00 00 00
              </a>
            </li>
            <li className="flex items-center gap-3 text-smoke text-sm">
              <Mail size={14} className="text-gold shrink-0" />
              <a href="mailto:contact@saveurs-ailleurs.bf" className="hover:text-gold transition-colors">
                contact@saveurs-ailleurs.bf
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="section-eyebrow mb-4">Horaires</p>
          <ul className="space-y-2">
            {[
              { days: 'Lundi – Vendredi', hours: '12h00 – 14h30 · 19h00 – 23h00' },
              { days: 'Samedi', hours: '12h00 – 15h00 · 19h00 – 23h30' },
              { days: 'Dimanche', hours: '12h00 – 15h00' },
            ].map((h) => (
              <li key={h.days} className="flex items-start gap-3 text-sm">
                <Clock size={13} className="text-gold mt-0.5 shrink-0" />
                <span>
                  <span className="text-cream">{h.days}</span>
                  <br />
                  <span className="text-smoke text-xs">{h.hours}</span>
                </span>
              </li>
            ))}
          </ul>

          <Link href="/reservation" className="btn-outline mt-6 text-xs py-3 px-6 w-fit inline-flex">
            Réserver une table
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-5">
        <p className="text-smoke text-xs text-center tracking-widest">
          © {new Date().getFullYear()} Saveurs&apos;Ailleurs · Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
