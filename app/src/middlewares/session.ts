import { Elysia } from 'elysia';
import { auth } from '../lib/auth';

export const sessionMiddleware = new Elysia({
    name: 'session-middleware',
}).derive({ as: 'scoped' }, async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        throw new Error('No active session found');
    }
    return {
        session: session.session,
        user: session.user,
    };
});