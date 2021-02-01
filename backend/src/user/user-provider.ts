import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export type User = admin.auth.UserRecord;

@Injectable()
export class UserProvider {
    async findById(uid: string): Promise<User> {
        return await admin.auth().getUser(uid);
    }
}
