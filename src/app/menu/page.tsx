import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Flame, Leaf } from 'lucide-react';

const MENU_CATEGORIES = [
  {
    id: 1,
    name: 'Entrées',
    description: 'Mises en bouche pour éveiller les sens',
    dishes: [
      { id: 1, name: 'Accra de Haricots', description: 'Beignets croustillants de haricots noirs aux herbes aromatiques, sauce piment doux.', price: 3500, vegetarian: true, vegan: true, spicy_level: 1 },
      { id: 2, name: 'Salade de Papaye Verte', description: 'Papaye verte râpée, tomates cerise, crevettes séchées, citron vert et piment.', price: 3000, vegetarian: false, vegan: false, spicy_level: 2 },
      { id: 3, name: 'Velouté d\'Arachide', description: 'Velouté chaud aux cacahouètes grillées, crème de coco et gingembre frais.', price: 2800, vegetarian: true, vegan: true, spicy_level: 0 },
    ],
  },
  {
    id: 2,
    name: 'Plats principaux',
    description: 'Le cœur de notre cuisine',
    dishes: [
      { id: 4, name: 'Thiéboudienne Royal', description: 'Riz au poisson traditionnel enrichi de légumes du terroir, infusé aux épices de notre jardin.', price: 8500, vegetarian: false, vegan: false, spicy_level: 1 },
      { id: 5, name: 'Poulet Yassa', description: 'Poulet mariné à la moutarde et aux oignons confits, servi avec riz basmati parfumé.', price: 7200, vegetarian: false, vegan: false, spicy_level: 2 },
      { id: 6, name: 'Mafé de Bœuf', description: 'Ragoût de bœuf à la sauce d\'arachide, patates douces et légumes de saison.', price: 9000, vegetarian: false, vegan: false, spicy_level: 1 },
      { id: 7, name: 'Riz Djoloff Végétarien', description: 'Riz cuisiné aux tomates et épices, accompagné de légumes grillés et d\'avocat.', price: 5500, vegetarian: true, vegan: true, spicy_level: 1 },
    ],
  },
  {
    id: 3,
    name: 'Desserts',
    description: 'Une douceur pour finir en beauté',
    dishes: [
      { id: 8, name: 'Thiakry à la Mangue', description: 'Semoule fermentée au lait de coco, dés de mangue fraîche et zeste de citron vert.', price: 2500, vegetarian: true, vegan: false, spicy_level: 0 },
      { id: 9, name: 'Bananes Flambées', description: 'Bananes plantains caramélisées au rhum brun, servies avec glace vanille maison.', price: 3200, vegetarian: true, vegan: false, spicy_level: 0 },
    ],
  },
  {
    id: 4,
    name: 'Boissons',
    description: 'Fraîcheur et tradition',
    dishes: [
      { id: 10, name: 'Bissap Maison', description: 'Jus d\'hibiscus infusé à froid, sucré à la canne, menthe fraîche.', price: 1500, vegetarian: true, vegan: true, spicy_level: 0 },
      { id: 11, name: 'Gnamakoudji', description: 'Jus de gingembre frais pressé, miel, citron — la boisson de la vitalité.', price: 1500, vegetarian: true, vegan: true, spicy_level: 1 },
      { id: 12, name: 'Dabileni', description: 'Boisson aux fleurs séchées de tamarin, légèrement acidulée et désaltérante.', price: 1500, vegetarian: true, vegan: true, spicy_level: 0 },
    ],
  },
];

function SpicyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <Flame key={i} size={10} className={i <= level ? 'text-gold' : 'text-white/10'} fill={i <= level ? '#C9A84C' : 'transparent'} />
      ))}
    </div>
  );
}

export default async function MenuPage() {
 
  const categories = MENU_CATEGORIES;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <div className="py-20 px-6 text-center"
          style={{ background: 'linear-gradient(180deg, #1E1208 0%, #0D0D0D 100%)' }}
        >
          <p className="section-eyebrow mb-3">Notre carte</p>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-4">Le Menu</h1>
          <div className="gold-divider" />
          <p className="text-smoke text-sm max-w-md mx-auto">
            Tous nos plats sont préparés à la commande avec des produits locaux et de saison.
            Les prix sont exprimés en FCFA.
          </p>
        </div>

        {/* Categories */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
          {categories.map((cat) => (
            <div key={cat.id}>
              {/* Category header */}
              <div className="mb-8 border-b border-gold/20 pb-4">
                <h2 className="font-display text-3xl text-cream">{cat.name}</h2>
                <p className="text-smoke text-sm mt-1">{cat.description}</p>
              </div>

              {/* Dishes */}
              <div className="space-y-0 divide-y divide-white/5">
                {cat.dishes.map((dish) => (
                  <div key={dish.id} className="flex items-start justify-between gap-6 py-5
                                                 hover:bg-charcoal/30 px-4 -mx-4 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-body font-bold text-cream">{dish.name}</h3>
                        {dish.vegan && (
                          <span className="flex items-center gap-1 text-[9px] text-green-400 tracking-widest uppercase">
                            <Leaf size={9} /> Vegan
                          </span>
                        )}
                        {!dish.vegan && dish.vegetarian && (
                          <span className="flex items-center gap-1 text-[9px] text-green-400 tracking-widest uppercase">
                            <Leaf size={9} /> Végé
                          </span>
                        )}
                        {dish.spicy_level > 0 && <SpicyDots level={dish.spicy_level} />}
                      </div>
                      <p className="text-smoke text-sm leading-relaxed">{dish.description}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-gold font-bold font-body whitespace-nowrap">
                        {dish.price.toLocaleString('fr-FR')} <span className="text-smoke font-normal text-xs">FCFA</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* note */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <p className="text-smoke text-xs border-t border-white/5 pt-6 leading-relaxed">
            * Informez votre serveur de toute allergie alimentaire. Nous adaptons nos recettes
            dans la mesure du possible. Les prix incluent les taxes et service.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
