import { Request, Response, NextFunction } from 'express';
import { AppError, errorTypeToStatusCode, isAppError } from '../utils/errors';

export default function errorsHandler(error: AppError, req: Request, res: Response, next: NextFunction) {
  console.log(`Oops! An error occurred...`, error);

  if (isAppError(error)) {
    const statusCode = errorTypeToStatusCode(error.type);
    return res.status(statusCode).send({ type: error.type, statusCode, message: error.message });
  }

  res.sendStatus(500);
}
