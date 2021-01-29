import { Module } from '@nestjs/common';
import { DoujinModule } from './doujin/doujin.module';
import { SummaryModule } from './summary/summary.module';
import { CommentModule } from './comment/comment.module';
import { SonicModule } from './sonic/sonic.module';

@Module({
    imports: [DoujinModule, SummaryModule, CommentModule, SonicModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
