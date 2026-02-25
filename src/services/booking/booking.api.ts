import { http } from '@/lib/http';
import type {
	CityListResponse,
	BarbershopListResponse,
	BarbershopDto,
	ServiceListResponse,
	BarbershopMemberDto,
	BarbershopMemberListResponse,
	AppointmentDto,
	AppointmentCreateInput,
	GetCitiesParams,
	GetBarbershopsParams,
} from './booking.types';

export const getCities = (params?: GetCitiesParams): Promise<CityListResponse> =>
	http.get<CityListResponse>('/locations/cities', { params }).then((r) => r.data);

export const getPublicBarbershops = (params?: GetBarbershopsParams): Promise<BarbershopListResponse> =>
	http
		.get<BarbershopListResponse>('/barbershops', {
			params: { isActive: true, approvalStatus: 'APPROVED', ...params },
		})
		.then((r) => r.data);

export const getPublicBarbershopById = (id: string): Promise<BarbershopDto> =>
	http.get<BarbershopDto>(`/barbershops/${id}`).then((r) => r.data);

export const getBarbershopServices = (barbershopId: string): Promise<ServiceListResponse> =>
	http.get<ServiceListResponse>(`/barbershops/${barbershopId}/services`).then((r) => r.data);

export const getBarbershopBarbers = async (barbershopId: string): Promise<BarbershopMemberDto[]> => {
	const response = await http
		.get<BarbershopMemberListResponse>(`/barbershops/${barbershopId}/members`)
		.then((r) => r.data);
	return response.data.filter((m) => m.role === 'BARBER' && m.status === 'ACTIVE');
};

export const createAppointment = (
	barbershopId: string,
	data: AppointmentCreateInput,
): Promise<AppointmentDto> =>
	http.post<AppointmentDto>(`/barbershops/${barbershopId}/appointments`, data).then((r) => r.data);
