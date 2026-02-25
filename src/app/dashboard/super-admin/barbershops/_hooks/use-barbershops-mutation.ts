import { useMutation, useQueryClient } from '@tanstack/react-query';
import { barbershopsKeys } from '@/services/barbershops/barbershops.keys';
import {
	approveBarbershop,
	rejectBarbershop,
	suspendBarbershop,
	reactivateBarbershop,
} from '@/services/barbershops/barbershops.api';
import type { BarbershopRejectInput } from '@/services/barbershops/barbershop.types';

export function useApproveBarbershop() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => approveBarbershop(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: barbershopsKeys.all });
		},
	});
}

export function useRejectBarbershop() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: BarbershopRejectInput }) =>
			rejectBarbershop(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: barbershopsKeys.all });
		},
	});
}

export function useSuspendBarbershop() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => suspendBarbershop(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: barbershopsKeys.all });
		},
	});
}

export function useReactivateBarbershop() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => reactivateBarbershop(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: barbershopsKeys.all });
		},
	});
}
