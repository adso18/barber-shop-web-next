'use client';

import { Search, X } from 'lucide-react';
import type { ApprovalStatus } from '@/services/barbershops/barbershop.types';
import { useBarbershopsFilters } from '../../_hooks/use-barbershops-filters';

type FilterOption = {
	label: string;
	value: ApprovalStatus | 'ALL';
};

const FILTER_OPTIONS: FilterOption[] = [
	{ label: 'Todas', value: 'ALL' },
	{ label: 'Pendientes', value: 'PENDING' },
	{ label: 'Aprobadas', value: 'APPROVED' },
	{ label: 'Rechazadas', value: 'REJECTED' },
	{ label: 'Suspendidas', value: 'SUSPENDED' },
];

export function BarbershopsFilters() {
	const { search, setSearch, activeStatusParam, hasActiveSearch, handleSearch, handleClear, handleStatusChange } =
		useBarbershopsFilters();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-0 border-b border-border">
				{FILTER_OPTIONS.map((option) => {
					const isActive =
						option.value === 'ALL' ? activeStatusParam === 'ALL' || !activeStatusParam : activeStatusParam === option.value;

					return (
						<button
							key={option.value}
							onClick={() => handleStatusChange(option.value)}
							className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
								isActive ? 'border-barber-gold text-white' : 'border-transparent text-muted-foreground hover:text-foreground'
							}`}
						>
							{option.label}
						</button>
					);
				})}
			</div>

			<form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Buscar por nombre o dirección..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full rounded-md border border-border bg-muted pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-barber-gold transition-colors"
					/>
				</div>
				<button
					type="submit"
					className="rounded-md bg-barber-gold px-4 py-2 text-sm font-medium text-barber-gold-foreground hover:bg-barber-gold-hover transition-colors"
				>
					Buscar
				</button>
				{hasActiveSearch && (
					<button
						type="button"
						onClick={handleClear}
						className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						<X className="h-3.5 w-3.5" />
						Limpiar
					</button>
				)}
			</form>
		</div>
	);
}
