import { unprocessableEntityError } from './errors';

export const validateIntegerParam = (value: number) => {
    if (isNaN(value)) throw unprocessableEntityError('id param must be a number');
};
