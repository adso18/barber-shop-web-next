import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appConfigKeys } from '@/services/app-config/app-config.keys';
import { updateAppConfig } from '@/services/app-config/app-config.api';
import type { AppConfigUpdateInput } from '@/services/app-config/app-config.types';

export function useUpdateAppConfig() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ key, data }: { key: string; data: AppConfigUpdateInput }) =>
			updateAppConfig(key, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: appConfigKeys.all });
		},
	});
}
