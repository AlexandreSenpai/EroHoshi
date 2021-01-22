import { Injectable } from '@nestjs/common';
import { HttpDoujinPage, IDoujin, SimplifiedDoujin } from './doujin.interface';
import * as admin from 'firebase-admin';
import { SummaryCounter } from 'src/summary/summary.interface';

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

    async findById(id: string): Promise<IDoujin> {
        const ref = admin.firestore().collection('doujins').doc(id);

        const doujin = (await ref.get().then((res) => res.data())) as IDoujin;

        this.incrementDoujinViews(id);

        return doujin;
    }

    async findRandom(): Promise<IDoujin> {
        const ref = admin.firestore().collection('summary').doc('counters');

        const summaryCounter = (await ref
            .get()
            .then((res) => res.data())) as SummaryCounter;

        let randomId = Math.floor(
            Math.random() * summaryCounter.max_id,
        ).toString();

        let doujin = this.findById(randomId.toString());

        while (!doujin) {
            randomId = Math.floor(
                Math.random() * summaryCounter.max_id,
            ).toString();
            doujin = this.findById(randomId);
        }

        this.incrementDoujinViews(randomId);

        return doujin;
    }

    async likeDoujin(doujinId: string, uid: string) {
        const ref = admin.firestore().collection('doujins').doc(doujinId);

        const doujin = (await ref.get().then((doc) => doc.data())) as IDoujin;

        const [likes, dislikes] = [
            doujin.likes.length + 1,
            doujin.likes.length,
        ];
        if (doujin.likes.indexOf(uid) !== -1) {
            return;
        }

        ref.update({
            likes: [...doujin.likes, uid],
            score: Math.ceil((likes * 100) / (likes + dislikes)),
            dislikes:
                doujin.dislikes.indexOf(uid) !== -1
                    ? doujin.dislikes.filter((item) => item !== uid)
                    : doujin.dislikes,
        });
    }

    async findAllOrderBy(
        lastId?: string,
        field = 'id',
        sort: 'asc' | 'desc' = 'desc',
        limit = 18,
    ): Promise<SimplifiedDoujin[]> {
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
            .orderBy(field, sort)
            .startAt(parseInt(lastId))
            .limit(limit)
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

    async findAllByTag(
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