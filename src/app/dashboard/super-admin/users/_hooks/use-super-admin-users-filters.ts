import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { UserPaginateParams } from '@/services/users/user.types';

export type UserStatusFilter = 'ALL' | 'ACTIVE' | 'SUSPENDED' | 'DELETED';

function isUserStatusFilter(value: string): value is UserStatusFilter {
	return ['ALL', 'ACTIVE', 'SUSPENDED', 'DELETED'].includes(value);
}

export function useSuperAdminUsersFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
	const currentSearch = searchParams.get('search') ?? undefined;
	const statusParam = searchParams.get('status') ?? 'ALL';
	const currentStatus: UserStatusFilter = isUserStatusFilter(statusParam) ? statusParam : 'ALL';

	const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');

	const buildParams = (overrides: Record<string, string | null>): string => {
		const params = new URLSearchParams(searchParams.toString());
		Object.entries(overrides).forEach(([key, value]) => {
			if (value === null) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		});
		params.set('page', '1');
		return params.toString();
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const query = searchInput.trim()
			? buildParams({ search: searchInput.trim() })
			: buildParams({ search: null });
		router.push(`?${query}`);
	};

	const handleClearSearch = () => {
		setSearchInput('');
		router.push('?page=1');
	};

	const handleStatusChange = (value: UserStatusFilter) => {
		const query =
			value === 'ALL'
				? buildParams({ status: null })
				: buildParams({ status: value });
		router.push(`?${query}`);
	};

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`?${params.toString()}`);
	};

	const queryParams: UserPaginateParams = {
		page: currentPage,
		limit: 10,
		search: currentSearch,
	};

	if (currentStatus === 'ACTIVE') queryParams.active = true;
	if (currentStatus === 'SUSPENDED') queryParams.active = false;
	if (currentStatus === 'DELETED') queryParams.includeDeleted = true;

	return {
		currentPage,
		currentSearch,
		currentStatus,
		searchInput,
		setSearchInput,
		queryParams,
		handleSearch,
		handleClearSearch,
		handleStatusChange,
		handlePageChange,
		hasActiveSearch: Boolean(searchParams.get('search')),
	};
}
