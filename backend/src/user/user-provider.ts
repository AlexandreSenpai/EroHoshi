import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User, UserBody } from './user.interface';

@Injectable()
export class UserProvider {
    async findById(uid: string): Promise<User> {
        return await admin.auth().getUser(uid);
    }

    async findAllByIds(uids: string[]): Promise<User[]> {
        const userIdentifiers = uids.map((uid) => {
            return { uid };
        });
        return await admin
            .auth()
            .getUsers(userIdentifiers)
            .then((res) => res.users);
    }

    async save(user: UserBody): Promise<User> {
        const created = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            photoURL: user.avatar,
            displayName: user.userName,
        });

        await admin.auth().setCustomUserClaims(created.uid, {
            cover: user.cover,
            favorites: user.favorites,
        });

        return created;
    }
}
