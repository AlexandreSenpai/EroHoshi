import { Inject, Injectable } from '@nestjs/common';
import { SonicOptions } from './sonic-options.interface';
import { Search } from 'sonic-channel';

@Injectable()
export class SonicProvider {
    private readonly sonicConnection: Search;

    constructor(@Inject('SONIC_OPTIONS') private config: SonicOptions) {
        this.sonicConnection = new Search({
            host: config.host,
            port: config.port,
            auth: config.password,
        }).connect({
            connected: () =>
                console.log('Sonic instance connected successfully'),

            disconnected: () => console.log('Sonic instance disconnected.'),

            retrying: () =>
                console.log('Bad Connection, trying to reconnect...'),

            error: (error) =>
                console.error('Error while stabling connection: ', error),
        });
    }

    async query(
        tags: string,
        limit?: number,
        offset?: number,
    ): Promise<string[]> {
        return await this.sonicConnection.query('gallery', 'doujins', tags, {
            limit: limit,
            offset: offset,
        });
    }
}
