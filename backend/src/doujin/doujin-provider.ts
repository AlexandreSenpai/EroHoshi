import { Injectable } from '@nestjs/common';
import { IDoujin, SimplifiedDoujin } from './doujin.interface';
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
            doujin.dislikes.length,
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
        field = 'score',
        limit = 18,
    ): Promise<SimplifiedDoujin[]> {
        let res: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = undefined;

        const ref = admin
            .firestore()
            .collection('doujins')
            .orderBy(field, 'desc');

        if (!lastId) {
            res = await ref.limit(limit).get();
        } else {
            const lastDoujin = await admin
                .firestore()
                .collection('doujins')
                .doc(lastId)
                .get();

            res = await ref.startAt(lastDoujin).limit(limit).get();
        }

        return res.docs.map((doc) => {
            const data = doc.data() as IDoujin;

            return {
                id: data.id.toString(),
                title: data.title,
                lang: data.language ? data.language : data.languages[0],
                cover: data.thumb ? data.thumb : data.images[0],
            };
        }) as SimplifiedDoujin[];
    }

    async findAllByTag(
        query: string,
        lastId?: string,
        sort = 'recent',
    ): Promise<SimplifiedDoujin[]> {
        const tags = query.split(' ');

        let res: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = undefined;

        const sortOpt = {
            recent: 'created_date',
            popular: 'score',
        };

        const ref = admin
            .firestore()
            .collection('doujins')
            .where('tags_to_search', 'array-contains-any', tags)
            .orderBy(sortOpt[sort], 'desc');

        if (!lastId) {
            res = await ref.limit(20).get();
        } else {
            const lastDoujin = await admin
                .firestore()
                .collection('doujin')
                .doc(lastId)
                .get();

            res = await ref.startAt(lastDoujin).limit(20).get();
        }

        return res.docs.map((doc) => {
            const data = doc.data() as IDoujin;

            return {
                id: data.id.toString(),
                title: data.title,
                lang: data.language ? data.language : data.languages[0],
                cover: data.thumb ? data.thumb : data.images[0],
            };
        }) as SimplifiedDoujin[];
    }
}
