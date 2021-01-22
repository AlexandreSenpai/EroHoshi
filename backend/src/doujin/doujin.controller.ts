import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import { Doujin } from './doujin';
import { DoujinProvider } from './doujin-provider';
import {
    DoujinSearchQuery,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    HttpDoujinPage,
    HttpLike,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    HttpSimplifiedDoujins,
} from './doujin.interface';

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
    async likeDoujin(@Body() httpLike: HttpLike): Promise<any> {
        this.provider.likeDoujin(httpLike.doujinId, httpLike.uid);
    }

    @Get()
    async getNewestDoujins(
        @Query('last_id') lastId: string,
    ): Promise<HttpSimplifiedDoujins> {
        return {
            doujins: await this.provider.findAllOrderBy(lastId),
        };
    }

    @Get('popular')
    async getMostViewedDoujins(
        @Query('last_id') lastId: string,
        @Query('limit') limit = 5,
        @Query('field') field = 'views',
    ): Promise<HttpSimplifiedDoujins> {
        return {
            doujins: await this.provider.findAllOrderBy(
                lastId,
                field,
                'desc',
                limit,
            ),
        };
    }

    @Get('search')
    async searchDoujin(
        @Query() query: DoujinSearchQuery,
    ): Promise<HttpDoujinPage> {
        if (!query.q) {
            throw new HttpException(
                { error: 'You must provide tags to make a doujinshi search' },
                HttpStatus.BAD_REQUEST,
            );
        }

        return await this.provider.findAllByTag(
            query.q,
            query.page,
            query.sort,
        );
    }
}
