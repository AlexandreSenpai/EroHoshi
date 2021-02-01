import {
    BadRequestException,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseArrayPipe,
    Query,
} from '@nestjs/common';
import { get } from 'http';
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

    @Get()
    async getUsersByIds(
        @Query(
            'uids',
            new ParseArrayPipe({
                items: String,
                separator: ',',
                errorHttpStatusCode: HttpStatus.BAD_REQUEST,
                exceptionFactory: () =>
                    new BadRequestException(
                        'Must provide a comma-separatted uids',
                    ),
            }),
        )
        uids: string[],
    ): Promise<User[]> {
        return await this.provider.findAllByIds(uids);
    }
}
