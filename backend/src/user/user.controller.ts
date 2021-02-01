import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
} from '@nestjs/common';
import { UserProvider, User } from './user-provider';

@Controller('user')
export class UserController {
    constructor(private provider: UserProvider) {}

    @Get(':uid')
    async getUserById(@Param('uid') uid: string): Promise<User> {
        const user: User = await this.provider.findById(uid);

        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }
}
