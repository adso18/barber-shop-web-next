import type { UserPaginateParams } from './user.types';

export const usersKeys = {
	all: ['users'] as const,
	list: (params?: UserPaginateParams) => [...usersKeys.all, 'list', params] as const,
	detail: (id: string) => [...usersKeys.all, 'detail', id] as const,
};
