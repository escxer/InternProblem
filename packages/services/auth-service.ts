import type { auth as Auth } from '../../app/src/lib/auth';
import type { SignInRequest, SignUpRequest } from '../domains/dto/user';
import type { User } from '../domains/entities/user';
import type { UserRepository } from '../domains/repositories/user_repo';

export class AuthService {
    constructor(
        private readonly auth: typeof Auth,
        private readonly userRepo: UserRepository,
    ){}

    async signUp(input: SignUpRequest): Promise<User> {
        if (input.password !== input.confirmPassword) {
            throw new Error('Password and confirmPassword do not match');
	    }
        try {
            const user = await this.auth.api.signUpEmail({
                body: {
					email: input.email,
					password: input.password,
					name: `${input.firstName} ${input.lastName}`.trim(),
                    firstname: input.firstName,
                    lastname: input.lastName,
                    company: input.company,
				    },
			    });
            return {
                id: user.user.id,
                firstname: user.user.firstname,
                lastname: user.user.lastname,
                name: user.user.name,
                role: 'user',
                email: user.user.email,
                emailVerified: user.user.emailVerified,
                image: user.user.image,
                company: user.user.company,
                createdAt: user.user.createdAt,
                updatedAt: user.user.updatedAt,
            };
        }
        catch (error: unknown) {
            throw new Error(`Sign up failed: ${error}`);
        }
        
    }

    async signIn(input: SignInRequest, headers: Headers): Promise<Response> {
        const existingSession = await this.auth.api.getSession({ headers });
        if (existingSession) {
            throw new Error('User is already signed in.');
        }
        try {
            const result = await this.auth.api.signInEmail({
                body: {
                    email: input.email,
                    password: input.password,
                    rememberMe: input.rememberMe ?? false,
                },
                headers,
                asResponse: true,
            });
        return result;
        }
        catch (error: unknown) {
            throw new Error(`Sign in failed: ${error}`);
        }
    }

    async signOut(headers: Headers): Promise<Response> {
        const session = await this.auth.api.getSession({ headers });
        if (!session) {
            throw new Error('No active session found');
        }        
        try {
            const result = await this.auth.api.signOut({ headers, asResponse: true});
            return result;
        }
        catch (error: unknown) {
            throw new Error(`Sign out failed: ${error}`);
        }
    }
}
