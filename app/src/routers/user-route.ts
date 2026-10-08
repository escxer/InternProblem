import type { OrderingParams, User } from "../../../packages/domains/entities";
import { Elysia } from "elysia";
import { sessionMiddleware } from '../middlewares';
import {
    createUserRequest,
    listUsersQuery,
    updateUserRequest
} from '../requests/user-req';
import { userService } from '../service-di';

export const userRoute = new Elysia({
    prefix: '/users',
    detail: { tags: ['Users'] },
})
    .use(sessionMiddleware)
/*.get('/me', ({ user }) => {
        return userService.getUserById(user.id)
})*/

    .post(
        '/',
        async ({ body, request }) => {
            return userService.createUser(body, request.headers);
        },
        {
            body: createUserRequest,
        },
    )
/*
    .put(
        '/me',
        async ({ body, user }) => {
            return userService.updateUser(user.id, body, user.id);
        },
        {
            body: updateUserRequest,
        },
    )
*/
    .get(
        '/',
        async ({ query }) => {
            const { name, email, firstName, lastName } = query;
            const paging = {
                page: Number(query.page),
                perPage: Number(query.perPage),
            };
            const order: OrderingParams<User> = {
                orderBy: query.orderBy,
                orderDirection: query.orderDirection,
            };
            const search = {
                name,
                email,
                firstname: firstName,
                lastname: lastName,
            };
            const users = await userService.getAllUsers(paging, order, search);
            return users;
        },
        {
            query: listUsersQuery,
        },
    )
    