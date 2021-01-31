import { v4 as uuid } from 'uuid';

export default class Answer {
    constructor(
        public answerId: string,
        public userId: string,
        public timestamp: Date,
        public text: string,
    ) {}

    static from(text: string, userId: string) {
        return new Answer(uuid(), userId, new Date(), text);
    }

    public toJson() {
        return {
            answerId: this.answerId,
            userId: this.userId,
            timestamp: this.timestamp,
            text: this.text,
        };
    }
}
