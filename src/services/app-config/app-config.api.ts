import { http } from '@/lib/http';
import type { AppConfigDto, AppConfigListResponse, AppConfigUpdateInput } from './app-config.types';

export const getAppConfig = (): Promise<AppConfigListResponse> =>
	http.get<AppConfigListResponse>('/app-config').then((r) => r.data);

export const updateAppConfig = (key: string, data: AppConfigUpdateInput): Promise<AppConfigDto> =>
	http.put<AppConfigDto>(`/app-config/${key}`, data).then((r) => r.data);
