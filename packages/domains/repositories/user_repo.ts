import { type DatabaseOptions, getDatabaseContext, Schema } from '../../db';
import {
	ORDER_DIRECTION,
	type OrderingParams,
	type PagingParams,
	type PagingResult,
	type User,
	type UserSearch,
} from '../../domains/entities';
import { buildPagingResult } from '../../domains/helpers';
import { and, asc, count, desc, ilike, isNull } from 'drizzle-orm';

type UserQueryRow = typeof Schema.users.$inferSelect;

export class UserRepository {
	private readonly table = Schema.users;

	mapToEntity(row: UserQueryRow): User {
		const role = row.role;
		if (role !== 'admin' && role !== 'user') {
    		throw new Error(`Invalid user role: ${role}`);
		}
		
		return {
			id: row.id,
			firstname: row.firstname,
			lastname: row.lastname,
            name: row.name,
            role,
			email: row.email,
			emailVerified: row.emailVerified,
			image: row.image,
			company: row.company,
			banned: row.banned,
			banReason: row.banReason,
			banExpires: row.banExpires,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
			deletedAt: row.deletedAt,
			updatedBy: row.updatedBy,
			deletedBy: row.deletedBy,
		};
	}

	async findById(id: string, options?: DatabaseOptions): Promise<User | null> {
		const db = getDatabaseContext(options);
		const row = await db.query.user.findFirst({
			where: { id,
				deletedAt: { isNull: true}
			 },
		});
		return row ? this.mapToEntity(row) : null;
	}
/*
	async findByEmail(
		email: string,
		options?: DatabaseOptions,
	): Promise<User | null> {
		const db = getDatabaseContext(options);
		const row = await db.query.user.findFirst({
			where: {email: { eq: email}},
		});
		if (!row) return null;
		return this.mapToEntity(row);
	}
	async create(id: string, data: Partial<typeof Schema.users.$inferInsert>, options?: DatabaseOptions,): Promise<User | null> {
		const db = getDatabaseContext(options);
		const row = await db.insert(user).values(data).returning();
	}
*/

	async update(id: string, data: Partial<typeof Schema.users.$inferInsert>, options?: DatabaseOptions,): Promise<User | null> {
		const db = getDatabaseContext(options);
		const row = await db
		.update(this.table)
		.set({...data, updatedAt: new Date() })
		.where(and(eq(this.table.id, id), isNull(this.table.deletedAt)))
		.returning();

		if (row.length === 0) return null; {
			return this.findById(id, options);
		}
	}
/*	
	async delete(id: string, deletedBy: string, options?: DatabaseOptions): Promise<void> {
		const db = getDatabaseContext(options);
		const existing = await this.findById(id, options);
		if (!existing) return;
		await db
			.update(this.table)
			.set({
				email: `${existing.email}-deleted-${Date.now()}`,
				deletedAt: new Date(),
				deletedBy,
				updatedBy: deletedBy,
				updatedAt: new Date(),
			})
			.where(and(eq(this.table.id, id), isNull(this.table.deletedAt)));
		await db.delete(Schema.accounts).where(eq(Schema.accounts.userId, id));
	}
*/

	async findAll(
		paging: PagingParams,
		ordering: OrderingParams<User>,
		search?: UserSearch,
		options?: DatabaseOptions,
	): Promise<PagingResult<User>> {
		const db = getDatabaseContext(options);
		const whereClause = and(
			isNull(this.table.deletedAt),
			search?.name ? ilike(this.table.name, `%${search.name}%`) : undefined,
			search?.email ? ilike(this.table.email, `%${search.email}%`) : undefined,
			search?.firstname
				? ilike(this.table.firstname, `%${search.firstname}%`)
				: undefined,
			search?.lastname
				? ilike(this.table.lastname, `%${search.lastname}%`)
				: undefined,
		);
		const orderByKey =
			ordering.orderBy as keyof typeof Schema.users.$inferSelect;
		const isAsc = ordering.orderDirection === ORDER_DIRECTION.ASC;

		const [rows, countResult] = await Promise.all([
			db.query.user.findMany({
				where: {
					deletedAt: { isNull: true },
					...(search?.name && {
						name: { ilike: `%${search.name}%` },
					}),
					...(search?.email && {
						email: { ilike: `%${search.email}%` },
					}),
					...(search?.firstname && {
						firstname: { ilike: `%${search.firstname}%` },
					}),
					...(search?.lastname && {
						lastname: { ilike: `%${search.lastname}%` },
					}),
				},
				orderBy: (users, { asc, desc }) =>
					isAsc ? asc(users[orderByKey]) : desc(users[orderByKey]),
				limit: paging.perPage,
				offset: (paging.page - 1) * paging.perPage,
			}),
			db.select({ total: count() }).from(this.table).where(whereClause),
		]);

		return buildPagingResult(
			rows.map((row) => this.mapToEntity(row as UserQueryRow)),
			Number(countResult[0]?.total ?? 0),
			paging,
		);
	}
}