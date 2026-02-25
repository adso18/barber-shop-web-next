'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, User, FileText, Globe, Instagram, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BarbershopActions } from './barbershop-actions';
import { routes } from '@/const/routes';
import type { ApprovalStatus } from '@/services/barbershops/barbershop.types';
import { useBarbershopQuery } from '../_hooks/use-barbershop-query';

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

function formatDate(dateString: string | null): string {
	if (!dateString) return '—';
	return new Date(dateString).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
	return (
		<div className="flex items-start gap-3">
			<span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>
			<div>
				<p className="text-xs text-muted-foreground mb-0.5">{label}</p>
				<p className="text-sm text-foreground">{value}</p>
			</div>
		</div>
	);
}

interface BarbershopDetailClientProps {
	id: string;
}

export function BarbershopDetailClient({ id }: BarbershopDetailClientProps) {
	const { data: barbershop, isLoading, isError } = useBarbershopQuery(id);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				Cargando barbería...
			</div>
		);
	}

	if (isError || !barbershop) {
		return (
			<div className="flex items-center justify-center p-8 text-destructive">
				Error al cargar la barbería
			</div>
		);
	}

	const social = barbershop.config?.social;
	const location = barbershop.config?.location;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start gap-4">
				<Link
					href={routes.superAdmin.barbershops.path}
					className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-barber-gold hover:text-barber-gold transition-colors"
					aria-label="Volver a barberías"
				>
					<ArrowLeft className="h-4 w-4" />
				</Link>
				<div className="flex-1">
					<p className="text-xs font-semibold tracking-widest text-barber-gold uppercase mb-1">
						Super Admin — Barberías
					</p>
					<div className="flex items-center gap-3 flex-wrap">
						<h1 className="text-2xl font-bold text-foreground">{barbershop.name}</h1>
						<span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[barbershop.approvalStatus]}`}>
							{STATUS_LABEL[barbershop.approvalStatus]}
						</span>
					</div>
					<p className="text-sm text-muted-foreground mt-0.5">/{barbershop.slug}</p>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Columna izquierda */}
				<div className="lg:col-span-2 flex flex-col gap-4">
					{/* Información general */}
					<div className="rounded-lg border border-border bg-card">
						<div className="px-5 py-4 border-b border-border">
							<p className="font-semibold text-foreground">Información General</p>
						</div>
						<div className="p-5 space-y-4">
							<InfoRow
								icon={<MapPin className="h-4 w-4" />}
								label="Dirección"
								value={barbershop.address}
							/>
							{barbershop.description && (
								<InfoRow
									icon={<FileText className="h-4 w-4" />}
									label="Descripción"
									value={barbershop.description}
								/>
							)}
							<InfoRow
								icon={<Calendar className="h-4 w-4" />}
								label="Fecha de registro"
								value={formatDate(barbershop.createdAt)}
							/>
							<InfoRow
								icon={<User className="h-4 w-4" />}
								label="Creada por"
								value={
									<span className="font-mono text-xs">{barbershop.createdBy}</span>
								}
							/>
							<div>
								<p className="text-xs text-muted-foreground mb-1.5">Estado de activación</p>
								<span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${barbershop.isActive ? 'bg-barber-success text-white' : 'border border-border text-muted-foreground'}`}>
									{barbershop.isActive ? 'Activa' : 'Inactiva'}
								</span>
							</div>
						</div>
					</div>

					{/* Historial de aprobación */}
					<div className="rounded-lg border border-border bg-card">
						<div className="px-5 py-4 border-b border-border">
							<p className="font-semibold text-foreground">Historial de Aprobación</p>
							<p className="text-xs text-muted-foreground mt-0.5">Registro de la revisión</p>
						</div>
						<div className="p-5 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs text-muted-foreground mb-1.5">Estado actual</p>
									<span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[barbershop.approvalStatus]}`}>
										{STATUS_LABEL[barbershop.approvalStatus]}
									</span>
								</div>
								<div>
									<p className="text-xs text-muted-foreground mb-1.5">Fecha de revisión</p>
									<p className="text-sm text-foreground">{formatDate(barbershop.approvalAt)}</p>
								</div>
							</div>

							{barbershop.approvalBy && (
								<div>
									<p className="text-xs text-muted-foreground mb-1">Revisado por</p>
									<p className="text-sm text-foreground font-mono text-xs">{barbershop.approvalBy}</p>
								</div>
							)}

							{barbershop.approvalNotes && (
								<>
									<Separator className="bg-border" />
									<div>
										<p className="text-xs text-muted-foreground mb-2">Notas de revisión</p>
										<div className="rounded-md bg-muted border border-border p-3">
											<p className="text-sm text-foreground">{barbershop.approvalNotes}</p>
										</div>
									</div>
								</>
							)}
						</div>
					</div>

					{/* Redes sociales */}
					{social && Object.values(social).some((v) => Boolean(v)) && (
						<div className="rounded-lg border border-border bg-card">
							<div className="px-5 py-4 border-b border-border">
								<p className="font-semibold text-foreground">Redes Sociales y Contacto</p>
							</div>
							<div className="p-5 space-y-3">
								{social.website && (
									<div className="flex items-center gap-3">
										<Globe className="h-4 w-4 text-muted-foreground shrink-0" />
										<a
											href={social.website}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-barber-gold hover:underline"
										>
											{social.website}
										</a>
									</div>
								)}
								{social.instagram && (
									<div className="flex items-center gap-3">
										<Instagram className="h-4 w-4 text-muted-foreground shrink-0" />
										<span className="text-sm text-foreground">{social.instagram}</span>
									</div>
								)}
								{social.facebook && (
									<div className="flex items-center gap-3">
										<Facebook className="h-4 w-4 text-muted-foreground shrink-0" />
										<span className="text-sm text-foreground">{social.facebook}</span>
									</div>
								)}
								{social.whatsapp && (
									<div className="flex items-center gap-3">
										<span className="h-4 w-4 text-muted-foreground text-xs font-bold shrink-0 flex items-center">WA</span>
										<span className="text-sm text-foreground">{social.whatsapp}</span>
									</div>
								)}
								{social.email && (
									<div className="flex items-center gap-3">
										<span className="h-4 w-4 text-muted-foreground text-xs font-bold shrink-0 flex items-center">@</span>
										<span className="text-sm text-foreground">{social.email}</span>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Ubicación */}
					{location?.googleMapsUrl && (
						<div className="rounded-lg border border-border bg-card">
							<div className="px-5 py-4 border-b border-border">
								<p className="font-semibold text-foreground">Ubicación</p>
							</div>
							<div className="p-5 space-y-2">
								{location.lat !== undefined && location.lng !== undefined && (
									<p className="text-sm text-muted-foreground">
										Coordenadas: {location.lat}, {location.lng}
									</p>
								)}
								<a
									href={location.googleMapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-barber-gold hover:underline"
								>
									Ver en Google Maps →
								</a>
							</div>
						</div>
					)}
				</div>

				{/* Columna derecha — acciones */}
				<div className="flex flex-col gap-4">
					<BarbershopActions barbershop={barbershop} />

					{/* Alerta suscripción placeholder */}
					<div className="rounded-lg border border-barber-gold/30 bg-barber-gold/5 p-4">
						<p className="text-xs font-semibold text-barber-gold uppercase tracking-wider mb-1">Suscripción</p>
						<p className="text-sm text-muted-foreground">Sin plan activo</p>
						<p className="text-xs text-muted-foreground mt-1">La gestión de planes estará disponible próximamente.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
