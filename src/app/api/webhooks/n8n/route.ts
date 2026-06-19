import { NextRequest, NextResponse } from 'next/server';


const ALLOWED_EVENTS = [
  'reservation.created',
  'reservation.confirmed',
  'reservation.cancelled',
  'contact.created',
] as const;

type AllowedEvent = typeof ALLOWED_EVENTS[number];

export async function POST(req: NextRequest) {
  try {
  
    const secret = req.headers.get('x-webhook-secret');
    if (process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { event, data } = body;

    if (!ALLOWED_EVENTS.includes(event as AllowedEvent)) {
      return NextResponse.json({ error: `Unknown event: ${event}` }, { status: 400 });
    }

    console.log(`[Webhook] Event received: ${event}`, { id: data?.id });

    
    switch (event as AllowedEvent) {
      case 'reservation.confirmed':
       
        break;

      case 'reservation.cancelled':
        
        break;

      case 'contact.created':
        
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true, event }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
