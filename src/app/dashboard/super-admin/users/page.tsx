import type { Metadata } from 'next';
import { SuperAdminUsersClient } from './_components/super-admin-users-client';

export const metadata: Metadata = {
	title: 'Usuarios | Barber Shop Admin',
};

export default async function UsersPage() {
	return <SuperAdminUsersClient />;
}
