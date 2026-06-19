import { Star } from 'lucide-react';
import {Testimonial} from '@/types';
const MOCK_TESTIMONIALS = [
  {
    id: 1,
    author_name: 'Amara Koné',
    author_origin: 'Abidjan, Côte d\'Ivoire',
    rating: 5,
    content: 'Une expérience inoubliable. Le Thiéboudienne était exactement comme chez ma grand-mère, mais avec une présentation digne des plus grandes maisons. Je reviens chaque fois que je passe à Ouagadougou.',
  },
  {
    id: 2,
    author_name: 'Claire Dupont',
    author_origin: 'Paris, France',
    rating: 5,
    content: "J'ai découvert la vraie cuisine d'Afrique de l'Ouest ici. L'équipe est attentionnée, l'ambiance est magnifique. Une adresse incontournable à Ouaga.",
  },
  {
    id: 3,
    author_name: 'Ibrahim Traoré',
    author_origin: 'Ouagadougou',
    rating: 5,
    content: 'Le meilleur restaurant de la ville, sans hésitation. Les saveurs sont authentiques et le service est impeccable. C\'est notre table pour les grandes occasions.',
  },
];

interface TestimonialsProps {
  items?:Testimonial[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  console.log('Received testimonials:', items?.length);
  const testimonials = items && items.length > 0 ? items : MOCK_TESTIMONIALS;

  return (
    <section id="testimonials" className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">Ce qu&apos;ils disent</p>
          <h2 className="section-title">Témoignages</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-obsidian border border-white/5 p-7 flex flex-col gap-4
                                        hover:border-gold/20 transition-colors duration-300">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < t.rating ? 'text-gold' : 'text-white/15'}
                    fill={i < t.rating ? '#C9A84C' : 'transparent'}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-smoke text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-white/5 pt-4">
                <p className="text-cream text-sm font-body">{t.author_name}</p>
                <p className="text-gold text-xs tracking-widest">{t.author_origin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
