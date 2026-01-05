import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

type SanityWebhookPayload = {
  _type: string;
  _id: string;
  slug?: { current: string };
  project?: {
    _id: string;
    slug?: { current: string };
  };
};

export async function POST(request: NextRequest) {
  try {
    if (!WEBHOOK_SECRET) {
      console.error('Missing SANITY_WEBHOOK_SECRET environment variable');
      return NextResponse.json(
        { message: 'Webhook secret not configured' },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
      request,
      WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      console.warn('Invalid webhook signature received');
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 },
      );
    }

    if (!body) {
      return NextResponse.json(
        { message: 'No body received' },
        { status: 400 },
      );
    }

    const { _type, _id, slug } = body;
    console.log(`Revalidation triggered for ${_type}: ${_id}`);

    switch (_type) {
      case 'project':
        revalidatePath('/');

        if (slug?.current) {
          revalidatePath(`/projects/${slug.current}`);
          console.log(`Revalidated project path: /projects/${slug.current}`);
        }

        revalidatePath('/');
        console.log('Revalidated homepage (projects changed)');
        break;

      case 'about':
        revalidatePath('/');
        console.log('Revalidated homepage (about changed)');
        break;

      case 'experience':
        revalidatePath('/');
        console.log('Revalidated homepage (experience changed)');
        break;

      case 'tech':
        revalidatePath('/');
        revalidatePath('/projects');
        console.log('Revalidated all project pages (tech changed)');
        break;

      case 'iknow':
        revalidatePath('/');
        console.log('Revalidated homepage (skills changed)');
        break;

      default:
        console.log(`Unknown type ${_type}, revalidating homepage as fallback`);
        revalidatePath('/');
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      id: _id,
      slug: slug?.current,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Sanity revalidation webhook endpoint',
  });
}
