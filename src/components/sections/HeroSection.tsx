'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient (replace with actual hero image from Strapi) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 60% 40%, #3d2408 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, #1a0d02 0%, transparent 50%),
            linear-gradient(180deg, #0D0D0D 0%, #1E1208 50%, #0D0D0D 100%)
          `,
        }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#C9A84C 1px, transparent 1px),
            linear-gradient(90deg, #C9A84C 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gold orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, #C9A84C18 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="section-eyebrow mb-6 animate-fade-up">
          Restaurant gastronomique · Ouagadougou
        </p>

        <h1 ref={titleRef} className="font-display text-6xl md:text-8xl text-cream leading-none mb-6">
          L&apos;Âme de{' '}
          <em className="not-italic gold-gradient">l&apos;Afrique</em>
          <br />
          dans chaque assiette
        </h1>

        <div className="gold-divider" />

        <p className="text-smoke text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Une cuisine qui transcende les frontières — des recettes transmises de génération en
          génération, revisitées avec une élégance contemporaine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservation" className="btn-primary">
            Réserver une table
          </Link>
          <Link href="/menu" className="btn-outline">
            Découvrir le menu
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-smoke">
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
