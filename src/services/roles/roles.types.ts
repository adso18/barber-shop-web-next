export type Role = {
	id: number;
	name: string;
};

export const ROLES = {
	SUPER_ADMIN: 'SUPER_ADMIN',
	USER: 'USER',
} as const;
