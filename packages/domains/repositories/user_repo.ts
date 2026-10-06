import { Schema } from '../../db';
import {
	ORDER_DIRECTION,
	type OrderingParams,
	type PagingParams,
	type PagingResult,
	type User,
} from '../../domains/entities';
import { buildPagingResult } from '../../domains/helpers';
import { and, count, eq, ilike, isNull } from 'drizzle-orm';

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
			createAt: row.createdAt,
			UpdateAt: row.updatedAt,
			/*
			DeleteAt: row.deletedAt,
			UpdateBy: row.updatedBy,
			DeleteBy: row.deletedBy,
			*/
		};
	}
}