import { useQuery } from '@tanstack/react-query';
import { barbershopsKeys } from '@/services/barbershops/barbershops.keys';
import { getBarbershops } from '@/services/barbershops/barbershops.api';
import type { BarbershopPaginateParams } from '@/services/barbershops/barbershop.types';

export function useBarbershopsQuery(params?: BarbershopPaginateParams) {
	return useQuery({
		queryKey: barbershopsKeys.list(params),
		queryFn: () => getBarbershops(params),
	});
}
