import client from '@/utils/sanityClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const res = await client.fetch(`
    *[_type == "resume"]{
    name,  
    "file": file.asset->url,
    }
    `);

	return NextResponse.redirect(res[0].file);
}
