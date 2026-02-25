import type { BarbershopPaginateParams } from './barbershop.types';

export const barbershopsKeys = {
	all: ['barbershops'] as const,
	list: (params?: BarbershopPaginateParams) => [...barbershopsKeys.all, 'list', params] as const,
	detail: (id: string) => [...barbershopsKeys.all, 'detail', id] as const,
};
