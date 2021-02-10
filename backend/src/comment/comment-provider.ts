import { Injectable } from '@nestjs/common';
import { Comment } from './comment';
import * as admin from 'firebase-admin';
import Answer from './answer';

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

    async saveAnswer(
        doujinId: string,
        commentId: string,
        answer: Answer,
    ): Promise<Answer> {
        const comments = await admin
            .firestore()
            .collection('doujins')
            .doc(doujinId)
            .get()
            .then((doc) => doc.data().comments);

        const updatedComments = comments.map((comment: any) => {
            if (comment.commentId === commentId) {
                if (!comment.answers) {
                    comment.answers = [];
                }
                comment.answers.push(answer.toJson());
            }

            return comment;
        });

        await admin.firestore().collection('doujins').doc(doujinId).update({
            comments: updatedComments,
        });

        return answer;
    }

    async delete(doujinId: string, commentid: string, userId: string) {
        const comments = (await admin
            .firestore()
            .collection('doujins')
            .doc(doujinId)
            .get()
            .then((doc) => doc.data().comments)) as Comment[];

        const comment = comments
            .filter(
                (item) =>
                    item.commentId === commentid && item.userId === userId,
            )
            .pop();

        if (comment) {
            admin
                .firestore()
                .collection('doujins')
                .doc(doujinId)
                .update({
                    comments: admin.firestore.FieldValue.arrayRemove(comment),
                });
        } else {
            throw new Error(
                'This comment did not exists or you do not have the neccessary permissions to delete it',
            );
        }
    }

    async deleteAnswer(
        doujinId: string,
        commentId: string,
        answerId: string,
        userId: string,
    ) {
        const comments = (await admin
            .firestore()
            .collection('doujins')
            .doc(doujinId)
            .get()
            .then((doc) => doc.data().comments)) as Comment[];

        const updatedComments = comments.map((comment) => {
            if (comment.commentId === commentId) {
                const beforeLenght = comment.answers.length;

                comment.answers = comment.answers.filter(
                    (answer) =>
                        !(
                            answer.answerId === answerId &&
                            answer.userId === userId
                        ),
                );

                const afterLenght = comment.answers.length;

                if (beforeLenght === afterLenght) {
                    throw new Error(
                        'This answer did not exists or you do not have the neccessary permissions to delete it',
                    );
                }
            }
            return comment;
        });

        await admin.firestore().collection('doujins').doc(doujinId).update({
            comments: updatedComments,
        });
    }
}
