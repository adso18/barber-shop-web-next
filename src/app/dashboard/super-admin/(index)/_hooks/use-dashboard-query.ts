import { useQueries } from '@tanstack/react-query';
import { barbershopsKeys } from '@/services/barbershops/barbershops.keys';
import { getBarbershops } from '@/services/barbershops/barbershops.api';

export function useDashboardQuery() {
	const results = useQueries({
		queries: [
			{
				queryKey: barbershopsKeys.list({ limit: 5 }),
				queryFn: () => getBarbershops({ limit: 5 }),
			},
			{
				queryKey: barbershopsKeys.list({ approvalStatus: 'APPROVED', limit: 1 }),
				queryFn: () => getBarbershops({ approvalStatus: 'APPROVED', limit: 1 }),
			},
			{
				queryKey: barbershopsKeys.list({ approvalStatus: 'PENDING', limit: 1 }),
				queryFn: () => getBarbershops({ approvalStatus: 'PENDING', limit: 1 }),
			},
			{
				queryKey: barbershopsKeys.list({ approvalStatus: 'SUSPENDED', limit: 1 }),
				queryFn: () => getBarbershops({ approvalStatus: 'SUSPENDED', limit: 1 }),
			},
		],
	});

	return {
		recentBarbershops: results[0].data?.data ?? [],
		totalAll: results[0].data?.total ?? 0,
		totalApproved: results[1].data?.total ?? 0,
		totalPending: results[2].data?.total ?? 0,
		totalSuspended: results[3].data?.total ?? 0,
		isLoading: results.some((r) => r.isLoading),
	};
}
