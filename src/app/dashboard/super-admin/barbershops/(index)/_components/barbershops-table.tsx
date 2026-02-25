'use client';

import Link from 'next/link';
import { routes } from '@/const/routes';
import type { ApprovalStatus, BarbershopDto } from '@/services/barbershops/barbershop.types';

interface BarbershopsTableProps {
	barbershops: BarbershopDto[];
}

const STATUS_LABEL: Record<ApprovalStatus, string> = {
	PENDING: 'Pendiente',
	APPROVED: 'Aprobada',
	REJECTED: 'Rechazada',
	SUSPENDED: 'Suspendida',
};

const STATUS_CLASSES: Record<ApprovalStatus, string> = {
	PENDING: 'border border-barber-warning text-barber-warning',
	APPROVED: 'bg-barber-success text-white',
	REJECTED: 'bg-destructive text-white',
	SUSPENDED: 'bg-barber-warning text-white',
};

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export function BarbershopsTable({ barbershops }: BarbershopsTableProps) {
	return (
		<div className="rounded-lg border border-border overflow-hidden">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-barber-surface">
						<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
							Barbería
						</th>
						<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Ciudad
						</th>
						<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
							Registro
						</th>
						<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
							Estado
						</th>
						<th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody className="bg-card">
					{barbershops.length === 0 ? (
						<tr>
							<td colSpan={5} className="text-center text-muted-foreground py-12">
								No hay barberías que coincidan con los filtros
							</td>
						</tr>
					) : (
						barbershops.map((b) => (
							<tr
								key={b.id}
								className="border-b border-border last:border-0 hover:bg-muted transition-colors"
							>
								<td className="px-5 py-3.5">
									<p className="font-medium text-foreground">{b.name}</p>
									<p className="text-xs text-muted-foreground">{b.address}</p>
								</td>
								<td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
									{b.address}
								</td>
								<td className="px-5 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">
									{formatDate(b.createdAt)}
								</td>
								<td className="px-5 py-3.5">
									<span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[b.approvalStatus]}`}>
										{STATUS_LABEL[b.approvalStatus]}
									</span>
								</td>
								<td className="px-5 py-3.5 text-right">
									<Link
										href={`${routes.superAdmin.barbershops.path}/${b.id}`}
										className="inline-flex items-center rounded border border-border px-3 py-1.5 text-xs text-barber-gold hover:border-barber-gold hover:bg-barber-gold/5 transition-colors"
									>
										Ver detalle
									</Link>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
