import {
    BadRequestException,
    Controller,
    DefaultValuePipe,
    Get,
    HttpException,
    HttpStatus,
    ParseIntPipe,
    Post,
    Query,
    Req,
    ValidationPipe,
} from '@nestjs/common';
import { Doujin } from './doujin.factory';
import { DoujinProvider } from './doujin-provider';
import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    HttpLike,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DoujinResponse,
    IDoujin,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ReactionResponse,
} from './doujin.interface';
import { DoujinResponseImpl } from './doujin-response.factory';
import { SonicProvider } from 'src/sonic/sonic-provider';
import { Request } from 'express';

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
    async likeDoujin(
        @Req() req: Request<any, any, HttpLike>,
    ): Promise<ReactionResponse> {
        const reactions = await this.provider.likeDoujin(
            req.body.doujinId,
            req.body.userId,
        );

        if (!reactions) {
            throw new HttpException(
                'Provided doujin does not exists',
                HttpStatus.NOT_FOUND,
            );
        }

        return reactions;
    }

    @Post('dislike')
    async dislikeDoujin(
        @Req() req: Request<any, any, HttpLike>,
    ): Promise<ReactionResponse> {
        const reactions = await this.provider.dislikeDoujin(
            req.body.doujinId,
            req.body.userId,
        );

        if (!reactions) {
            throw new HttpException(
                'Provided doujin does not exists',
                HttpStatus.NOT_FOUND,
            );
        }

        return reactions;
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
        // This field should be named "offset", and it is not for backend <-> frontend concern purposes
        @Query('last_id', new DefaultValuePipe(0), ParseIntPipe) offset: number,
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
