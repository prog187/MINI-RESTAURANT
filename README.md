# 🍽️ Saveurs'Ailleurs — Site Restaurant

Stack : **Next.js 14** · **Strapi 5** · **Tailwind CSS** · **n8n** (automation)

---

## 🚀 Démarrage rapide

### 1. Installer les dépendances Next.js
```bash
npm install
```

### 2. Configurer les variables d'environnement
```bash
cp .env.example .env.local
# Remplir les valeurs dans .env.local
```

### 3. Installer et lancer Strapi
```bash
npx create-strapi-app@latest restaurant-cms --quickstart
cd restaurant-cms && npm run develop
# Admin panel : http://localhost:1337/admin
```

### 4. Configurer Strapi
Suivre `strapi-setup/README.md` pour :
- Créer les Content Types
- Configurer les permissions API
- Générer un API Token

### 5. Lancer Next.js
```bash
npm run dev
# http://localhost:3000
```

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── menu/page.tsx         # Carte du restaurant
│   ├── reservation/page.tsx  # Formulaire de réservation
│   └── api/
│       ├── reservation/      # POST → Strapi + n8n webhook
│       └── webhooks/n8n/     # Receiver webhooks n8n
├── components/
│   ├── layout/               # Navbar, Footer
│   └── sections/             # Hero, Dishes, About, Testimonials
├── lib/
│   └── strapi.ts             # Client API Strapi
└── types/
    └── index.ts              # TypeScript types

strapi-setup/
└── README.md                 # Guide configuration Strapi + n8n
```

---

## 🔌 Intégration Strapi

Le fichier `src/lib/strapi.ts` contient toutes les fonctions d'appel API.

Pour activer Strapi sur une page, décommenter les appels dans les page.tsx :
```typescript
// Avant :
// const [dishesRes] = await Promise.all([getDishes()]);

// Après :
const [dishesRes] = await Promise.all([getDishes()]);
const dishes = dishesRes.data.filter(d => d.featured);
```

---

## 🤖 Automatisation n8n

### Flux déjà câblés (prêts à brancher)

| Événement | Route | Destination |
|-----------|-------|-------------|
| Nouvelle réservation | `POST /api/reservation` | → Strapi + `N8N_RESERVATION_WEBHOOK_URL` |
| Webhook entrant n8n | `POST /api/webhooks/n8n` | ← n8n push status updates |

### Variables d'env à configurer
```env
N8N_RESERVATION_WEBHOOK_URL=https://n8n.votredomaine.com/webhook/...
WEBHOOK_SECRET=votre_cle_secrete
```

Voir `strapi-setup/README.md` pour les flux n8n suggérés (emails, WhatsApp, Calendar...).

---

## 🎨 Design tokens

| Token | Valeur | Usage |
|-------|--------|-------|
| `obsidian` | `#0D0D0D` | Background principal |
| `charcoal` | `#1A1A1A` | Sections alternées |
| `ember` | `#1E1208` | Footer, CTAs |
| `gold` | `#C9A84C` | Accent principal |
| `cream` | `#F5EDD6` | Texte principal |
| `smoke` | `#9A9087` | Texte secondaire |

---

## 📦 Production

```bash
npm run build
npm run start

# Ou avec Docker :
# docker build -t restaurant-site .
# docker run -p 3000:3000 restaurant-site
```
