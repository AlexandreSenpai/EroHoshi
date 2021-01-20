import { Injectable } from '@nestjs/common';
import {
  HttpDoujinPage,
  HttpTotalDoujins,
  IDoujin,
  SimplifiedDoujin,
  SummaryCounter,
} from './doujin.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class DoujinProvider {
  private incrementDoujinViews(doujinId: string) {
    admin
      .firestore()
      .collection('doujins')
      .doc(doujinId)
      .update({
        views: admin.firestore.FieldValue.increment(1),
      });
  }

  async getDoujin(id: string): Promise<IDoujin> {
    const ref = admin.firestore().collection('doujins').doc(id);

    const doujin = (await ref.get().then((res) => res.data())) as IDoujin;

    this.incrementDoujinViews(id);

    return doujin;
  }

  async getRandom(): Promise<IDoujin> {
    const ref = admin.firestore().collection('summary').doc('counters');

    const summaryCounter = (await ref
      .get()
      .then((res) => res.data())) as SummaryCounter;

    let randomId = Math.floor(Math.random() * summaryCounter.doujins);

    let doc = await admin
      .firestore()
      .collection('doujins')
      .doc(randomId.toString())
      .get();

    while (!doc.exists) {
      randomId = Math.floor(Math.random() * summaryCounter.doujins);
      doc = await admin
        .firestore()
        .collection('doujins')
        .doc(randomId.toString())
        .get();
    }

    this.incrementDoujinViews(randomId.toString());

    return doc.data() as IDoujin;
  }

  async likeDoujin(doujinId: string, uid: string) {
    const ref = admin.firestore().collection('doujins').doc(doujinId);

    const doujin = (await ref.get().then((doc) => doc.data())) as IDoujin;

    const [likes, dislikes] = [doujin.likes.length + 1, doujin.likes.length];

    if (doujin.likes.indexOf(uid) !== -1) {
      return;
    }

    ref.update({
      likes: [...doujin.likes, uid],
      score: Math.ceil((likes * 100) / (likes + dislikes)),
    });
  }

  async getTotalDoujins(): Promise<HttpTotalDoujins> {
    const doc = await admin
      .firestore()
      .collection('summary')
      .doc('counters')
      .get();

    return {
      total_doujins: doc.data().doujins,
    };
  }

  async getNewestDoujins(lastId?: number): Promise<SimplifiedDoujin[]> {
    if (!lastId) {
      const maxIdDoc = await admin
        .firestore()
        .collection('summary')
        .doc('counters')
        .get();

      lastId = maxIdDoc.data().max_id;
    }

    const ref = await admin
      .firestore()
      .collection('doujins')
      .orderBy('id', 'desc')
      .startAt(lastId)
      .limit(18)
      .get();

    return ref.docs.map((doc) => {
      const data = doc.data();

      return {
        id: data.id,
        title: data.title,
        lang: data.language ? data.language : data.languages[0],
        cover: data.images[0],
      };
    }) as SimplifiedDoujin[];
  }

  async getPopularDoujins(): Promise<SimplifiedDoujin[]> {
    const ref = await admin
      .firestore()
      .collection('doujins')
      .orderBy('views', 'desc')
      .limit(5)
      .get();

    return ref.docs.map((doc) => {
      const data = doc.data();

      return {
        id: data.id,
        title: data.title,
        lang: data.language ? data.language : data.languages[0],
        cover: data.images[0],
      };
    });
  }

  async searchDoujin(
    query: string,
    page = 1,
    sort = 'recent',
  ): Promise<HttpDoujinPage> {
    const tags = query.split(' ');

    const sortOpt = {
      recent: 'created_date',
      popular: 'score',
    };

    const startAfter = page * 20;
    const startAt = page > 1 ? startAfter - 20 : 0;

    const ref = await admin
      .firestore()
      .collection('doujins')
      .where('tags_to_search', 'array-contains-any', tags)
      .orderBy(sortOpt[sort], 'desc')
      .get();

    const doujins = ref.docs.slice(startAt, startAfter).map((doc) => {
      const data = doc.data();

      return {
        id: data.id,
        title: data.title,
        lang: data.language ? data.language : data.languages[0],
        cover: data.images[0],
      };
    });

    return {
      doujins,
      total_pages: Math.ceil(ref.docs.length / 20),
      total_results: ref.docs.length,
      sort: sort,
    };
  }
}
