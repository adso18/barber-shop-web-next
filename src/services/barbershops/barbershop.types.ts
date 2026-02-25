import { z } from 'zod';

// ---------------------------------------------------------------------------
// Nested config schemas
// ---------------------------------------------------------------------------

const barbershopSocialSchema = z.object({
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	whatsapp: z.string().optional(),
	website: z.string().optional(),
	email: z.string().optional(),
});

const barbershopLocationSchema = z.object({
	lat: z.number().optional(),
	lng: z.number().optional(),
	googleMapsUrl: z.string().optional(),
});

const barbershopConfigSchema = z.object({
	social: barbershopSocialSchema.optional(),
	location: barbershopLocationSchema.optional(),
});

// ---------------------------------------------------------------------------
// Approval status
// ---------------------------------------------------------------------------

export const approvalStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED']);

export type ApprovalStatus = z.infer<typeof approvalStatusSchema>;

// ---------------------------------------------------------------------------
// BarbershopDto
// ---------------------------------------------------------------------------

export const barbershopDtoSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string().nullable(),
	address: z.string(),
	cityId: z.string(),
	logo: z.string().nullable(),
	approvalStatus: approvalStatusSchema,
	approvalNotes: z.string().nullable(),
	approvalAt: z.string().nullable(),
	approvalBy: z.string().nullable(),
	isActive: z.boolean(),
	config: barbershopConfigSchema,
	createdBy: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type BarbershopDto = z.infer<typeof barbershopDtoSchema>;

// ---------------------------------------------------------------------------
// Paginated response
// ---------------------------------------------------------------------------

export const barbershopPaginateResponseSchema = z.object({
	data: z.array(barbershopDtoSchema),
	page: z.number().positive(),
	total: z.number(),
	totalPages: z.number(),
});

export type BarbershopPaginateResponse = z.infer<typeof barbershopPaginateResponseSchema>;

// ---------------------------------------------------------------------------
// Query params
// ---------------------------------------------------------------------------

export const barbershopPaginateParamsSchema = z.object({
	page: z.number().positive().default(1).optional(),
	limit: z.number().positive().max(100).default(10).optional(),
	search: z.string().optional(),
	approvalStatus: approvalStatusSchema.optional(),
	isActive: z.boolean().optional(),
});

export type BarbershopPaginateParams = z.infer<typeof barbershopPaginateParamsSchema>;

// ---------------------------------------------------------------------------
// Mutation inputs
// ---------------------------------------------------------------------------

export const barbershopRejectInputSchema = z.object({
	approvalNotes: z.string().min(1, 'Las notas de rechazo son requeridas'),
});

export type BarbershopRejectInput = z.infer<typeof barbershopRejectInputSchema>;
