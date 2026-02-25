import 'next-auth';

export type Session = {
	accessToken?: string;
	user: {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		globalRole?: string;
	};
};

declare module 'next-auth' {
	interface Session {
		accessToken?: string;
		user: Session['user'];
	}

	interface User {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		accessToken?: string;
		globalRole?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string;
		accessToken?: string;
		accessTokenExpires?: number;
		globalRole?: string;
	}
}
