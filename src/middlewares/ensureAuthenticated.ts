import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';
import { notAuthenticatedError, unauthorizedError } from '../utils/errors';

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw notAuthenticatedError('missing token');

  const tokenParts = authorization.split(' ');

  const [scheme, token] = tokenParts;

  if (!/^Bearer$/i.test(scheme) || tokenParts.length !== 2) throw notAuthenticatedError('token malformed');

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await userService.findUserById(userId);
    res.locals.user = user;
    next();
  } catch (error: any) {
    throw unauthorizedError(error.expiredAt ? 'expired token' : 'invalid token');
  }
}
