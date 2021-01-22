import { HttpBodyComment } from './comment.interface';
import { v4 as uuid } from 'uuid';

export class Comment {
    constructor(
        public commentId: string,
        public userId: string,
        public timestamp: Date,
        public text: string,
    ) {}

    static from(raw: HttpBodyComment, userId: string) {
        return new Comment(uuid(), userId, new Date(), raw.text);
    }

    public toJson() {
        return {
            commentId: this.commentId,
            userId: this.userId,
            timestamp: this.timestamp,
            text: this.text,
        };
    }
}
