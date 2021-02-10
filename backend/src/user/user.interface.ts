import * as admin from 'firebase-admin';

export type User = admin.auth.UserRecord;

export interface UserBody {
    userName: string;
    email: string;
    password: string;
    avatar: string;
    cover: string;
    favorites: string[];
}

export interface UserResponse {
    uid: string;
    createdAt: string;
    lastOn: string;
    userName: string;
    avatar: string;
    cover: string;
    favorites: string[];
}
