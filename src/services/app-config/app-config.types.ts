import { z } from 'zod';

// ---------------------------------------------------------------------------
// AppConfigDto
// ---------------------------------------------------------------------------

export const appConfigDtoSchema = z.object({
	id: z.string(),
	key: z.string(),
	value: z.string(),
	description: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type AppConfigDto = z.infer<typeof appConfigDtoSchema>;

// ---------------------------------------------------------------------------
// List response
// ---------------------------------------------------------------------------

export const appConfigListResponseSchema = z.object({
	total: z.number(),
	data: z.array(appConfigDtoSchema),
});

export type AppConfigListResponse = z.infer<typeof appConfigListResponseSchema>;

// ---------------------------------------------------------------------------
// Mutation inputs
// ---------------------------------------------------------------------------

export const appConfigUpdateInputSchema = z.object({
	value: z.string().min(1, 'El valor es requerido'),
});

export type AppConfigUpdateInput = z.infer<typeof appConfigUpdateInputSchema>;
