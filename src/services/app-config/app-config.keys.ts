export const appConfigKeys = {
	all: ['app-config'] as const,
	list: () => [...appConfigKeys.all, 'list'] as const,
	detail: (key: string) => [...appConfigKeys.all, 'detail', key] as const,
};
