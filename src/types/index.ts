// ─── Strapi Base ───────────────────────────────────────────────────────────────

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Restaurant ────────────────────────────────────────────────────────────────

export interface RestaurantInfo {
  id: number;
  documentId: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  opening_hours: OpeningHour[];
  hero_image: StrapiImage;
  gallery: StrapiImage[];
}

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

// ─── Menu ──────────────────────────────────────────────────────────────────────

export interface MenuCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  dishes: Dish[];
}

export interface Dish {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  vegetarian: boolean;
  vegan: boolean;
  spicy_level: 0 | 1 | 2 | 3;
  featured: boolean;
  order?: number;
  image: StrapiImage;
  category: MenuCategory;
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number;
  documentId: string;
  author_name: string;
  author_origin: string;
  rating: number;
  content: string;
  createdAt: string;
}

// ─── Forms ─────────────────────────────────────────────────────────────────────

export interface ReservationInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  statut?: 'pending';
}

export interface Reservation extends ReservationInput {
  id: number;
  documentId: string;
  createdAt: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactInput {
  id: number;
  documentId: string;
  createdAt: string;
}
