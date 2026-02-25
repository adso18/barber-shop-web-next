'use client';

import { Bot, SquareTerminal, Users2, LayoutDashboard, Store, Settings2 } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { routes } from '@/const/routes';
import { GLOBAL_ROLES } from '@/const/roles';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const navSuperAdmin = [
	{
		title: 'Dashboard SA',
		url: routes.superAdmin.index.path,
		icon: <LayoutDashboard className="size-4" />,
	},
	{
		title: 'Barberías',
		url: routes.superAdmin.barbershops.path,
		icon: <Store className="size-4" />,
	},
	{
		title: 'Usuarios',
		url: routes.superAdmin.users.path,
		icon: <Users2 className="size-4" />,
	},
	{
		title: 'Configuración',
		url: routes.superAdmin.config.path,
		icon: <Settings2 className="size-4" />,
	},
];

export function NavMain({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const { data: session } = useSession();
	const pathname = usePathname();

	const user = session?.user;

	if (!user) return null;

	const isSuperAdmin = user.globalRole === GLOBAL_ROLES.SUPER_ADMIN;

	return (
		<>
			{isSuperAdmin && (
				<SidebarGroup {...props}>
					<SidebarGroupLabel>Super Admin</SidebarGroupLabel>
					<SidebarMenu>
						{navSuperAdmin.map((item) => {
							const isActive = pathname === item.url || pathname.startsWith(item.url + '/');
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
										<Link href={item.url}>
											{item.icon}
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			)}
		</>
	);
}
