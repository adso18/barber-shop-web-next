'use client';

import Link from 'next/link';
import { Store, ArrowRight, Settings2, Clock } from 'lucide-react';
import { routes } from '@/const/routes';
import type { ApprovalStatus, BarbershopDto } from '@/services/barbershops/barbershop.types';
import { useDashboardQuery } from '../_hooks/use-dashboard-query';

const STATUS_COLORS: Record<ApprovalStatus, string> = {
	PENDING: 'border border-barber-warning text-barber-warning',
	APPROVED: 'bg-barber-success text-white',
	REJECTED: 'bg-destructive text-white',
	SUSPENDED: 'bg-barber-warning text-white',
};

const STATUS_LABELS: Record<ApprovalStatus, string> = {
	PENDING: 'Pendiente',
	APPROVED: 'Aprobada',
	REJECTED: 'Rechazada',
	SUSPENDED: 'Suspendida',
};

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

function StatusBadge({ status }: { status: ApprovalStatus }) {
	return (
		<span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[status]}`}>
			{STATUS_LABELS[status]}
		</span>
	);
}

function RecentBarbershopsTable({ barbershops }: { barbershops: BarbershopDto[] }) {
	if (barbershops.length === 0) {
		return (
			<p className="text-center text-muted-foreground py-10 text-sm">No hay barberías registradas aún</p>
		);
	}

	return (
		<table className="w-full text-sm">
			<thead>
				<tr className="border-b border-border">
					<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Barbería</th>
					<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
						Registro
					</th>
					<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</th>
					<th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ver</th>
				</tr>
			</thead>
			<tbody>
				{barbershops.map((b) => (
					<tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors">
						<td className="px-5 py-3">
							<p className="font-medium text-foreground">{b.name}</p>
							<p className="text-xs text-muted-foreground">{b.address}</p>
						</td>
						<td className="px-5 py-3 text-muted-foreground text-xs hidden md:table-cell">{formatDate(b.createdAt)}</td>
						<td className="px-5 py-3">
							<StatusBadge status={b.approvalStatus} />
						</td>
						<td className="px-5 py-3 text-right">
							<Link
								href={`${routes.superAdmin.barbershops.path}/${b.id}`}
								className="text-xs text-barber-gold hover:text-barber-gold-hover transition-colors"
							>
								Ver →
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export function SuperAdminClient() {
	const { recentBarbershops, totalAll, totalApproved, totalPending, totalSuspended, isLoading } =
		useDashboardQuery();

	const today = new Date().toLocaleDateString('es-ES', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div>
				<p className="text-xs font-semibold tracking-widest text-barber-gold uppercase mb-1">Super Admin — Plataforma Global</p>
				<h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
				<p className="text-sm text-muted-foreground mt-0.5 capitalize">{today}</p>
			</div>

			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{/* Barberías totales */}
				<div className="rounded-lg border border-border bg-card p-5">
					<div className="flex items-center justify-between mb-3">
						<p className="text-xs text-muted-foreground uppercase tracking-wider">Barberías Totales</p>
						<Store className="h-4 w-4 text-muted-foreground" />
					</div>
					{isLoading ? (
						<p className="text-3xl font-bold text-foreground mb-2">—</p>
					) : (
						<>
							<p className="text-3xl font-bold text-foreground mb-2">{totalAll}</p>
							<div className="flex flex-wrap gap-1.5">
								<span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs bg-barber-success text-white">
									{totalApproved} aprobadas
								</span>
								{totalPending > 0 && (
									<span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs border border-barber-warning text-barber-warning">
										{totalPending} pendientes
									</span>
								)}
								{totalSuspended > 0 && (
									<span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs bg-barber-warning text-white">
										{totalSuspended} suspendidas
									</span>
								)}
							</div>
						</>
					)}
				</div>

				{/* Usuarios */}
				<div className="rounded-lg border border-border bg-card p-5">
					<div className="flex items-center justify-between mb-3">
						<p className="text-xs text-muted-foreground uppercase tracking-wider">Usuarios Registrados</p>
					</div>
					<p className="text-3xl font-bold text-foreground mb-2">—</p>
					<p className="text-xs text-muted-foreground">Disponible próximamente</p>
				</div>

				{/* Citas */}
				<div className="rounded-lg border border-border bg-card p-5">
					<div className="flex items-center justify-between mb-3">
						<p className="text-xs text-muted-foreground uppercase tracking-wider">Citas del Mes</p>
					</div>
					<p className="text-3xl font-bold text-foreground mb-2">—</p>
					<p className="text-xs text-muted-foreground">Disponible próximamente</p>
				</div>

				{/* Ingresos — card gold */}
				<div className="rounded-lg border border-barber-gold bg-card p-5 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-24 h-24 bg-barber-gold/5 rounded-full -translate-y-8 translate-x-8" />
					<div className="flex items-center justify-between mb-3">
						<p className="text-xs text-barber-gold uppercase tracking-wider font-semibold">Ingresos del Mes</p>
					</div>
					<p className="text-3xl font-bold text-barber-gold mb-2">—</p>
					<p className="text-xs text-muted-foreground">Disponible próximamente</p>
				</div>
			</div>

			{/* Grid 2 columnas */}
			<div className="grid gap-4 lg:grid-cols-3">
				{/* Tabla últimas barberías */}
				<div className="lg:col-span-2 rounded-lg border border-border bg-card">
					<div className="flex items-center justify-between px-5 py-4 border-b border-border">
						<div>
							<p className="font-semibold text-foreground">Últimas Barberías</p>
							<p className="text-xs text-muted-foreground mt-0.5">Las 5 más recientes registradas</p>
						</div>
						<Link
							href={routes.superAdmin.barbershops.path}
							className="flex items-center gap-1 text-xs text-barber-gold hover:text-barber-gold-hover transition-colors"
						>
							Ver todas <ArrowRight className="h-3 w-3" />
						</Link>
					</div>
					{isLoading ? (
						<p className="text-center text-muted-foreground py-10 text-sm">Cargando...</p>
					) : (
						<RecentBarbershopsTable barbershops={recentBarbershops} />
					)}
				</div>

				{/* Accesos rápidos */}
				<div className="flex flex-col gap-3">
					<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Accesos Rápidos</p>

					<Link
						href={`${routes.superAdmin.barbershops.path}?approvalStatus=PENDING`}
						className="group rounded-lg border border-border bg-card p-4 hover:border-barber-warning/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-barber-warning/10">
								<Clock className="h-4 w-4 text-barber-warning" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Barberías Pendientes</p>
								<p className="text-xs text-muted-foreground">
									{totalPending > 0 ? `${totalPending} esperando revisión` : 'Sin pendientes'}
								</p>
							</div>
							<ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-barber-warning transition-colors" />
						</div>
					</Link>

					<Link
						href={routes.superAdmin.barbershops.path}
						className="group rounded-lg border border-border bg-card p-4 hover:border-barber-gold/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-barber-gold/10">
								<Store className="h-4 w-4 text-barber-gold" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Gestión de Barberías</p>
								<p className="text-xs text-muted-foreground">Aprobar, rechazar, suspender</p>
							</div>
							<ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-barber-gold transition-colors" />
						</div>
					</Link>

					<Link
						href={routes.superAdmin.config.path}
						className="group rounded-lg border border-border bg-card p-4 hover:border-barber-gold/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-barber-gold/10">
								<Settings2 className="h-4 w-4 text-barber-gold" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Configuración Global</p>
								<p className="text-xs text-muted-foreground">Parámetros de la plataforma</p>
							</div>
							<ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-barber-gold transition-colors" />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
