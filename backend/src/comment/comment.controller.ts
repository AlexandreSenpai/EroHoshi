import {
    Controller,
    Delete,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import Answer from './answer';
import { Comment } from './comment';
import { CommentProvider } from './comment-provider';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpBodyComment } from './comment.interface';

@Controller('comment')
export class CommentController {
    constructor(private provider: CommentProvider) {}

    @Post()
    async postComment(
        @Req() req: Request<any, any, HttpBodyComment>,
    ): Promise<Comment> {
        return this.provider.save(
            req.body.doujinId,
            Comment.from(req.body, req.body.userId),
        );
    }

    @Post(':commentId')
    async postAnswer(
        @Param('commentId') commentId: string,
        @Req() req: Request<any, any, HttpBodyComment>,
    ): Promise<Answer> {
        return await this.provider.saveAnswer(
            req.body.doujinId,
            commentId,
            Answer.from(req.body.text, req.body.userId),
        );
    }

    @Delete(':doujinId/:commentId')
    async deleteComment(
        @Param('doujinId') doujinId: string,
        @Param('commentId') commentId: string,
        @Req() req: Request<any, any, HttpBodyComment>,
    ) {
        try {
            await this.provider.delete(doujinId, commentId, req.body.userId);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':doujinId/:commentId/:answerId')
    async deleteAnswer(
        @Param('doujinId') doujinId: string,
        @Param('commentId') commentId: string,
        @Param('answerId') answerId: string,
        @Req() req: Request<any, any, HttpBodyComment>,
    ) {
        try {
            await this.provider.deleteAnswer(
                doujinId,
                commentId,
                answerId,
                req.body.userId,
            );
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}
