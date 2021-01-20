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
  DoujinQuery,
  DoujinSearchQuery,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpDoujinPage,
  HttpLike,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpSimplifiedDoujins,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpTotalDoujins,
} from './doujin.interface';

@Controller()
export class DoujinController {
  constructor(private provider: DoujinProvider) {}

  @Get('doujin')
  async getDoujinById(@Query() query: DoujinQuery): Promise<Doujin> {
    if (!query.id) {
      throw new HttpException(
        { error: 'You must provide a doujinshi identifier.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return Doujin.from(await this.provider.getDoujin(query.id));
  }

  @Get('random')
  async getRandomDoujin(): Promise<Doujin> {
    return Doujin.from(await this.provider.getRandom());
  }

  @Post('like')
  async likeDoujin(@Body() httpLike: HttpLike): Promise<any> {
    this.provider.likeDoujin(httpLike.doujinId, httpLike.uid);
  }

  @Get('totalDoujins')
  async getTotalDoujins(): Promise<HttpTotalDoujins> {
    return this.provider.getTotalDoujins();
  }

  @Get()
  async getNewestDoujins(): Promise<HttpSimplifiedDoujins> {
    return {
      doujins: await this.provider.getNewestDoujins(),
    };
  }

  @Get('popular')
  async getPopularDoujins(): Promise<HttpSimplifiedDoujins> {
    return {
      doujins: await this.provider.getPopularDoujins(),
    };
  }

  @Get('search')
  async findDoujinByTag(
    @Query() query: DoujinSearchQuery,
  ): Promise<HttpDoujinPage> {
    if (!query.q) {
      throw new HttpException(
        { error: 'You must provide tags to make a doujinshi search' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.provider.searchDoujin(query.q, query.page, query.sort);
  }
}
