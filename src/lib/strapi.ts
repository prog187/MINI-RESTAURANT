import { Dish, MenuCategory, RestaurantInfo, Reservation, ReservationInput, ContactInput, ContactMessage, Testimonial } from '@/types';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

export async function fetchStrapi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      ...options.headers,
    },
    ...options,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.warn(`[Strapi] ${res.status} — ${path}`);
  }

  return res.json();
}

export function getStrapiMedia(url: string | null): string {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ─── Collections ───────────────────────────────────────────────────────────────

export async function getMenuCategories() {
  return fetchStrapi<{ data: MenuCategory[] }>(
    '/menu-categories?populate=dishes.image&sort=order:asc'
  );
}

export async function getDishes(categorySlug?: string) {
  console.log(categorySlug, 'categorySlug');
  const filter = categorySlug
    ? `&filters[category][slug][$eq]=${categorySlug}`
    : '';
    console.log(filter, 'filter');
  return fetchStrapi<{ data: Dish[] }>(
    `/dishes?populate=category&populate=image${filter}&sort=order:asc`
  );
}

export async function getRestaurantInfo() {
  return fetchStrapi<{ data: RestaurantInfo }>(
    '/restaurant-info?populate=hero_image,gallery'
  );
}

export async function getTestimonials() {
  return fetchStrapi<{ data: Testimonial[] }>(
    '/testimonials?sort=createdAt:desc&pagination[limit]=6'
  );
}

// ─── Mutations (n8n-ready webhooks) ────────────────────────────────────────────

export async function createReservation(data: ReservationInput) {
  console.log('Creating reservation with data:', data);
  return fetchStrapi<{ data: Reservation }>('/reservations', {
    method: 'POST',
    body: JSON.stringify({ data }),
    next: { revalidate: 0 },
  });
}

export async function createContactMessage(data: ContactInput) {
  return fetchStrapi<{ data: ContactMessage }>('/contact-messages', {
    method: 'POST',
    body: JSON.stringify({ data }),
    next: { revalidate: 0 },
  });
}
