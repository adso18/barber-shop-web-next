import { Suspense } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardBreadcrumb } from './(index)/_components/dashboard-breadcrumb';

function DashboardShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="dark">
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 border-b border-border">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
							<Suspense fallback={null}>
								<DashboardBreadcrumb />
							</Suspense>
						</div>
					</header>
					<main className="p-4">{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={null}>
			<DashboardShell>{children}</DashboardShell>
		</Suspense>
	);
}
