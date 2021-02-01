import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { DoujinModule } from './doujin/doujin.module';
import { SummaryModule } from './summary/summary.module';
import { CommentModule } from './comment/comment.module';
import { SonicModule } from './sonic/sonic.module';
import { UserMiddleware } from './middlewares/user.middleware';
import { CommentController } from './comment/comment.controller';

@Module({
    imports: [DoujinModule, SummaryModule, CommentModule, SonicModule],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserMiddleware).forRoutes(
            CommentController,
            {
                path: 'like',
                method: RequestMethod.ALL,
            },
            { path: 'dislike', method: RequestMethod.ALL },
        );
    }
}
