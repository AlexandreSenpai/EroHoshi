import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import Answer from './answer';
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

    @Post(':commentId')
    async postAnswer(
        @Param('commentId') commentId: string,
        @Body() body: HttpBodyComment,
    ): Promise<Answer> {
        return await this.provider.saveAnswer(
            body.doujinId,
            commentId,
            Answer.from(body.text, 'id'),
        );
    }

    @Delete(':doujinId/:commentId')
    async deleteComment(
        @Param('doujinId') doujinId: string,
        @Param('commentId') commentId: string,
    ) {
        this.provider.delete(doujinId, commentId);
    }

    @Delete(':doujinId/:commentId/:answerId')
    async deleteAnswer(
        @Param('doujinId') doujinId: string,
        @Param('commentId') commentId: string,
        @Param('answerId') answerId: string,
    ) {
        this.provider.deleteAnswer(doujinId, commentId, answerId);
    }
}
