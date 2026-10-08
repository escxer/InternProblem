import { t } from "elysia";
export const signUpRequest = t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
    confirmPassword: t.String({ minLength: 8 }),
    firstName: t.String({ minLength: 1 }),
	lastName: t.String({ minLength: 1 }),
    company: t.String({ minLength: 1 }),
});

export const signInRequest = t.Object({
    email: t.String(),
    password: t.String({ minLength: 8 }),
    rememberMe: t.Optional(t.Boolean({ default: false })),
});