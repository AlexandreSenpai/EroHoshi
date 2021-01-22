import { Injectable } from '@nestjs/common';
import { Comment } from './comment';
import * as admin from 'firebase-admin';

@Injectable()
export class CommentProvider {
    async save(doujinId: string, comment: Comment): Promise<Comment> {
        await admin
            .firestore()
            .collection('doujins')
            .doc(doujinId)
            .update({
                comments: admin.firestore.FieldValue.arrayUnion(
                    comment.toJson(),
                ),
            });
        return comment;
    }

    async delete(doujinId: string, commentid: string) {
        const comments = (await admin
            .firestore()
            .collection('doujins')
            .doc(doujinId)
            .get()
            .then((doc) => doc.data().comments)) as Comment[];

        const comment = comments
            .filter((item) => item.commentId === commentid)
            .pop();

        if (comment) {
            admin
                .firestore()
                .collection('doujins')
                .doc(doujinId)
                .update({
                    comments: admin.firestore.FieldValue.arrayRemove(comment),
                });
        }
    }
}
