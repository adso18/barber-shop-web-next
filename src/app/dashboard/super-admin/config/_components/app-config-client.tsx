'use client';

import { AppConfigTable } from './app-config-table';
import { useAppConfigQuery } from '../_hooks/use-app-config-query';

export function AppConfigClient() {
	const { data, isLoading, isError } = useAppConfigQuery();

	const configs = data?.data ?? [];

	if (isLoading) {
		return (
			<div className="text-center text-muted-foreground py-10 text-sm">Cargando configuración...</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center text-red-500 py-10 text-sm">Error al cargar configuración</div>
		);
	}

	if (configs.length === 0) {
		return (
			<p className="text-center text-muted-foreground py-10 text-sm">
				No hay configuraciones disponibles
			</p>
		);
	}

	return <AppConfigTable configs={configs} />;
}
