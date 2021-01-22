import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryProvider } from './summary-provider';

@Module({
  controllers: [SummaryController],
  providers: [SummaryProvider],
})
export class SummaryModule {}
