import { useState } from 'react';
import { useUpdateAppConfig } from './use-app-config-mutation';
import type { AppConfigDto } from '@/services/app-config/app-config.types';

type RowState = {
	value: string;
	saved: boolean;
};

export function useAppConfigRows(configs: AppConfigDto[]) {
	const [rows, setRows] = useState<Record<string, RowState>>(() => {
		const initial: Record<string, RowState> = {};
		for (const config of configs) {
			initial[config.key] = { value: config.value, saved: false };
		}
		return initial;
	});

	const { mutate, isPending } = useUpdateAppConfig();

	const updateRowValue = (key: string, value: string) => {
		setRows((prev) => ({
			...prev,
			[key]: { ...prev[key], value, saved: false },
		}));
	};

	const saveRow = (config: AppConfigDto) => {
		const current = rows[config.key];
		if (!current) return;

		mutate(
			{ key: config.key, data: { value: current.value } },
			{
				onSuccess: () => {
					setRows((prev) => ({
						...prev,
						[config.key]: { ...prev[config.key], saved: true },
					}));
					setTimeout(() => {
						setRows((prev) => ({
							...prev,
							[config.key]: { ...prev[config.key], saved: false },
						}));
					}, 2000);
				},
			},
		);
	};

	const getRowState = (key: string, originalValue: string) => {
		const row = rows[key] ?? { value: originalValue, saved: false };
		const isDirty = row.value !== originalValue;
		return { ...row, isDirty };
	};

	return { rows, updateRowValue, saveRow, isPending, getRowState };
}
