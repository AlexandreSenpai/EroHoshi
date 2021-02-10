import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentProvider } from './comment-provider';

@Module({
    controllers: [CommentController],
    providers: [CommentProvider],
})
export class CommentModule {}
