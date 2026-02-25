import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { ApprovalStatus } from '@/services/barbershops/barbershop.types';

const VALID_STATUSES: ApprovalStatus[] = ['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'];

function isApprovalStatus(value: string): value is ApprovalStatus {
	return VALID_STATUSES.includes(value as ApprovalStatus);
}

export function useBarbershopsFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [search, setSearch] = useState(searchParams.get('search') ?? '');

	const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
	const currentSearch = searchParams.get('search') ?? undefined;
	const rawStatus = searchParams.get('approvalStatus') ?? '';
	const currentStatus: ApprovalStatus | undefined = isApprovalStatus(rawStatus) ? rawStatus : undefined;

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
		const query = search.trim()
			? buildParams({ search: search.trim() })
			: buildParams({ search: null });
		router.push(`?${query}`);
	};

	const handleClear = () => {
		setSearch('');
		router.push('?page=1');
	};

	const handleStatusChange = (value: ApprovalStatus | 'ALL') => {
		const query =
			value === 'ALL'
				? buildParams({ approvalStatus: null })
				: buildParams({ approvalStatus: value });
		router.push(`?${query}`);
	};

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`?${params.toString()}`);
	};

	return {
		search,
		setSearch,
		currentPage,
		currentSearch,
		currentStatus,
		handleSearch,
		handleClear,
		handleStatusChange,
		handlePageChange,
		hasActiveSearch: Boolean(searchParams.get('search')),
		activeStatusParam: searchParams.get('approvalStatus') ?? 'ALL',
	};
}
