import type { Metadata } from 'next';
import { BarbershopsClient } from './_components/barbershops-client';

export const metadata: Metadata = {
	title: 'Barberías | Barber Shop Admin',
};

export default async function BarbershopsPage() {
	return <BarbershopsClient />;
}
