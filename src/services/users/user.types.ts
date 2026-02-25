import { z } from 'zod';

export const userBaseSchema = z.object({
	id: z.string(),
	name: z.string().min(3).max(100).trim(),
	email: z.string().email().max(100).toLowerCase().trim(),
	phone: z.string().max(30).nullable().optional(),
	globalRole: z.string(),
	active: z.boolean().default(true),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
});

const passwordSchema = z
	.string()
	.min(8, 'La contraseña debe tener al menos 8 caracteres')
	.max(16, 'La contraseña debe tener menos de 16 caracteres')
	.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener mayúsculas, minúsculas y números')
	.trim();

export const userCreateSchema = z.object({
	name: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres').trim(),
	email: z.string().email('Email inválido').max(100).toLowerCase().trim(),
	password: passwordSchema,
	globalRole: z.string().min(1, 'Selecciona un rol'),
});

export const userUpdateSchema = z.object({
	id: z.string(),
	name: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres').trim().optional(),
	phone: z.string().max(30).nullable().optional(),
	active: z.boolean().optional(),
	globalRole: z.string().optional(),
	password: z.string().min(8).max(16).optional(),
});

export const userPaginateParamsSchema = z.object({
	page: z.number().positive().default(1).optional(),
	limit: z.number().positive().max(100).default(10).optional(),
	search: z.string().optional(),
	active: z.boolean().optional(),
	includeDeleted: z.boolean().optional(),
});

export const userPaginateResponseSchema = z.object({
	data: z.array(userBaseSchema),
	page: z.number().positive().default(1),
	total: z.number(),
	totalPages: z.number(),
});

export type User = z.infer<typeof userBaseSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserPaginateParams = z.infer<typeof userPaginateParamsSchema>;
export type UserPaginateResponse = z.infer<typeof userPaginateResponseSchema>;
