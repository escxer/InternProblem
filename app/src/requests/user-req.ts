import { t } from 'elysia';
import { QueryPagingValidator } from '../requests/common-request';
export const userIdParams = t.Object({ id: t.String() });

export const listUsersQuery = t.Composite([
	QueryPagingValidator,
	t.Object({
		orderBy: t.Union([
			t.Literal('id'),
			t.Literal('firstname'),
			t.Literal('lastname'),
			t.Literal('name'),
			t.Literal('role'),
			t.Literal('email'),
			t.Literal('emailVerified'),
			t.Literal('company'),
			t.Literal('banned'),
			t.Literal('createdAt'),
			t.Literal('updatedAt'),
		], { default: 'createdAt' }),
		name: t.Optional(t.String()),
		email: t.Optional(t.String()),
		firstName: t.Optional(t.String()),
		lastName: t.Optional(t.String()),
	}),
]);

export const createUserRequest = t.Object({
	firstName: t.String({ minLength: 1 }),
	lastName: t.String({ minLength: 1 }),
	email: t.String({ format: 'email' }),
	company: t.String({ minLength: 1 }),
	role: t.Union([t.Literal('admin'), t.Literal('user')]),
	password: t.String({ minLength: 8 }),
	confirmPassword: t.String({ minLength: 8 }),
});

export const updateUserRequest = t.Object(
    {
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        company: t.String(),
        role: t.String(),
        password: t.String(),
        confirmPassword: t.String(),
    },
);
