import { IDoujin } from './doujin.interface';

export class Doujin {
    constructor(
        public artists: string[],
        public categories: string[],
        public characters: string[],
        public created_date: string,
        public dislikes: string[],
        public groups: string[],
        public id: number,
        public images: string[],
        public languages: string[],
        public likes: string[],
        public parodies: string[],
        public score: number,
        public secondary_title: string,
        public source_id: number,
        public source_title: string,
        public tags: string[],
        public tags_to_search: string[],
        public title: string,
        public total_pages: number,
        public views: number,
        public comments: Comment[],
        public thumb: string,
        public language: string,
    ) {}

    static from(raw: IDoujin) {
        return new Doujin(
            raw.artists,
            raw.categories,
            raw.characters,
            raw.created_date.toDate().toLocaleDateString(),
            raw.dislikes,
            raw.groups,
            raw.id,
            raw.images,
            raw.languages,
            raw.likes,
            raw.parodies,
            raw.score,
            raw.secondary_title,
            raw.source_id,
            raw.source_title,
            raw.tags,
            raw.tags_to_search,
            raw.title,
            raw.total_pages,
            raw.views,
            raw.comments,
            raw.thumb,
            raw.language,
        );
    }
}
