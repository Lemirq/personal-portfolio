import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/email-template';

const idToRequestCount = new Map<string, number>(); // keeps track of individual users
const rateLimiter = {
	windowStart: Date.now(),
	windowSize: 10000, // 10 seconds
	maxRequests: 2,
};

const limit = (ip: string) => {
	// Check and update current window
	const now = Date.now();
	const isNewWindow = now - rateLimiter.windowStart > rateLimiter.windowSize;
	if (isNewWindow) {
		rateLimiter.windowStart = now;
		idToRequestCount.set(ip, 0);
	}

	// Check and update current request limits
	const currentRequestCount = idToRequestCount.get(ip) ?? 0;
	if (currentRequestCount >= rateLimiter.maxRequests) return true;
	idToRequestCount.set(ip, currentRequestCount + 1);

	return false;
};

import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
export async function POST(request: Request) {
	const headersList = await headers();
	const ip = request.ip ?? headersList.get('X-Forwarded-For') ?? 'unknown';
	console.log(ip);
	const isRateLimited = limit(ip);
	if (isRateLimited) {
		return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 500 });
	}

	const body = await request.json();

	const { name, email, message, date } = body;

	const resend = new Resend(process.env.RESEND);

	const { data, error } = await resend.emails.send({
		from: name + ' <onboarding@resend.dev>',
		to: ['sharmavihaan190@gmail.com'],
		subject: 'Email from vhaan.me',
		text: `${name} (${email}) sent you a message on ${date}:\n\n${message}`,
		react: EmailTemplate({ name, email, message, date }),
	});

	if (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}

	return NextResponse.json({ data });
}
