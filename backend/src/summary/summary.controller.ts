import { Controller, Get } from '@nestjs/common';
import { SummaryProvider } from './summary-provider';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpTotalDoujins } from './summary.interface';

@Controller()
export class SummaryController {
  constructor(private provider: SummaryProvider) {}

  @Get('totalDoujins')
  async getTotalDoujins(): Promise<HttpTotalDoujins> {
    return this.provider.getTotalDoujins();
  }
}
