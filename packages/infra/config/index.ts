import { config as loadDotEnv } from 'dotenv';
import { fileURLToPath } from 'node:url';

loadDotEnv({
    path: fileURLToPath(new URL('../../../.env', import.meta.url)),
});

function requireEnv(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required environment variable: ${key}`);
    return value;
}

const trustedOrigins = (
    process.env.AUTH_TRUSTED_ORIGINS ?? 'http://localhost:3001'
)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

if (trustedOrigins.length === 0) {
    throw new Error('AUTH_TRUSTED_ORIGINS must contain at least one origin');
}

const apiBaseUrl = process.env.API_BASE_URL ?? process.env.BETTER_AUTH_URL;
if (!apiBaseUrl) {
    throw new Error('Missing required environment variable: API_BASE_URL or BETTER_AUTH_URL');
}

export const config = {
    PROJECT_NAME: process.env.PROJECT_NAME ?? 'BackEnd',
    PORT: Number(process.env.PORT ?? 3000),
    API_BASE_URL: apiBaseUrl,
    DATABASE_URL: requireEnv('DATABASE_URL'),
    BETTER_AUTH_SECRET: requireEnv('BETTER_AUTH_SECRET'),
    AUTH_TRUSTED_ORIGINS: trustedOrigins
} as const;