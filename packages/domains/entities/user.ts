export type UserRole = 'admin' | 'user';

export type User = {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
    name: string;
    role?: UserRole;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    company?: string | null;
    banned?: boolean | null;
	banReason?: string | null;
	banExpires?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    updatedBy?: string | null;
    deletedBy?: string | null;
}

export type UserSearch = {
	name?: string;
	email?: string;
	firstname?: string;
	lastname?: string;
};