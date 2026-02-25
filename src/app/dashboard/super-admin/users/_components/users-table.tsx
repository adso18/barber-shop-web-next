'use client';

import { Pencil, Trash2, UserCheck, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserEditDialog } from './user-edit-dialog';
import type { User } from '@/services/users/user.types';
import { useSuperAdminUsersStore } from '../_store/super-admin-users.store';
import { useDeleteSuperAdminUser, useToggleSuperAdminUserActive } from '../_hooks/use-super-admin-users-mutation';
import { getRoleName } from '@/const/roles';

interface UsersTableProps {
	users: User[];
}

function getInitials(name: string): string {
	return name
		.split(' ')
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('');
}

function getUserStatus(user: User): { label: string; classes: string } {
	if (user.deletedAt) {
		return { label: 'Eliminado', classes: 'bg-destructive text-white' };
	}
	if (!user.active) {
		return { label: 'Suspendido', classes: 'border border-barber-warning text-barber-warning' };
	}
	return { label: 'Activo', classes: 'bg-barber-success text-white' };
}

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export function UsersTable({ users }: UsersTableProps) {
	const { editUser, userToDelete, setEditUser, setUserToDelete } = useSuperAdminUsersStore();
	const { mutate: deleteUser, isPending: isDeleting } = useDeleteSuperAdminUser();
	const { mutate: toggleActive, isPending: isToggling } = useToggleSuperAdminUserActive();

	const handleDeleteConfirm = () => {
		if (!userToDelete) return;
		deleteUser(userToDelete.id, {
			onSuccess: () => setUserToDelete(null),
		});
	};

	return (
		<>
			<div className="rounded-lg border border-border overflow-hidden">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-border bg-barber-surface">
							<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								Usuario
							</th>
							<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
								Email
							</th>
							<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
								Rol
							</th>
							<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
								Registro
							</th>
							<th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								Estado
							</th>
							<th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody className="bg-card">
						{users.length === 0 ? (
							<tr>
								<td colSpan={6} className="text-center text-muted-foreground py-12">
									No hay usuarios que coincidan con los filtros
								</td>
							</tr>
						) : (
							users.map((user) => {
								const status = getUserStatus(user);
								return (
									<tr
										key={user.id}
										className="border-b border-border last:border-0 hover:bg-muted transition-colors"
									>
										<td className="px-5 py-3.5">
											<div className="flex items-center gap-3">
												<div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground">
													{getInitials(user.name)}
												</div>
												<span className="font-medium text-foreground">{user.name}</span>
											</div>
										</td>
										<td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
											{user.email}
										</td>
										<td className="px-5 py-3.5 hidden lg:table-cell">
											<span className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs text-muted-foreground">
												{getRoleName(user.globalRole)}
											</span>
										</td>
										<td className="px-5 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">
											{formatDate(user.createdAt)}
										</td>
										<td className="px-5 py-3.5">
											<span
												className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${status.classes}`}
											>
												{status.label}
											</span>
										</td>
										<td className="px-5 py-3.5">
											<div className="flex justify-end items-center gap-1">
												{!user.deletedAt && (
													<Button
														variant="ghost"
														size="icon"
														className={`h-8 w-8 ${user.active ? 'text-muted-foreground hover:text-barber-warning' : 'text-muted-foreground hover:text-barber-success'}`}
														title={user.active ? 'Suspender usuario' : 'Activar usuario'}
														disabled={isToggling}
														onClick={() => toggleActive({ id: user.id, active: !user.active })}
													>
														{user.active ? (
															<UserX className="h-3.5 w-3.5" />
														) : (
															<UserCheck className="h-3.5 w-3.5" />
														)}
													</Button>
												)}
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-muted-foreground hover:text-foreground"
													onClick={() => setEditUser(user)}
												>
													<Pencil className="h-3.5 w-3.5" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-muted-foreground hover:text-destructive"
													onClick={() => setUserToDelete(user)}
												>
													<Trash2 className="h-3.5 w-3.5" />
												</Button>
											</div>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{/* Modal de edición */}
			<UserEditDialog
				user={editUser}
				open={!!editUser}
				onOpenChange={(open) => {
					if (!open) setEditUser(null);
				}}
			/>

			{/* Confirmar eliminación */}
			<AlertDialog
				open={!!userToDelete}
				onOpenChange={(open) => {
					if (!open) setUserToDelete(null);
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta acción eliminará permanentemente a{' '}
							<span className="font-semibold text-foreground">{userToDelete?.name}</span>. No se puede deshacer.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteConfirm}
							disabled={isDeleting}
							className="bg-destructive hover:bg-destructive/90 text-white"
						>
							{isDeleting ? 'Eliminando...' : 'Eliminar'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
