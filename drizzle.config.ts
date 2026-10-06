import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './packages/db/schema/auth-schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://postgres:postgres@localhost:5432/postgres",
    },
})