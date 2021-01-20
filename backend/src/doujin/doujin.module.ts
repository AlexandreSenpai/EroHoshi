import { Module } from '@nestjs/common';
import { DoujinController } from './doujin.controller';
import { DoujinProvider } from './doujin-provider';

@Module({
  controllers: [DoujinController],
  providers: [DoujinProvider],
})
export class DoujinModule {}
