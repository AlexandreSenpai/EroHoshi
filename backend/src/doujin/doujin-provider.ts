import { Injectable } from '@nestjs/common';
import { IDoujin } from './doujin.interface';
import * as admin from 'firebase-admin';
import { SummaryCounter } from 'src/summary/summary.interface';
import * as pnormaldist from 'pnormaldist';

@Injectable()
export class DoujinProvider {
    private scoreCalc(pos: number, n: number, confidence: number): number {
        if (n === 0) return 0;

        const z = pnormaldist(1 - (1 - confidence) / 2);

        const phat = (1.0 * pos) / n;

        return (
            (phat +
                (z * z) / (2 * n) -
                z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * n)) / n)) /
            (1 + (z * z) / n)
        );
    }

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

        let doujin = await this.findById(randomId.toString());

        while (!doujin) {
            randomId = Math.floor(
                Math.random() * summaryCounter.max_id,
            ).toString();
            doujin = await this.findById(randomId);
        }

        this.incrementDoujinViews(randomId);

        return doujin;
    }

    async likeDoujin(
        doujinId: string,
        uid: string,
    ): Promise<{ score: number; reactors: string[] }> {
        const ref = admin.firestore().collection('doujins').doc(doujinId);

        const doc = await ref.get();

        if (!doc.exists) {
            return undefined;
        }

        const doujin = doc.data() as IDoujin;

        const [likes, dislikes] = [
            doujin.likes.length + 1,
            doujin.dislikes.length,
        ];
        if (doujin.likes.indexOf(uid) !== -1) {
            return;
        }

        ref.update({
            likes: [...doujin.likes, uid],
            score: +(
                this.scoreCalc(likes, likes + dislikes, 0.97) * 10
            ).toFixed(1),
            dislikes:
                doujin.dislikes.indexOf(uid) !== -1
                    ? doujin.dislikes.filter((item) => item !== uid)
                    : doujin.dislikes,
        });

        return {
            score: +(
                this.scoreCalc(likes, likes + dislikes, 0.97) * 10
            ).toFixed(1),
            reactors: [...doujin.likes, uid],
        };
    }

    async dislikeDoujin(
        doujinId: string,
        uid: string,
    ): Promise<{ score: number; reactors: string[] }> {
        const ref = admin.firestore().collection('doujins').doc(doujinId);

        const doc = await ref.get();

        if (!doc.exists) {
            return undefined;
        }

        const doujin = doc.data() as IDoujin;

        const [likes, dislikes] = [
            doujin.likes.length,
            doujin.dislikes.length + 1,
        ];

        if (doujin.dislikes.indexOf(uid) !== -1) {
            return;
        }

        ref.update({
            likes:
                doujin.likes.indexOf(uid) !== -1
                    ? doujin.likes.filter((item) => item !== uid)
                    : doujin.likes,
            score: +(
                this.scoreCalc(likes, likes + dislikes, 0.97) * 10
            ).toFixed(1),
            dislikes: [...doujin.dislikes, uid],
        });

        return {
            score: +(
                this.scoreCalc(likes, likes + dislikes, 0.97) * 10
            ).toFixed(1),
            reactors: [...doujin.dislikes, uid],
        };
    }

    async findAllOrderBy(
        lastId?: string,
        field = 'score',
        limit = 18,
    ): Promise<IDoujin[]> {
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

        return res.docs.map((doc) => doc.data() as IDoujin);
    }

    async findAllByTag(
        tags: string[],
        lastId?: string,
        sort = 'recent',
    ): Promise<IDoujin[]> {
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
                .collection('doujins')
                .doc(lastId)
                .get();

            res = await ref.startAt(lastDoujin).limit(20).get();
        }

        return res.docs.map((doc) => doc.data() as IDoujin);
    }
}
