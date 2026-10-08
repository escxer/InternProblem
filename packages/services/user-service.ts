import type { auth as Auth } from '../../app/src/lib/auth';
import type { UserCreate, UserUpdate } from '../domains/dto';
import type { OrderingParams, PagingParams, PagingResult, User, UserSearch } from '../domains/entities';
/*
import { Errors } from '@domains/errors';
import { logger } from '@domains/utils';
*/
import type { UserRepository } from '../domains/repositories/user_repo';

export class UserService {
    constructor(
        private readonly auth: typeof Auth,
        private readonly userRepo: UserRepository,
    ){}

    async createUser(input: UserCreate, headers: Headers): Promise<User> {
        if (input.password !== input.confirmPassword) {
            throw new Error('Password and confirmPassword do not match.');
        }

        const result = await this.auth.api.createUser({
            body: {
                email: input.email,
                password: input.password,
                name: `${input.firstName} ${input.lastName}`.trim(),
                role: input.role,
                data: {
                    firstname: input.firstName,
                    lastname: input.lastName,
                    company: input.company,
                },
            },
            headers,
        });

        return {
            id: result.user.id,
            firstname: input.firstName,
            lastname: input.lastName,
            name: result.user.name,
            role: input.role,
            email: result.user.email,
            emailVerified: result.user.emailVerified,
            image: result.user.image,
            company: input.company,
            createdAt: result.user.createdAt,
            updatedAt: result.user.updatedAt,
        };
    }


    async getUserById(id: string): Promise<User | null> {
        try{
            const user = await this.userRepo.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error: unknown) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getAllUsers(
		paging: PagingParams,
		ordering: OrderingParams<User>,
		search?: UserSearch,
	): Promise<PagingResult<User>> {
		try {
			const users = await this.userRepo.findAll(paging, ordering, search);
			return users;
		} catch (error: unknown) {
            throw new Error();
            /*
			if (error instanceof Errors.ApiError) throw error;
			const err = error as {
				statusCode?: number;
				status?: number;
				message?: string;
			};
			logger.error(error, 'GetAllUsers error');
			throw new Errors.InternalServerError(
				err?.message ?? 'Failed to get all users',
			);
            */
		}
	}
/*
    async updateUser(
        id: string,
        data: UserUpdate,
        sessionUserId: string,
    ): Promise<User> {
        const sessionUser = await this.userRepo.findById(sessionUserId);
        if (!sessionUser) {
            throw new Error('Session user not found.');
        }
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        try{
            const updatedUser = await this.userRepo.update(id, {...data, updatedBy: sessionUserId,});
            if (!updatedUser){
                throw new Error('User not found');
            }
            return updatedUser;
        } catch(error: unknown) {
            throw new Error("Error");
        }
    }

    async deleteUser(id: string, sessionUserId: string): Promise<void> {
        const user = await this.userRepo.findById(id);
        if(!user){
            throw new Error();
        }
        const sessionUser = await this.userRepo.findById(sessionUserId);
        if (!sessionUser) {
            throw new Error();
        }
        try {
            await this.userRepo.delete(id, sessionUserId);
        } catch (error: unknown) {
            throw new Error();
        }
    }
*/
}
