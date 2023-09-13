import Joi from 'joi';
import { CreateCardData } from '../types/cardTypes';

const cardSchema = Joi.object<CreateCardData>({
    title: Joi.string().min(1).max(50).required(),
    number: Joi.string().length(16).required(),
    cardHolderName: Joi.string().required(),
    securityCode: Joi.string().pattern(/\d{3}/).length(3).required().messages({
        'string.pattern.base': 'securityCode must be 3 numbers',
    }),
    expirationDate: Joi.string()
        .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
        .length(5)
        .required()
        .messages({
            'string.pattern.base': 'expirationDate format must be MM/YY',
        }),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid('credit', 'debit', 'credit_debit').required(),
});

export default cardSchema;
