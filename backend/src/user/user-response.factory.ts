import { User, UserResponse } from './user.interface';

export class UserResponseImpl implements UserResponse {
    constructor(
        public uid: string,
        public createdAt: string,
        public lastOn: string,
        public userName: string,
        public avatar: string,
        public cover: string,
        public favorites: string[],
    ) {}

    static from(user: User) {
        return new UserResponseImpl(
            user.uid,
            new Date(user.metadata.creationTime).toLocaleDateString(),
            new Date(user.metadata.lastSignInTime).toLocaleDateString(),
            user.displayName,
            user.photoURL,
            user.customClaims?.cover,
            user.customClaims?.favorites,
        );
    }
}
