import { Award, Users, Utensils } from 'lucide-react';

const stats = [
  { icon: Utensils, value: '80+', label: 'Recettes authentiques' },
  { icon: Users, value: '5 000+', label: 'Convives satisfaits' },
  { icon: Award, value: '3', label: 'Distinctions culinaires' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <div className="relative">
          {/* Main image placeholder */}
          <div
            className="w-full h-96 lg:h-[520px]"
            style={{
              background: `
                radial-gradient(ellipse at 40% 30%, #3d2408 0%, #1E1208 40%, #0D0D0D 100%)
              `,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <span className="font-display text-8xl text-gold/10">Chef</span>
              </div>
            </div>
          </div>

          {/* Gold accent frame */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/30" />
          <div className="absolute -top-4 -left-4 w-20 h-20 border border-gold/20" />

          {/* Floating stat card */}
          <div className="absolute bottom-8 left-8 bg-obsidian border border-gold/20 p-5">
            <p className="font-display text-3xl text-gold">12+</p>
            <p className="text-smoke text-xs tracking-widest uppercase">Années d&apos;excellence</p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="section-eyebrow mb-4">Notre histoire</p>
          <h2 className="section-title mb-6">
            Une passion née{' '}
            <em className="not-italic text-gold">du cœur de l&apos;Afrique</em>
          </h2>
          <div className="gold-divider mx-0 mb-6" />

          <p className="text-smoke leading-relaxed mb-5">
            Saveurs&apos;Ailleurs est né d&apos;un rêve simple : faire connaître la richesse
            inestimable de la gastronomie d&apos;Afrique de l&apos;Ouest au monde entier. Notre
            chef fondateur, issu d&apos;une famille de cuisinières burkinabè, a consacré sa vie
            à collecter et sublimer des recettes ancestrales.
          </p>
          <p className="text-smoke leading-relaxed mb-10">
            Chaque ingrédient est sourcé localement auprès de producteurs de confiance.
            Chaque technique honore la tradition tout en embrassant la créativité contemporaine.
            C&apos;est cette tension entre mémoire et innovation qui définit notre identité.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="text-gold mx-auto mb-2" />
                <p className="font-display text-2xl text-cream">{value}</p>
                <p className="text-smoke text-xs tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
