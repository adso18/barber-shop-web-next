'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Ban, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	useApproveBarbershop,
	useRejectBarbershop,
	useSuspendBarbershop,
	useReactivateBarbershop,
} from '../../_hooks/use-barbershops-mutation';
import type { BarbershopDto } from '@/services/barbershops/barbershop.types';

interface BarbershopActionsProps {
	barbershop: BarbershopDto;
}

export function BarbershopActions({ barbershop }: BarbershopActionsProps) {
	const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
	const [approvalNotes, setApprovalNotes] = useState('');
	const [notesError, setNotesError] = useState('');

	const { mutate: approve, isPending: isApproving } = useApproveBarbershop();
	const { mutate: reject, isPending: isRejecting } = useRejectBarbershop();
	const { mutate: suspend, isPending: isSuspending } = useSuspendBarbershop();
	const { mutate: reactivate, isPending: isReactivating } = useReactivateBarbershop();

	const loading = isApproving || isRejecting || isSuspending || isReactivating;

	const handleApprove = () => {
		approve(barbershop.id);
	};

	const handleReject = () => {
		if (!approvalNotes.trim()) {
			setNotesError('Las notas de rechazo son requeridas');
			return;
		}
		setNotesError('');
		reject(
			{ id: barbershop.id, data: { approvalNotes: approvalNotes.trim() } },
			{
				onSuccess: () => {
					setRejectDialogOpen(false);
					setApprovalNotes('');
				},
			},
		);
	};

	const handleSuspend = () => {
		suspend(barbershop.id);
	};

	const handleReactivate = () => {
		reactivate(barbershop.id);
	};

	const { approvalStatus } = barbershop;

	return (
		<div className="rounded-lg border border-border bg-card">
			<div className="px-5 py-4 border-b border-border">
				<p className="font-semibold text-foreground">Acciones</p>
				<p className="text-xs text-muted-foreground mt-0.5">Gestiona el estado de esta barbería</p>
			</div>
			<div className="p-4 flex flex-col gap-3">
				{approvalStatus === 'PENDING' && (
					<>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									className="w-full bg-barber-success hover:bg-barber-success-hover text-white"
									disabled={loading}
								>
									<CheckCircle className="h-4 w-4 mr-2" />
									Aprobar
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Aprobar barbería</AlertDialogTitle>
									<AlertDialogDescription>
										Esta acción aprobará a <strong>{barbershop.name}</strong> y le permitirá operar
										en la plataforma. ¿Confirmas?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleApprove}
										className="bg-barber-success hover:bg-barber-success-hover text-white"
									>
										{isApproving ? (
											<Loader2 className="h-4 w-4 animate-spin mr-2" />
										) : (
											<CheckCircle className="h-4 w-4 mr-2" />
										)}
										Confirmar aprobación
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

						<Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
							<DialogTrigger asChild>
								<Button variant="destructive" className="w-full" disabled={loading}>
									<XCircle className="h-4 w-4 mr-2" />
									Rechazar
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Rechazar barbería</DialogTitle>
									<DialogDescription>
										Indica el motivo del rechazo para <strong>{barbershop.name}</strong>.
									</DialogDescription>
								</DialogHeader>
								<div className="flex flex-col gap-2 py-2">
									<Label htmlFor="approvalNotes">Notas de rechazo *</Label>
									<textarea
										id="approvalNotes"
										className="flex min-h-[100px] w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-barber-gold resize-none"
										placeholder="Describe el motivo del rechazo..."
										value={approvalNotes}
										onChange={(e) => {
											setApprovalNotes(e.target.value);
											if (notesError) setNotesError('');
										}}
										disabled={isRejecting}
									/>
									{notesError && <p className="text-sm text-destructive">{notesError}</p>}
								</div>
								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => {
											setRejectDialogOpen(false);
											setApprovalNotes('');
											setNotesError('');
										}}
										disabled={isRejecting}
									>
										Cancelar
									</Button>
									<Button
										variant="destructive"
										onClick={handleReject}
										disabled={isRejecting || !approvalNotes.trim()}
									>
										{isRejecting ? (
											<Loader2 className="h-4 w-4 animate-spin mr-2" />
										) : (
											<XCircle className="h-4 w-4 mr-2" />
										)}
										Confirmar rechazo
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</>
				)}

				{approvalStatus === 'APPROVED' && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="outline"
								className="w-full border-barber-warning text-barber-warning hover:bg-barber-warning/10"
								disabled={loading}
							>
								<Ban className="h-4 w-4 mr-2" />
								Suspender
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Suspender barbería</AlertDialogTitle>
								<AlertDialogDescription>
									Esta acción suspenderá a <strong>{barbershop.name}</strong> temporalmente.
									¿Confirmas?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleSuspend}
									className="bg-barber-warning hover:bg-barber-warning-hover text-white"
								>
									{isSuspending ? (
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
									) : (
										<Ban className="h-4 w-4 mr-2" />
									)}
									Confirmar suspensión
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}

				{approvalStatus === 'SUSPENDED' && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								className="w-full bg-barber-success hover:bg-barber-success-hover text-white"
								disabled={loading}
							>
								<RotateCcw className="h-4 w-4 mr-2" />
								Reactivar
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Reactivar barbería</AlertDialogTitle>
								<AlertDialogDescription>
									Esta acción reactivará a <strong>{barbershop.name}</strong>. ¿Confirmas?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleReactivate}
									className="bg-barber-success hover:bg-barber-success-hover text-white"
								>
									{isReactivating ? (
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
									) : (
										<RotateCcw className="h-4 w-4 mr-2" />
									)}
									Confirmar reactivación
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}

				{approvalStatus === 'REJECTED' && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								className="w-full bg-barber-success hover:bg-barber-success-hover text-white"
								disabled={loading}
							>
								<CheckCircle className="h-4 w-4 mr-2" />
								Aprobar igualmente
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Aprobar barbería rechazada</AlertDialogTitle>
								<AlertDialogDescription>
									Esta barbería fue previamente rechazada. ¿Confirmas que deseas aprobar a{' '}
									<strong>{barbershop.name}</strong>?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleApprove}
									className="bg-barber-success hover:bg-barber-success-hover text-white"
								>
									{isApproving ? (
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
									) : (
										<CheckCircle className="h-4 w-4 mr-2" />
									)}
									Confirmar aprobación
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
		</div>
	);
}
