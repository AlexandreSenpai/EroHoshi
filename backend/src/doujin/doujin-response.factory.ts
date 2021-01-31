import { IDoujin, DoujinResponse } from './doujin.interface';

export class DoujinResponseImpl implements DoujinResponse {
    constructor(
        public id: string,
        public title: string,
        public lang: string,
        public cover: string,
    ) {}

    static from(raw: IDoujin) {
        return new DoujinResponseImpl(
            raw.id.toString(),
            raw.title,
            raw.language ? raw.language : raw.languages[0],
            raw.thumb ? raw.thumb : raw.images[0],
        );
    }
}
