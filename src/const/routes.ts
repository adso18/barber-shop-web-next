export const routes = {
	dashboard: {
		index: {
			path: '/dashboard',
			roles: [],
		},
	},
	users: {
		index: {
			path: '/dashboard/users',
			roles: [],
		},
	},
	bots: {
		index: {
			path: '/dashboard/bots',
			roles: [],
		},
	},
	superAdmin: {
		index: {
			path: '/dashboard/super-admin',
			roles: ['SUPER_ADMIN'],
		},
		barbershops: {
			path: '/dashboard/super-admin/barbershops',
			roles: ['SUPER_ADMIN'],
		},
		users: {
			path: '/dashboard/super-admin/users',
			roles: ['SUPER_ADMIN'],
		},
		config: {
			path: '/dashboard/super-admin/config',
			roles: ['SUPER_ADMIN'],
		},
	},
};
