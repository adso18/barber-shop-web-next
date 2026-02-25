import { z } from 'zod';

// ---------------------------------------------------------------------------
// Shared factory — generic paginated response
// ---------------------------------------------------------------------------

const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
	z.object({
		data: z.array(itemSchema),
		page: z.number().positive(),
		total: z.number(),
		totalPages: z.number(),
	});

// ---------------------------------------------------------------------------
// Locations — Cities
// ---------------------------------------------------------------------------

export const citySchema = z.object({
	id: z.string(),
	name: z.string(),
	stateId: z.string(),
});

export const cityListResponseSchema = paginatedResponseSchema(citySchema);

export type CityDto = z.infer<typeof citySchema>;
export type CityListResponse = z.infer<typeof cityListResponseSchema>;

// ---------------------------------------------------------------------------
// Barbershops
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

export const approvalStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED']);

export const barbershopSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string().nullable(),
	address: z.string(),
	cityId: z.string(),
	logo: z.string().nullable(),
	approvalStatus: approvalStatusSchema,
	isActive: z.boolean(),
	config: barbershopConfigSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const barbershopListResponseSchema = paginatedResponseSchema(barbershopSchema);

export type ApprovalStatus = z.infer<typeof approvalStatusSchema>;
export type BarbershopDto = z.infer<typeof barbershopSchema>;
export type BarbershopListResponse = z.infer<typeof barbershopListResponseSchema>;

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const serviceSchema = z.object({
	id: z.string(),
	barbershopId: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	durationMinutes: z.number().nullable(),
	price: z.number(),
	isActive: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const serviceListResponseSchema = paginatedResponseSchema(serviceSchema);

export type ServiceDto = z.infer<typeof serviceSchema>;
export type ServiceListResponse = z.infer<typeof serviceListResponseSchema>;

// ---------------------------------------------------------------------------
// Members / Barbers
// ---------------------------------------------------------------------------

export const memberRoleSchema = z.enum(['ADMIN', 'BARBER', 'ASSISTANT']);
export const memberStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export const barbershopMemberSchema = z.object({
	id: z.string(),
	userId: z.string(),
	barbershopId: z.string(),
	role: memberRoleSchema,
	status: memberStatusSchema,
	joinedAt: z.string(),
	leftAt: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const barbershopMemberListResponseSchema = paginatedResponseSchema(barbershopMemberSchema);

export type MemberRole = z.infer<typeof memberRoleSchema>;
export type MemberStatus = z.infer<typeof memberStatusSchema>;
export type BarbershopMemberDto = z.infer<typeof barbershopMemberSchema>;
export type BarbershopMemberListResponse = z.infer<typeof barbershopMemberListResponseSchema>;

// ---------------------------------------------------------------------------
// Appointments
// ---------------------------------------------------------------------------

export const appointmentStatusSchema = z.enum(['BOOKED', 'CANCELLED', 'COMPLETED']);

export const appointmentSchema = z.object({
	id: z.string(),
	barbershopId: z.string(),
	barberId: z.string(),
	clientId: z.string().nullable(),
	serviceId: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	status: appointmentStatusSchema,
	notes: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const appointmentCreateInputSchema = z.object({
	barberId: z.string(),
	clientId: z.string().optional(),
	serviceId: z.string(),
	/** ISO 8601 datetime string */
	startTime: z.string(),
	/** ISO 8601 datetime string */
	endTime: z.string(),
	notes: z.string().optional(),
});

export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;
export type AppointmentDto = z.infer<typeof appointmentSchema>;
export type AppointmentCreateInput = z.infer<typeof appointmentCreateInputSchema>;

// ---------------------------------------------------------------------------
// Query param shapes
// ---------------------------------------------------------------------------

export const getCitiesParamsSchema = z.object({
	search: z.string().optional(),
	stateId: z.string().optional(),
});

export const getBarbershopsParamsSchema = z.object({
	search: z.string().optional(),
	cityId: z.string().optional(),
	page: z.number().positive().optional(),
	limit: z.number().positive().max(100).optional(),
});

export type GetCitiesParams = z.infer<typeof getCitiesParamsSchema>;
export type GetBarbershopsParams = z.infer<typeof getBarbershopsParamsSchema>;
