'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBarbershopsFilters } from '../../_hooks/use-barbershops-filters';

interface BarbershopsPaginationProps {
	currentPage: number;
	totalPages: number;
	total: number;
}

export function BarbershopsPagination({ currentPage, totalPages, total }: BarbershopsPaginationProps) {
	const { handlePageChange } = useBarbershopsFilters();

	const startItem = Math.min(10 * (currentPage - 1) + 1, total);
	const endItem = Math.min(10 * currentPage, total);

	return (
		<div className="flex items-center justify-between px-2 py-4">
			<div className="text-sm text-muted-foreground">
				Mostrando {startItem} - {endItem} de {total} barberías
			</div>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
					<ChevronLeft className="h-4 w-4" />
					Anterior
				</Button>
				<div className="text-sm">
					Página {currentPage} de {totalPages}
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage >= totalPages}
				>
					Siguiente
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
