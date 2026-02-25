import { http } from '@/lib/http';
import type {
	BarbershopDto,
	BarbershopPaginateParams,
	BarbershopPaginateResponse,
	BarbershopRejectInput,
} from './barbershop.types';

export const getBarbershops = (
	params?: BarbershopPaginateParams,
): Promise<BarbershopPaginateResponse> =>
	http.get<BarbershopPaginateResponse>('/barbershops', { params }).then((r) => r.data);

export const approveBarbershop = (id: string): Promise<{ success: boolean }> =>
	http.post<{ success: boolean }>(`/barbershops/${id}/approve`).then((r) => r.data);

export const rejectBarbershop = (
	id: string,
	data: BarbershopRejectInput,
): Promise<{ success: boolean }> =>
	http.post<{ success: boolean }>(`/barbershops/${id}/reject`, data).then((r) => r.data);

export const suspendBarbershop = (id: string): Promise<{ success: boolean }> =>
	http.post<{ success: boolean }>(`/barbershops/${id}/suspend`).then((r) => r.data);

export const reactivateBarbershop = (id: string): Promise<{ success: boolean }> =>
	http.post<{ success: boolean }>(`/barbershops/${id}/reactivate`).then((r) => r.data);

export const getBarbershopById = (id: string): Promise<BarbershopDto> =>
	http.get<BarbershopDto>(`/barbershops/${id}`).then((r) => r.data);
