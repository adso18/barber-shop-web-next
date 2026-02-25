'use client';

import { UsersFilters } from './users-filters';
import { UsersTable } from './users-table';
import { UsersPagination } from './users-pagination';
import { useSuperAdminUsersQuery } from '../_hooks/use-super-admin-users-query';
import { useSuperAdminUsersFilters } from '../_hooks/use-super-admin-users-filters';

export function SuperAdminUsersClient() {
	const { currentPage, queryParams } = useSuperAdminUsersFilters();

	const { data, isLoading, isError } = useSuperAdminUsersQuery(queryParams);

	const users = data?.data ?? [];
	const total = data?.total ?? 0;
	const totalPages = data?.totalPages ?? 0;

	return (
		<div className="flex flex-col gap-4">
			{/* Header */}
			<div>
				<p className="text-xs font-semibold tracking-widest text-barber-gold uppercase mb-1">Super Admin</p>
				<h1 className="text-2xl font-bold text-foreground">Gestión de Usuarios</h1>
				<p className="text-sm text-muted-foreground mt-0.5">
					{isLoading ? 'Cargando...' : `${total} ${total === 1 ? 'usuario registrado' : 'usuarios registrados'}`}
				</p>
			</div>

			{/* Filters */}
			<UsersFilters />

			{/* Loading / Error / Table */}
			{isLoading && <div className="text-center text-muted-foreground py-8">Cargando usuarios...</div>}
			{isError && <div className="text-center text-red-500 py-8">Error al cargar usuarios</div>}
			{!isLoading && !isError && <UsersTable users={users} />}

			{totalPages > 1 && <UsersPagination currentPage={currentPage} totalPages={totalPages} total={total} />}
		</div>
	);
}
