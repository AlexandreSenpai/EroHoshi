import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpException,
    HttpStatus,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { Doujin } from './doujin';
import { DoujinProvider } from './doujin-provider';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpLike, SimplifiedDoujin } from './doujin.interface';

@Controller()
export class DoujinController {
    constructor(private provider: DoujinProvider) {}

    @Get('doujin')
    async getDoujinById(@Query('id') id: string): Promise<Doujin> {
        if (!id) {
            throw new HttpException(
                { error: 'You must provide a doujinshi identifier.' },
                HttpStatus.BAD_REQUEST,
            );
        }

        return Doujin.from(await this.provider.findById(id));
    }

    @Get('random')
    async getRandomDoujin(): Promise<Doujin> {
        return Doujin.from(await this.provider.findRandom());
    }

    @Post('like')
    async likeDoujin(@Body() httpLike: HttpLike): Promise<void> {
        this.provider.likeDoujin(httpLike.doujinId, httpLike.uid);
    }

    @Post('dislike')
    async dislikeDoujin(@Body() httpLike: HttpLike): Promise<void> {
        this.provider.dislikeDoujin(httpLike.doujinId, httpLike.uid);
    }

    @Get()
    async getNewestDoujins(
        @Query('last_id') lastId: string,
    ): Promise<{ doujins: SimplifiedDoujin[] }> {
        return {
            doujins: await this.provider.findAllOrderBy(lastId, 'id', 18),
        };
    }

    @Get('popular')
    async getMostViewedDoujins(
        @Query('last_id') lastId: string,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
        @Query('field', new DefaultValuePipe('views')) field: string,
    ): Promise<{ doujins: SimplifiedDoujin[] }> {
        return {
            doujins: await this.provider.findAllOrderBy(lastId, field, limit),
        };
    }

    @Get('search')
    async searchDoujin(
        @Query('q') query: string,
        @Query('last_id') lastId: string,
        @Query('sort', new DefaultValuePipe('recent')) sort: string,
    ): Promise<SimplifiedDoujin[]> {
        if (!query) {
            throw new HttpException(
                { error: 'You must provide tags to make a doujinshi search' },
                HttpStatus.BAD_REQUEST,
            );
        }

        return await this.provider.findAllByTag(query, lastId, sort);
    }
}
