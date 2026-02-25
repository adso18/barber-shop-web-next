import 'server-only';

import jwt from 'jsonwebtoken';
import { ENV_PUBLIC } from '@/const/env-public';

export type LoginResponse = {
	user?: {
		id: string;
		name?: string | null;
		email: string;
		globalRole?: string;
	};
	tokens?: {
		accessToken: string;
	};
};

export type LoginCredential = {
	email: string;
	password: string;
};

export type DecodeResponse = {
	iat: number;
	iss: string;
	aud: string;
	sub: string;
	exp: number;
};

export class AuthService {
	static decode(str: string): DecodeResponse {
		return jwt.decode(str) as DecodeResponse;
	}

	static async login({ email, password }: LoginCredential) {
		const apiUrl = ENV_PUBLIC.API_URL;
		if (!apiUrl) throw new Error('API_URL is not defined');

		const url = `${apiUrl}/auth/login`;

		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const body = (await response.json()) as LoginResponse;

		return { status: response.status, body };
	}
}
