import 'dotenv/config';
import { } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Schema } from './schema/auth-schema';

const databaseurl = 'postgresql://postgres:postgres@localhost:5432/postgres';

export const db = drizzle(databaseurl);

export { Schema };
export * from './schema/auth-schema';