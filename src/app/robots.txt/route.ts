import { NextResponse } from 'next/server';

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'https://avangard-70.ru';

    const content = `User-agent: *
Allow: /

Disallow: /api/
Disallow: /_next/
Disallow: /admin
Disallow: /admin/
Disallow: /admin-login

Sitemap: ${domain}/sitemap.xml`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}