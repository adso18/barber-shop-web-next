import 'server-only';

import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { AuthService } from './auth-service';

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(1),
});

export const authConfig: NextAuthConfig = {
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const { email, password } = loginSchema.parse(credentials);

					const response = await AuthService.login({ email, password });

					if (response.status < 200 || response.status >= 300) {
						throw new Error('Credenciales inválidas');
					}

					const body = response.body;

					if (!body.user || !body.tokens) {
						return null;
					}

					return {
						id: body.user.id,
						name: body.user.name || body.user.email,
						email: body.user.email,
						globalRole: body.user.globalRole,
						accessToken: body.tokens.accessToken,
					};
				} catch (error) {
					console.error('Error en authorize:', error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const decode = AuthService.decode(user.accessToken as string);

				return {
					...token,
					globalRole: user.globalRole,
					accessToken: user.accessToken,
					accessTokenExpires: decode?.exp ? decode.exp * 1000 : Date.now() + 1000 * 60 * 60 * 24,
				};
			}

			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.globalRole = token.globalRole as string;
				session.accessToken = token.accessToken as string;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30,
	},
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export const getServerSession = cache(async () => {
	const session = await auth();
	if (!session?.accessToken) redirect('/login');

	return session;
});
