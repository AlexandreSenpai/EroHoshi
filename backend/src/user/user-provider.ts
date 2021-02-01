import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export type User = admin.auth.UserRecord;

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
}
