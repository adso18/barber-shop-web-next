import type { GetBarbershopsParams, GetCitiesParams } from './booking.types';

export const bookingKeys = {
	all: ['booking'] as const,
	cities: (params?: GetCitiesParams) => [...bookingKeys.all, 'cities', params] as const,
	barbershops: (params?: GetBarbershopsParams) => [...bookingKeys.all, 'barbershops', params] as const,
	barbershop: (id: string) => [...bookingKeys.all, 'barbershop', id] as const,
	services: (barbershopId: string) => [...bookingKeys.all, 'services', barbershopId] as const,
	barbers: (barbershopId: string) => [...bookingKeys.all, 'barbers', barbershopId] as const,
};
