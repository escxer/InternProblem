import { Elysia } from "elysia";
import { signInRequest, signUpRequest } from "../requests/auth-req";
import { authService } from "../../src/service-di";

export const authRoute = new Elysia({
    prefix: '/auth',
    detail: { tags: ['Auth'] },
})
    .post('/sign-up', async ({ body }) => {
        return authService.signUp(body);
    },
    {
        body: signUpRequest,
    },
)
    .post('/sign-in', async ({ body }) => {
        return authService.signIn(body);
    },
    {
        body: signInRequest,
    },
)
    .post('/sign-out', async () => {
        return authService.signOut();
    });