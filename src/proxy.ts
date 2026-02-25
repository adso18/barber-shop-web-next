import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
	const { nextUrl } = req;
	const globalRole = req.auth?.user?.globalRole;
	const isLoggedIn = !!globalRole;

	const isAuthRoute = nextUrl.pathname.startsWith('/login');
	// const isPublicRoute = nextUrl.pathname === '/';
	const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');

	// Si está en ruta de auth y ya está logueado, redirigir según rol
	if (isAuthRoute && isLoggedIn) {
		const destination = globalRole === 'SUPER_ADMIN' ? '/dashboard/super-admin' : '/dashboard';

		return NextResponse.redirect(new URL(destination, nextUrl));
	}

	// Si está en ruta protegida y no está logueado, redirigir al login
	if (isDashboardRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL('/login', nextUrl));
	}

	return NextResponse.next();
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
