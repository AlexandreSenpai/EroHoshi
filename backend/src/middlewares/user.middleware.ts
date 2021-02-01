import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const auth = req.headers.authorization;

        if (!auth) {
            throw new HttpException(
                'Authorization header required',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const [schema, token] = auth.split(' ');

        if (!schema || schema !== 'Bearer') {
            throw new HttpException(
                'You must provide a valid authorization schema',
                HttpStatus.UNAUTHORIZED,
            );
        }

        if (!token) {
            throw new HttpException(
                'Bearer token must be not null',
                HttpStatus.UNAUTHORIZED,
            );
        }

        try {
            const decodedIdToken = await admin.auth().verifyIdToken(token);
            req.body.userId = decodedIdToken.uid;
            next();
        } catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}
