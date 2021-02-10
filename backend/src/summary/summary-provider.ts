import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { HttpTotalDoujins } from './summary.interface';

@Injectable()
export class SummaryProvider {
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
}
