import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedDishes from '@/components/sections/FeaturedDishes';
import AboutSection from '@/components/sections/AboutSection';
import Testimonials from '@/components/sections/Testimonials';
import Link from 'next/link';

 import { getDishes, getTestimonials } from '@/lib/strapi';

export default async function HomePage() {
  const [dishesRes, testimonialsRes] = await Promise.all([
    
    getDishes(),
    getTestimonials(),
  ]);
  const dishes = dishesRes?.data?.filter(d => d.featured) ?? [];
  console.log('Featured dishes:', dishes);
  const testimonials = testimonialsRes?.data ?? [];
console.log('Testimonials:', testimonials);
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedDishes  dishes={dishes}  />
        <AboutSection />
        <Testimonials  items={testimonials}  />

        {/* Reservation */}
        <section className="py-20 px-6 text-center"
          style={{
            background: `linear-gradient(135deg, #1E1208 0%, #2d1a06 50%, #1E1208 100%)`,
          }}
        >
          <p className="section-eyebrow mb-4">Vivez l&apos;expérience</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
            Réservez votre table
          </h2>
          <div className="gold-divider" />
          <p className="text-smoke max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Pour les dîners privés, événements et célébrations, contactez-nous
            directement ou réservez en ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation" className="btn-primary">
              Réserver en ligne
            </Link>
            <a href="tel:+22670000000" className="btn-outline">
              Appeler le restaurant
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
