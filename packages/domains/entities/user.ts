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
    createdAt: Date;
    updatedAt: Date;
    DeleteAt?: Date | null;
    UpdateBy?: string | null;
    DeleteBy?: string | null;
}