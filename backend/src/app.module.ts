import { Module } from '@nestjs/common';
import { DoujinModule } from './doujin/doujin.module';

@Module({
  imports: [DoujinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
