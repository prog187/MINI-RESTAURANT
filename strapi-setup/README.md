# Strapi 5 — Guide de configuration

## Installation

```bash
npx create-strapi-app@latest restaurant-cms --quickstart
# ou avec Docker :
# docker run -p 1337:1337 strapi/strapi
```

## Variables d'environnement (Next.js `.env.local`)

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# n8n — ajouter quand prêt
N8N_RESERVATION_WEBHOOK_URL=https://your-n8n.instance.com/webhook/restaurant
WEBHOOK_SECRET=your_secret_key
```

---

## Content Types à créer dans Strapi

### 1. `restaurant-info` (Single Type)
| Champ | Type | Remarques |
|-------|------|-----------|
| name | Text (Short) | Obligatoire |
| tagline | Text (Short) | |
| description | Rich Text | |
| address | Text (Long) | |
| phone | Text (Short) | |
| email | Email | |
| opening_hours | Component (répétable) | Voir composant ci-dessous |
| hero_image | Media (single) | |
| gallery | Media (multiple) | |

**Composant `opening-hour` :**
| Champ | Type |
|-------|------|
| day | Text (Short) |
| open | Text (Short) |
| close | Text (Short) |
| closed | Boolean |

---

### 2. `menu-category` (Collection Type)
| Champ | Type | Remarques |
|-------|------|-----------|
| name | Text (Short) | Obligatoire |
| slug | UID (from name) | |
| description | Text (Short) | |
| order | Integer | Pour trier |
| dishes | Relation (1-many → dish) | |

---

### 3. `dish` (Collection Type)
| Champ | Type | Remarques |
|-------|------|-----------|
| name | Text (Short) | Obligatoire |
| description | Text (Long) | |
| price | Integer | En FCFA |
| vegetarian | Boolean | Default: false |
| vegan | Boolean | Default: false |
| spicy_level | Integer (0-3) | |
| featured | Boolean | Default: false |
| order | Integer | |
| image | Media (single) | |
| category | Relation (many-1 → menu-category) | |

---

### 4. `reservation` (Collection Type)
| Champ | Type | Remarques |
|-------|------|-----------|
| first_name | Text (Short) | Obligatoire |
| last_name | Text (Short) | Obligatoire |
| email | Email | Obligatoire |
| phone | Text (Short) | Obligatoire |
| date | Date | Obligatoire |
| time | Text (Short) | ex: "20:00" |
| guests | Integer | |
| special_requests | Text (Long) | |
| status | Enumeration | pending, confirmed, cancelled, no_show |

---

### 5. `testimonial` (Collection Type)
| Champ | Type |
|-------|------|
| author_name | Text (Short) |
| author_origin | Text (Short) |
| rating | Integer (1-5) |
| content | Text (Long) |

---

### 6. `contact-message` (Collection Type)
| Champ | Type |
|-------|------|
| name | Text (Short) |
| email | Email |
| subject | Text (Short) |
| message | Text (Long) |

---

## Permissions API (Settings → Users & Permissions → Public)

Pour chaque content type, activer en **PUBLIC** :
- `restaurant-info` → find
- `menu-category` → find, findOne
- `dish` → find, findOne
- `testimonial` → find
- `reservation` → create (**UNIQUEMENT** create, pas find !)
- `contact-message` → create

Créer un **API Token** (Settings → API Tokens) :
- Type : Full Access ou Custom
- Copier le token dans `.env.local`

---

## Webhooks Strapi → n8n

Dans Strapi : Settings → Webhooks → Add new webhook

```
Name: Réservation créée
URL: https://your-n8n.instance.com/webhook/reservation-created
Events: ✅ entry.create (reservation)
Headers: x-webhook-secret: your_secret_key
```

---

## Flux n8n suggérés (à automatiser plus tard)

### Flux 1 : Nouvelle réservation
```
Trigger: Webhook (POST /webhook/reservation-created)
  → Envoyer email de confirmation au client (Gmail/SMTP)
  → Envoyer notification WhatsApp au restaurant
  → Créer événement Google Calendar
  → Mettre à jour statut Strapi → "confirmed"
```

### Flux 2 : Rappel de réservation
```
Trigger: Schedule (tous les jours à 10h)
  → Lire réservations Strapi du lendemain
  → Envoyer SMS de rappel (Twilio)
```

### Flux 3 : No-show
```
Trigger: Webhook manuel (depuis dashboard)
  → Mettre à jour statut → "no_show"
  → Enregistrer dans CRM
```
