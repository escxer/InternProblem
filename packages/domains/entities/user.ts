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
    createAt: Date;
    UpdateAt: Date;
    DeleteAt?: Date | null;
    UpdateBy?: string | null;
    DeleteBy?: string | null;
}