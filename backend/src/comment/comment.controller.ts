import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Comment } from './comment';
import { CommentProvider } from './comment-provider';
import { HttpBodyComment } from './comment.interface';

@Controller('comment')
export class CommentController {
    constructor(private provider: CommentProvider) {}

    @Post()
    async postComment(@Body() body: HttpBodyComment): Promise<Comment> {
        return this.provider.save(body.doujinId, Comment.from(body, '1'));
    }

    @Delete(':doujinId/:commentId')
    async deleteComment(
        @Param('doujinId') doujinId: string,
        @Param('commentId') commentId: string,
    ) {
        this.provider.delete(doujinId, commentId);
    }
}
