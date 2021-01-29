import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpStatus,
    ParseIntPipe,
    Post,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { Doujin } from './doujin.factory';
import { DoujinProvider } from './doujin-provider';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpLike, DoujinResponse, IDoujin } from './doujin.interface';
import { DoujinResponseImpl } from './doujinResponse.factory';
import { SonicProvider } from 'src/sonic/sonic-provider';

@Controller()
export class DoujinController {
    constructor(
        private provider: DoujinProvider,
        private searchProvider: SonicProvider,
    ) {}

    @Get('doujin')
    async getDoujinById(
        @Query(
            'id',
            new ValidationPipe({
                errorHttpStatusCode: HttpStatus.BAD_REQUEST,
                exceptionFactory: () =>
                    new BadRequestException(
                        'You must provide a doujinshi identifier.',
                    ),
            }),
        )
        id: string,
    ): Promise<Doujin> {
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
    ): Promise<DoujinResponse[]> {
        const doujins = await this.provider.findAllOrderBy(lastId, 'id', 18);

        return doujins.map((doujin) => {
            return DoujinResponseImpl.from(doujin);
        });
    }

    @Get('popular')
    async getMostViewedDoujins(
        @Query('last_id') lastId: string,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
        @Query('field', new DefaultValuePipe('views')) field: string,
    ): Promise<DoujinResponse[]> {
        const doujins = await this.provider.findAllOrderBy(
            lastId,
            field,
            limit,
        );

        return doujins.map((doujin) => {
            return DoujinResponseImpl.from(doujin);
        });
    }

    @Get('search')
    async searchDoujin(
        @Query(
            'q',
            new ValidationPipe({
                errorHttpStatusCode: HttpStatus.BAD_REQUEST,
                exceptionFactory: () =>
                    new BadRequestException(
                        'Must provide a query with space separated tags',
                    ),
            }),
        )
        tags: string,
        @Query('limit', new DefaultValuePipe(18), ParseIntPipe) limit: number,
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    ): Promise<DoujinResponse[]> {
        const doujinIds = await this.searchProvider.query(tags, limit, offset);

        const promises: Promise<IDoujin>[] = doujinIds.map((id) =>
            this.provider.findById(id),
        );
        return (await Promise.all(promises)).map((doujin) =>
            DoujinResponseImpl.from(doujin),
        );
    }
}
