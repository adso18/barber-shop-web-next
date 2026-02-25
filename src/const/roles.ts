export const GLOBAL_ROLES = {
	SUPER_ADMIN: 'SUPER_ADMIN',
	ADMIN: 'ADMIN',
	USER: 'USER',
} as const;

export type GlobalRole = (typeof GLOBAL_ROLES)[keyof typeof GLOBAL_ROLES];

export const ROLE_OPTIONS: { value: GlobalRole; label: string }[] = [
	{ value: GLOBAL_ROLES.SUPER_ADMIN, label: 'Super Administrador' },
	{ value: GLOBAL_ROLES.ADMIN, label: 'Administrador' },
	{ value: GLOBAL_ROLES.USER, label: 'Usuario' },
];

export function getRoleName(globalRole: string): string {
	const found = ROLE_OPTIONS.find((r) => r.value === globalRole);
	return found?.label ?? globalRole;
}
