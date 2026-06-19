import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';
// n8n webhook URL — set this in .env.local when you're ready
const N8N_WEBHOOK_URL = process.env.N8N_RESERVATION_WEBHOOK_URL || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ['first_name', 'last_name', 'email', 'phone', 'date', 'time', 'guests'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Champ requis manquant : ${field}` },
          { status: 400 }
        );
      }
    }

    // 1. Save to Strapi
    const strapiRes = await fetch(`${STRAPI_URL}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      body: JSON.stringify({
        data: {
          ...body,
          status: 'pending',
          guests: parseInt(body.guests, 10) || 2,
        },
      }),
    });

    if (!strapiRes.ok) {
      const err = await strapiRes.json();
      console.error('Strapi error:', err);
      throw new Error('Erreur Strapi lors de la création de la réservation');
    }

    const reservation = await strapiRes.json();

    // 2. Fire n8n webhook (non-blocking — n8n handles confirmation email, SMS, etc.)
    if (N8N_WEBHOOK_URL) {
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'reservation.created',
          reservation: reservation.data,
          timestamp: new Date().toISOString(),
        }),
      }).catch((e) => console.error('n8n webhook error:', e));
    }

    return NextResponse.json({ success: true, data: reservation.data }, { status: 201 });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la réservation. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
