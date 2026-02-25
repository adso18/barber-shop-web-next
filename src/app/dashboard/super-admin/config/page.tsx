import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AppConfigClient } from './_components/app-config-client';

export const metadata: Metadata = {
	title: 'Configuración Global | Barber Shop Admin',
};

export default async function AppConfigPage() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<p className="text-xs font-semibold tracking-widest text-barber-gold uppercase mb-1">Super Admin</p>
				<h1 className="text-2xl font-bold text-foreground">Configuración Global</h1>
				<p className="text-sm text-muted-foreground mt-0.5">
					Ajusta los parámetros globales de la plataforma. Los cambios se aplican de inmediato.
				</p>
			</div>

			<div className="rounded-lg border border-border bg-card">
				<div className="px-5 py-4 border-b border-border">
					<p className="font-semibold text-foreground">Parámetros de la Aplicación</p>
					<p className="text-xs text-muted-foreground mt-0.5">Edita los valores directamente en la tabla y guarda los cambios</p>
				</div>
				<div className="p-5">
					<AppConfigClient />
				</div>
			</div>

			<div className="rounded-lg border border-barber-gold/40 bg-barber-gold/5 p-4 flex items-start gap-3">
				<AlertTriangle className="h-4 w-4 text-barber-gold mt-0.5 shrink-0" />
				<div>
					<p className="text-sm font-medium text-barber-gold">Advertencia</p>
					<p className="text-xs text-muted-foreground mt-0.5">
						Los cambios en esta configuración afectan el comportamiento global de la plataforma. Modifica los valores con
						precaución.
					</p>
				</div>
			</div>
		</div>
	);
}
