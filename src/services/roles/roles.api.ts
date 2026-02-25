import { http } from '@/lib/http';
import type { Role } from './roles.types';

export const getRoles = (): Promise<Role[]> =>
	http.get<Role[]>('/roles').then((r) => r.data);
