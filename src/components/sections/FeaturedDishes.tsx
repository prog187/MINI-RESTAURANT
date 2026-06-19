import Link from 'next/link';
import Image from 'next/image';
import type { Dish } from '@/types';
import { Flame, Leaf } from 'lucide-react';

// Mock data used when Strapi is not yet connected
const MOCK_DISHES = [
  {
    id: 1,
    name: 'Thiéboudienne Royal',
    description: "Riz au poisson traditionnel enrichi de légumes du terroir, infusé aux épices de notre jardin. La fierté de notre chef.",
    price: 8500,
    vegetarian: false,
    vegan: false,
    spicy_level: 1,
    featured: true,
    image: null,
    category: { name: 'Plats principaux' },
  },
  {
    id: 2,
    name: 'Attiéké au Poulet Yassa',
    description: "Semoule de manioc artisanale accompagnée d'un poulet mariné à la moutarde et aux oignons confits.",
    price: 7200,
    vegetarian: false,
    vegan: false,
    spicy_level: 2,
    featured: true,
    image: null,
    category: { name: 'Plats principaux' },
  },
  {
    id: 3,
    name: 'Accra de Haricots',
    description: "Beignets croustillants de haricots noirs aux herbes aromatiques, servis avec sauce piment doux maison.",
    price: 3500,
    vegetarian: true,
    vegan: true,
    spicy_level: 1,
    featured: true,
    image: null,
    category: { name: 'Entrées' },
  },
];

interface DishCardProps {
  dish: typeof MOCK_DISHES[0];
}
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function SpicyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <Flame
          key={i}
          size={11}
          className={i <= level ? 'text-gold' : 'text-white/15'}
          fill={i <= level ? '#C9A84C' : 'transparent'}
        />
      ))}
    </div>
  );
}

function DishCard( { dish }: { dish: Dish }) {
  return (
    <div className="card-dish group">
      {/* Image placeholder */}
      <div className="relative h-56 bg-charcoal overflow-hidden">
        {dish.image ? (
          <Image
            src={`${STRAPI_URL}${dish.image.url}`}
            alt={dish.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at center, #3d2408 0%, #1A1A1A 100%)`,
            }}
          >
            <span className="text-gold/20 text-7xl font-display italic">
              {dish.name}
            </span>
          </div>
        )}
        {/* Category pill */}
        <span className="absolute top-3 left-3 bg-obsidian/80 text-gold text-[10px] tracking-widest uppercase px-3 py-1 backdrop-blur-sm">
          {dish.category.name}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-lg text-cream leading-tight">{dish.name}</h3>
          <span className="text-gold font-body font-bold text-sm shrink-0">
            {dish.price.toLocaleString('fr-FR')} FCFA
          </span>
        </div>

        <p className="text-smoke text-sm leading-relaxed mb-4">{dish.description}</p>

        <div className="flex items-center gap-3">
          {dish.spicy_level > 0 && <SpicyDots level={dish.spicy_level} />}
          {dish.vegan && (
            <span className="flex items-center gap-1 text-[10px] text-green-400 tracking-widest uppercase">
              <Leaf size={10} /> Vegan
            </span>
          )}
          {!dish.vegan && dish.vegetarian && (
            <span className="flex items-center gap-1 text-[10px] text-green-400 tracking-widest uppercase">
              <Leaf size={10} /> Végé
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface FeaturedDishesProps {
  dishes?: Dish[];
}

export default function FeaturedDishes({ dishes }: FeaturedDishesProps) {
  const items = dishes;
  console.log('FeaturedDishes items:', items?.length);


  return (
    <section id="menu-preview" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="section-eyebrow mb-3">Notre cuisine</p>
        <h2 className="section-title">Spécialités de la maison</h2>
        <div className="gold-divider" />
        <p className="text-smoke max-w-lg mx-auto text-sm leading-relaxed">
          Chaque plat raconte une histoire — celle des marchés colorés, des épices rares
          et du savoir-faire transmis par nos aînés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {items?.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>

      <div className="text-center">
        <Link href="/menu" className="btn-outline">
          Voir la carte complète
        </Link>
      </div>
    </section>
  );
}
