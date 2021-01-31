import { HttpBodyComment } from './comment.interface';
import { v4 as uuid } from 'uuid';
import Answer from './answer';

export class Comment {
    constructor(
        public commentId: string,
        public userId: string,
        public timestamp: Date,
        public text: string,
        public answers: Answer[],
    ) {}

    static from(raw: HttpBodyComment, userId: string, answers: Answer[] = []) {
        return new Comment(uuid(), userId, new Date(), raw.text, answers);
    }

    public toJson() {
        return {
            commentId: this.commentId,
            userId: this.userId,
            timestamp: this.timestamp,
            text: this.text,
            answers: this.answers.map((answer) => answer.toJson()),
        };
    }
}
