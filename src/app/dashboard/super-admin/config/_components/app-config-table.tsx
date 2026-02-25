'use client';

import { Save, Loader2, Check } from 'lucide-react';
import { useAppConfigRows } from '../_hooks/use-app-config-rows';
import type { AppConfigDto } from '@/services/app-config/app-config.types';

interface AppConfigTableProps {
	configs: AppConfigDto[];
}

export function AppConfigTable({ configs }: AppConfigTableProps) {
	const { updateRowValue, saveRow, isPending, getRowState } = useAppConfigRows(configs);

	return (
		<div className="rounded-lg border border-border overflow-hidden">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border bg-barber-surface">
						<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-56">
							Clave
						</th>
						<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Descripción
						</th>
						<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-72">
							Valor
						</th>
						<th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">
							Acción
						</th>
					</tr>
				</thead>
				<tbody className="bg-card">
					{configs.map((config) => {
						const { value, saved, isDirty } = getRowState(config.key, config.value);

						return (
							<tr
								key={config.id}
								className="border-b border-border last:border-0 hover:bg-muted transition-colors"
							>
								<td className="px-5 py-3.5">
									<span className="font-mono text-xs font-bold text-barber-gold">{config.key}</span>
								</td>
								<td className="px-5 py-3.5 hidden md:table-cell">
									<span className="text-sm text-muted-foreground">{config.description}</span>
								</td>
								<td className="px-5 py-3.5">
									<input
										type="text"
										value={value}
										onChange={(e) => updateRowValue(config.key, e.target.value)}
										disabled={isPending}
										className="w-full rounded-md border border-border bg-muted px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-barber-gold transition-colors disabled:opacity-50"
									/>
								</td>
								<td className="px-5 py-3.5 text-right">
									<button
										onClick={() => saveRow(config)}
										disabled={isPending || !isDirty}
										className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
											saved
												? 'border border-barber-success text-barber-success'
												: 'bg-barber-gold text-barber-gold-foreground hover:bg-barber-gold-hover'
										}`}
									>
										{isPending ? (
											<Loader2 className="h-3.5 w-3.5 animate-spin" />
										) : saved ? (
											<>
												<Check className="h-3.5 w-3.5" />
												Guardado
											</>
										) : (
											<>
												<Save className="h-3.5 w-3.5" />
												Guardar
											</>
										)}
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
