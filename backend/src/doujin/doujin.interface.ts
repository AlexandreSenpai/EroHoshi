import * as admin from 'firebase-admin';

export interface IDoujin {
    artists: string[];
    categories: string[];
    characters: string[];
    created_date: admin.firestore.Timestamp;
    dislikes: string[];
    groups: string[];
    id: number;
    images: string[];
    languages: string[];
    likes: string[];
    parodies: string[];
    score: number;
    secondary_title: string;
    source_id: number;
    source_title: string;
    tags: string[];
    tags_to_search: string[];
    title: string;
    total_pages: number;
    views: number;
    comments: Comment[];
    thumb: string;
    language: string;
}

export interface HttpLike {
    doujinId: string;
    userId: string;
}

export interface ReactionResponse {
    score: number;
    reactors: string[];
}

export interface DoujinResponse {
    id: string;
    title: string;
    lang: string;
    cover: string;
}
