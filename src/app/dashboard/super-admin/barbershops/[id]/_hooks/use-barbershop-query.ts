import { useQuery } from '@tanstack/react-query';
import { barbershopsKeys } from '@/services/barbershops/barbershops.keys';
import { getBarbershopById } from '@/services/barbershops/barbershops.api';

export function useBarbershopQuery(id: string) {
	return useQuery({
		queryKey: barbershopsKeys.detail(id),
		queryFn: () => getBarbershopById(id),
		enabled: Boolean(id),
	});
}
