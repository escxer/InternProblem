import cors from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';
import { authRoute, userRoute } from '../src/routers/';
import { config } from '../../packages/infra';

const app = new Elysia()
    .use(
        cors({
            origin: config.AUTH_TRUSTED_ORIGINS,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            credentials: true,
        }),
    )

    .use(
        openapi({

        }),
    )
    .use(authRoute)
    .use(userRoute)
    .listen(config.PORT)
