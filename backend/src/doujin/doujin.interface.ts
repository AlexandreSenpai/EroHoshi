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
}

export interface DoujinQuery {
  id: string;
}

export interface DoujinSearchQuery {
  q: string;
  page: number;
  sort: string;
}

export interface SummaryCounter {
  doujins: number;
  max_id: number;
}

export interface HttpLike {
  doujinId: string;
  uid: string;
}

export interface HttpTotalDoujins {
  total_doujins: string;
}

export interface SimplifiedDoujin {
  id: string;
  title: string;
  lang: string;
  cover: string;
}

export interface HttpSimplifiedDoujins {
  doujins: SimplifiedDoujin[];
}

export interface HttpDoujinPage {
  doujins: SimplifiedDoujin[];
  total_pages: number;
  total_results: number;
  sort: string;
}
