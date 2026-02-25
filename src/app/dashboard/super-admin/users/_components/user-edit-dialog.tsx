'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from '@/services/users/user.types';
import { useSuperAdminUserEditForm } from '../_hooks/use-super-admin-user-edit-form';

interface UserEditDialogProps {
	user: User | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function UserEditDialog({ user, open, onOpenChange }: UserEditDialogProps) {
	const { form, onSubmit, isPending, error } = useSuperAdminUserEditForm({
		user,
		open,
		onSuccess: () => onOpenChange(false),
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[400px]">
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle>Editar Usuario</DialogTitle>
						<DialogDescription>
							Modifica el nombre o teléfono de{' '}
							<span className="font-semibold">{user?.name}</span>.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						{error && (
							<p className="text-sm text-destructive bg-destructive/10 rounded px-3 py-2">
								{error.message}
							</p>
						)}
						<div className="grid gap-2">
							<Label htmlFor="sa-user-name">Nombre</Label>
							<Input
								id="sa-user-name"
								{...form.register('name')}
								placeholder="Nombre completo"
								disabled={isPending}
							/>
							{form.formState.errors.name && (
								<p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="sa-user-phone">
								Teléfono{' '}
								<span className="text-muted-foreground text-xs">(opcional)</span>
							</Label>
							<Input
								id="sa-user-phone"
								{...form.register('phone')}
								placeholder="+57 300 000 0000"
								disabled={isPending}
							/>
							{form.formState.errors.phone && (
								<p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
							)}
						</div>
						<div className="grid gap-1">
							<Label className="text-muted-foreground text-xs">Email</Label>
							<p className="text-sm text-muted-foreground border border-border rounded px-3 py-2 bg-muted/40">
								{user?.email}
							</p>
							<p className="text-xs text-muted-foreground">El email no se puede modificar.</p>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={isPending}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							disabled={isPending}
							className="bg-barber-gold text-barber-gold-foreground hover:bg-barber-gold-hover"
						>
							{isPending ? 'Guardando...' : 'Guardar cambios'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
