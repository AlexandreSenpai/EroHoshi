import { DynamicModule, Module } from '@nestjs/common';
import { SonicOptions } from './sonic-options.interface';
import { SonicProvider } from './sonic-provider';

@Module({})
export class SonicModule {
    static register(options: SonicOptions): DynamicModule {
        return {
            module: SonicModule,
            providers: [
                {
                    provide: 'SONIC_OPTIONS',
                    useValue: options,
                },
                SonicProvider,
            ],
            exports: [SonicProvider],
        };
    }
}
