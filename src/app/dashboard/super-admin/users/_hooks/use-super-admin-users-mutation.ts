import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersKeys } from '@/services/users/users.keys';
import { updateUser, deleteUser } from '@/services/users/users.api';
import type { UserUpdate } from '@/services/users/user.types';

export function useUpdateSuperAdminUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Omit<UserUpdate, 'id'> }) => updateUser(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: usersKeys.all });
			queryClient.invalidateQueries({ queryKey: usersKeys.detail(id) });
		},
	});
}

export function useToggleSuperAdminUserActive() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, active }: { id: string; active: boolean }) => updateUser(id, { active }),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: usersKeys.all });
			queryClient.invalidateQueries({ queryKey: usersKeys.detail(id) });
		},
	});
}

export function useDeleteSuperAdminUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: usersKeys.all });
		},
	});
}
