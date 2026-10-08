import type { UserRole } from '../entities/user';

export type SignInRequest = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export type SignUpRequest = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    company: string;
};

export type UserCreate = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: UserRole;
    password: string;
    confirmPassword: string;
}

export type UserUpdate = {
    firstName?: string;
    lastName?: string;
    email?: string;
    company?: string;
    role?: string;
    password?: string;
    confirmPassword?: string;
}