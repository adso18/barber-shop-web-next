'use client';

import { usePathname } from 'next/navigation';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const SEGMENT_LABELS: Record<string, string> = {
	dashboard: 'Dashboard',
	'super-admin': 'Super Admin',
	barbershops: 'Barberías',
	config: 'Configuración',
	users: 'Usuarios',
	bots: 'Bots',
};

export function DashboardBreadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);

	const crumbs = segments.map((seg, i) => {
		const href = '/' + segments.slice(0, i + 1).join('/');
		const label = SEGMENT_LABELS[seg] ?? seg;
		return { href, label };
	});

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{crumbs.map((crumb, i) => (
					<span key={crumb.href} className="flex items-center gap-1.5">
						{i > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{i === crumbs.length - 1 ? (
								<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</span>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
