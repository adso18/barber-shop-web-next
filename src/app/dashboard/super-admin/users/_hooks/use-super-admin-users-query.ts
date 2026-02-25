import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '@/services/users/users.keys';
import { getUsers } from '@/services/users/users.api';
import type { UserPaginateParams } from '@/services/users/user.types';

export function useSuperAdminUsersQuery(params?: UserPaginateParams) {
	return useQuery({
		queryKey: usersKeys.list(params),
		queryFn: () => getUsers(params),
	});
}
