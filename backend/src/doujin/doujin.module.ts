import { Module } from '@nestjs/common';
import { DoujinController } from './doujin.controller';
import { DoujinProvider } from './doujin-provider';
import { SonicModule } from 'src/sonic/sonic.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SonicModule.register({
            host: process.env.SONIC_HOST,
            port: parseInt(process.env.SONIC_PORT),
            password: process.env.SONIC_PASSWORD,
        }),
    ],
    controllers: [DoujinController],
    providers: [DoujinProvider],
})
export class DoujinModule {}
