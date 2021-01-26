import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpException,
    HttpStatus,
    ParseArrayPipe,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { Doujin } from './doujin.factory';
import { DoujinProvider } from './doujin-provider';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpLike, DoujinResponse } from './doujin.interface';
import { DoujinResponseImpl } from './doujinResponse.factory';

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
    ): Promise<{ doujins: DoujinResponse[] }> {
        const doujins = await this.provider.findAllOrderBy(lastId, 'id', 18);

        return {
            doujins: doujins.map((doujin) => {
                return DoujinResponseImpl.from(doujin);
            }),
        };
    }

    @Get('popular')
    async getMostViewedDoujins(
        @Query('last_id') lastId: string,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
        @Query('field', new DefaultValuePipe('views')) field: string,
    ): Promise<{ doujins: DoujinResponse[] }> {
        const doujins = await this.provider.findAllOrderBy(
            lastId,
            field,
            limit,
        );

        return {
            doujins: doujins.map((doujin) => {
                return DoujinResponseImpl.from(doujin);
            }),
        };
    }

    @Get('search')
    async searchDoujin(
        @Query(
            'q',
            new ParseArrayPipe({
                items: String,
                separator: ' ',
                errorHttpStatusCode: HttpStatus.BAD_REQUEST,
                exceptionFactory: () =>
                    new BadRequestException(
                        'Must provide a query with space separated tags',
                    ),
            }),
        )
        tags: string[],
        @Query('last_id') lastId: string,
        @Query('sort', new DefaultValuePipe('recent')) sort: string,
    ): Promise<DoujinResponse[]> {
        const doujins = await this.provider.findAllByTag(tags, lastId, sort);

        return doujins.map((doujin) => {
            return DoujinResponseImpl.from(doujin);
        });
    }
}
