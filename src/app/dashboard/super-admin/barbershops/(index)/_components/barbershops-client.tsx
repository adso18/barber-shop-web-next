'use client';

import { BarbershopsFilters } from './barbershops-filters';
import { BarbershopsTable } from './barbershops-table';
import { BarbershopsPagination } from './barbershops-pagination';
import { useBarbershopsQuery } from '../../_hooks/use-barbershops-query';
import { useBarbershopsFilters } from '../../_hooks/use-barbershops-filters';

export function BarbershopsClient() {
	const { currentPage, currentSearch, currentStatus } = useBarbershopsFilters();

	const { data, isLoading, isError } = useBarbershopsQuery({
		page: currentPage,
		limit: 10,
		search: currentSearch,
		approvalStatus: currentStatus,
	});

	const barbershops = data?.data ?? [];
	const total = data?.total ?? 0;
	const totalPages = data?.totalPages ?? 0;

	return (
		<div className="flex flex-col gap-4">
			<div>
				<p className="text-xs font-semibold tracking-widest text-barber-gold uppercase mb-1">Super Admin</p>
				<h1 className="text-2xl font-bold text-foreground">Gestión de Barberías</h1>
				<p className="text-sm text-muted-foreground mt-0.5">
					{isLoading ? 'Cargando...' : `${total} ${total === 1 ? 'barbería registrada' : 'barberías registradas'}`}
				</p>
			</div>

			<BarbershopsFilters />

			{isLoading && <div className="text-center text-muted-foreground py-8">Cargando barberías...</div>}
			{isError && <div className="text-center text-red-500 py-8">Error al cargar barberías</div>}
			{!isLoading && !isError && <BarbershopsTable barbershops={barbershops} />}

			{totalPages > 1 && <BarbershopsPagination currentPage={currentPage} totalPages={totalPages} total={total} />}
		</div>
	);
}
