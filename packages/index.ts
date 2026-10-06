import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { Schema } from './db';

const usersTable = Schema.users;
const db = drizzle(process.env.DATABASE_URL!);
