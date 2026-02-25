import { http } from '@/lib/http';
import type { User, UserCreate, UserUpdate, UserPaginateParams, UserPaginateResponse } from './user.types';

export const getUsers = (params?: UserPaginateParams): Promise<UserPaginateResponse> =>
	http.get<UserPaginateResponse>('/users', { params }).then((r) => r.data);

export const getUserById = (id: string): Promise<User> =>
	http.get<User>(`/users/${id}`).then((r) => r.data);

export const createUser = (data: UserCreate): Promise<User> =>
	http.post<User>('/users', data).then((r) => r.data);

export const updateUser = (id: string, data: Omit<UserUpdate, 'id'>): Promise<User> =>
	http.patch<User>(`/users/${id}`, data).then((r) => r.data);

export const deleteUser = (id: string): Promise<{ success: boolean }> =>
	http.delete<{ success: boolean }>(`/users/${id}`).then((r) => r.data);
