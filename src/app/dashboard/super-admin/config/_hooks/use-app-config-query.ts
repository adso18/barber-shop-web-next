import { useQuery } from '@tanstack/react-query';
import { appConfigKeys } from '@/services/app-config/app-config.keys';
import { getAppConfig } from '@/services/app-config/app-config.api';

export function useAppConfigQuery() {
	return useQuery({
		queryKey: appConfigKeys.list(),
		queryFn: () => getAppConfig(),
	});
}
