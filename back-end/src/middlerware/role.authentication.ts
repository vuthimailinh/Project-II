
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ITokenWithRole, JwtPayLoad } from '../utils/auth.interface';
import { ErrorResponse } from '../utils/errorResponse';
import UserModel from '../models/User.model';
import userServices from '../services/User.services';

export function authenticateRole(req: Request<any, any, any>, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({
            message: 'Un-verified',
        });
    console.log('Token: ' + token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', async (err: any, payload: JwtPayLoad | any) => {
        if (err) {
            console.log(err);
            return res.status(403).json({
                message: 'Un-verified',
            });
        }
        const role = await userServices.extractUserRole(payload._id);

        if (role !== 'admin' && role !== 'staff') {
            return res.status(403).json({
                message: 'Access denied',
            });
        }
        req.user = payload;
        req.body.userId = payload._id;
        next();
    });
}
