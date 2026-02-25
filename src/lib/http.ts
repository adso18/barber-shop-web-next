import axios from 'axios';
import { getSession } from 'next-auth/react';

export const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(async (config) => {
	const session = await getSession();
	if (session?.accessToken) {
		config.headers.Authorization = `Bearer ${session.accessToken as string}`;
	}
	return config;
});

http.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error)) {
			const message = (error.response?.data as { message?: string })?.message ?? error.message;
			return Promise.reject(new Error(message));
		}
		return Promise.reject(error);
	},
);
