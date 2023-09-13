import { Request, Response } from 'express';
import * as cardService from '../services/cardService';
import { validateIntegerParam } from '../utils/validateIntegerParam';

export const createCard = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const card = req.body;

    await cardService.createCard(user, card);
    res.status(201).send({ type: 'created', statusCode: 201, message: 'card created successfully' });
};

export const getCardById = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const cardId = +req.params.id;
    validateIntegerParam(cardId);

    const card = await cardService.getCardById(user.id, cardId);
    res.send(card);
};

export const getCards = async (req: Request, res: Response) => {
    const { user } = res.locals;

    const cards = await cardService.getCards(user.id);
    res.send(cards);
};

export const deleteCard = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const cardId = +req.params.id;
    validateIntegerParam(cardId);

    await cardService.deleteCard(user.id, cardId);
    res.sendStatus(204);
};
