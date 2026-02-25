import { Metadata } from 'next';
import { SuperAdminClient } from './_components/super-admin-client';

export const metadata: Metadata = {
	title: 'Super Admin | Barber Shop Admin',
};

export default async function SuperAdminPage() {
	return <SuperAdminClient />;
}
