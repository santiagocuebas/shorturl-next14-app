import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	const token = req.cookies.get('authenticate');
	const pathname = req.nextUrl.pathname;

	if (!token && pathname !== '/auth') {
		return NextResponse.redirect(new URL('/auth', req.url), 307);
	} else if (pathname === '/auth' && token) {
		return NextResponse.redirect(new URL('/dashboard', req.url), 307);
	}
};

export const config = {
  matcher: ['/auth', '/dashboard', '/settings']
}
