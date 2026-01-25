import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/components/email-template";

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

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPostHogClient } from "@/lib/posthog-server";
export async function POST(request: Request) {
  const headersList = await headers();
  const ip = request.headers.get("X-Forwarded-For") ?? "unknown";
  console.log(ip);
  const isRateLimited = limit(ip);
  if (isRateLimited) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 500 });
  }

  const body = await request.json();

  const { name, email, message, date } = body;

  const resend = new Resend(process.env.RESEND);

  const { data, error } = await resend.emails.send({
    from: name + " <vihaan@vhaan.me>",
    to: ["sharmavihaan190@gmail.com"],
    subject: "Email from vhaan.me",
    text: `${name} (${email}) sent you a message on ${date}:\n\n${message}`,
    react: <EmailTemplate name={name} email={email} message={message} date={date} />,
  });

  const posthog = getPostHogClient();
  const distinctId = request.headers.get('x-posthog-distinct-id') || 'anonymous-server';

  if (error) {
    console.error(error);
    posthog.capture({
      distinctId,
      event: 'contact_email_failed',
      properties: {
        error: error.message,
        source: 'api',
      },
    });
    return NextResponse.json({ error }, { status: 500 });
  }

  posthog.capture({
    distinctId,
    event: 'contact_email_sent',
    properties: {
      message_length: message.length,
      source: 'api',
    },
  });
  return NextResponse.json({ data });
}
