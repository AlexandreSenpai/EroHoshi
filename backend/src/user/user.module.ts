import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserProvider } from './user-provider';

@Module({
    controllers: [UserController],
    providers: [UserProvider],
})
export class UserModule {}
