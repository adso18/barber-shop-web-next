import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateSuperAdminUser } from './use-super-admin-users-mutation';
import type { User } from '@/services/users/user.types';

const editUserSchema = z.object({
	name: z
		.string()
		.min(2, 'Mínimo 2 caracteres')
		.max(100, 'Máximo 100 caracteres')
		.trim(),
	phone: z.string().max(30, 'Máximo 30 caracteres').trim().optional().or(z.literal('')),
});

export type SuperAdminEditUserFormData = z.infer<typeof editUserSchema>;

interface UseSuperAdminUserEditFormProps {
	user: User | null;
	open: boolean;
	onSuccess: () => void;
}

export function useSuperAdminUserEditForm({ user, open, onSuccess }: UseSuperAdminUserEditFormProps) {
	const { mutate: updateUser, isPending, error } = useUpdateSuperAdminUser();

	const form = useForm<SuperAdminEditUserFormData>({
		resolver: zodResolver(editUserSchema),
		defaultValues: { name: '', phone: '' },
	});

	useEffect(() => {
		if (open && user) {
			form.reset({
				name: user.name ?? '',
				phone: user.phone ?? '',
			});
		}
	}, [open, user, form]);

	const onSubmit = form.handleSubmit((data) => {
		if (!user) return;

		const updateData: { name: string; phone?: string } = { name: data.name };
		if (data.phone && data.phone.trim()) {
			updateData.phone = data.phone.trim();
		}

		updateUser({ id: user.id, data: updateData }, { onSuccess });
	});

	return { form, onSubmit, isPending, error };
}
