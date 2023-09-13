type AppErrorTypes =
  | 'conflict'
  | 'not_found'
  | 'unauthorized'
  | 'not_authenticated'
  | 'unprocessable_entity'
  | 'no_data_found';

export interface AppError {
  type: AppErrorTypes;
  message: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  const errorTypes = {
    unprocessable_entity: 422,
    conflict: 409,
    not_found: 404,
    unauthorized: 401,
    not_authenticated: 401,
    no_data_found: 200,
  };

  return errorTypes[type] || 400;
}

export function unprocessableEntityError(message: string): AppError {
  return { type: 'unprocessable_entity', message };
}

export function conflictError(message: string): AppError {
  return { type: 'conflict', message };
}

export function notFoundError(message: string): AppError {
  return { type: 'not_found', message };
}

export function unauthorizedError(message: string): AppError {
  return { type: 'unauthorized', message };
}

export function notAuthenticatedError(message: string): AppError {
  return { type: 'not_authenticated', message };
}

export function noDataFound(message: string): AppError {
  return { type: 'no_data_found', message };
}
