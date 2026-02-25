import type { Metadata } from 'next';
import { BarbershopDetailClient } from './_components/barbershop-detail-client';

interface PageProps {
	params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
	title: 'Detalle de Barbería | Barber Shop Admin',
};

export default async function BarbershopDetailPage({ params }: PageProps) {
	const { id } = await params;

	return <BarbershopDetailClient id={id} />;
}
