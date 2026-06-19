 Site Restaurant

Stack : **Next.js 14** · **Strapi 5** · **Tailwind CSS** · **n8n** (automation)

---

## Démarrage rapide

### 1. Installer les dépendances Next.js dans le dossier racine dedier au front

npm install


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

## Intégration Strapi

Le fichier `src/lib/strapi.ts` contient toutes les fonctions d'appel API.
 Etant a des fin de test et pour aller vite on a utilise des mocks a certains endroits sauf pour les recuperer les menu qui font des vraies appel API
