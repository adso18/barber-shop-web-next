export const rolesKeys = {
	all: ['roles'] as const,
	list: () => [...rolesKeys.all, 'list'] as const,
};
