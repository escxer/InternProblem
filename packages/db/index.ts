import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgTransaction } from 'drizzle-orm/node-postgres';
import { config } from '../infra';
import { AuthRelations, Schema } from './schema/auth-schema';

export const db = drizzle({
    connection: config.DATABASE_URL,
    relations: AuthRelations,
});
export type DatabaseOptions = {tx?: NodePgTransaction<typeof AuthRelations>};
export function getDatabaseContext(options?: DatabaseOptions) {
    return options?.tx ?? db;
}

export { Schema };
export * from './schema/auth-schema';