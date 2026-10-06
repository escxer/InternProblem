import { auth } from '../src/lib/auth';
import cors from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';
import { authRoute } from '../src/routers/auth-route';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const PROJECT_NAME = process.env.PROJECT_NAME ?? "Backend";
const TRUSTED_ORIGINS = process.env.AUTH_TRUSTED_ORIGINS
    ? process.env.AUTH_TRUSTED_ORIGINS.split(",")
    : true;

const app = new Elysia()
    .use(
        cors({
            origin: TRUSTED_ORIGINS,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            credentials: true,
        }),
    )

    .use(
        openapi({

        }),
    )
    .use(authRoute)
    .listen(PORT)
