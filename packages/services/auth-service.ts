import type { auth as Auth } from '../../app/src/lib/auth';
import type { SignInRequest, SignUpRequest } from '../domains/dto/user';
import type { User } from '../domains/entities/user';
import type { UserRepository } from '../domains/repositories/user_repo';

export class AuthService {
    constructor(
        private readonly auth: typeof Auth,
        private readonly userRepo: UserRepository,
    ){}

    async signUp(input: SignUpRequest) {
        if (input.password !== input.confirmPassword) {
            throw new Error('Password and confirmPassword do not match');
	    }
        try {
            const user = await this.auth.api.signUpEmail({
                body: {
					email: input.email,
					password: input.password,
					name: `${input.firstName ?? ''} ${input.lastName ?? ''}`.trim(),
				    },
			    });
        }
        catch (error: unknown) {
            throw new Error(`Sign up failed: ${error}`);
        }
    }

    async signIn(input: SignInRequest) {
        try {
            const result = await this.auth.api.signInEmail({
                body: {
                    email: input.email,
                    password: input.password,
                    rememberMe: input.rememberMe ?? false,
                },
            });
        return result;
        }
        catch (error: unknown) {
            throw new Error(`Sign in failed: ${error}`);
        }
    }

    async signOut() {
        try {
            const result = await this.auth.api.signOut();
            return result;
        }
        catch (error: unknown) {
            throw new Error(`Sign out failed: ${error}`);
        }
    }
}
