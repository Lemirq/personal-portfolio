import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	return NextResponse.redirect('https://watchwave-v2.vercel.app');
}