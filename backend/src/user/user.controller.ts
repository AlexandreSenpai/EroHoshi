import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseArrayPipe,
    Post,
    Query,
} from '@nestjs/common';
import { UserProvider } from './user-provider';
import { UserResponseImpl } from './user-response.factory';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserBody, UserResponse } from './user.interface';

@Controller('user')
export class UserController {
    constructor(private provider: UserProvider) {}

    @Get(':uid')
    async getUserById(@Param('uid') uid: string): Promise<UserResponse> {
        const user: User = await this.provider.findById(uid);

        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }

        return UserResponseImpl.from(user);
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
    ): Promise<UserResponse[]> {
        const users = await this.provider.findAllByIds(uids);

        return users.map((user) => UserResponseImpl.from(user));
    }

    @Post()
    async signup(@Body() userBody: UserBody): Promise<UserResponseImpl> {
        return UserResponseImpl.from(await this.provider.save(userBody));
    }
}
