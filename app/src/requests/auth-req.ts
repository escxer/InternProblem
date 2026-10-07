import { t } from "elysia";
export const signUpRequest = t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({minLength: 4}),
    confirmPassword: t.String({minLength: 4}),
    firstName: t.String({ minLength: 1 }),
	lastName: t.String({ minLength: 1 }),
});

export const signInRequest = t.Object({
    email: t.String(),
    password: t.String({minLength: 4}),
    rememberMe: t.Optional(t.Boolean({ default: false })),
});