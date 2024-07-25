import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/email-template';

import { Resend } from 'resend';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
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
