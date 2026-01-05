import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('sanity-webhook-secret');
    if (secret !== WEBHOOK_SECRET) {
      console.error('Invalid webhook secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (body.project && body.project._id) {
      revalidatePath('/');

      if (body.project.slug && body.project.slug.current) {
        revalidatePath(`/projects/${body.project.slug.current}`);
      }

      console.log(`Revalidated project: ${body.project._id}`);
    }

    if (body._type === 'about' || body._type === 'experience' || body._type === 'tech' || body._type === 'iknow') {
      revalidatePath('/');
      console.log(`Revalidated ${body._type}`);
    }

    return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
