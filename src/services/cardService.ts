import { CreateCardData } from '../types/cardTypes';
import { User } from '@prisma/client';
import { conflictError, noDataFound, notFoundError } from '../utils/errors';
import * as cardRepository from '../repositories/cardRepository';
import { decrypt, encrypt } from '../utils/cryptr';
import { formatTimestamp } from '../utils/formatTimestamp';

export const createCard = async (user: User, card: CreateCardData) => {
    const existingCard = await cardRepository.findCardByTitleAndUserId(user.id, card.title);
    if (existingCard) throw conflictError('this card is already registered for this user');

    const { securityCode, password } = card;
    const cardData = {
        ...card,
        securityCode: encrypt(securityCode),
        password: encrypt(password),
    };

    await cardRepository.createCard(user.id, cardData);
};

export const getCardById = async (userId: number, cardId: number) => {
    const card = await cardRepository.getCardById(userId, cardId);
    if (!card) throw notFoundError('card not found');

    const { securityCode, password, createdAt } = card;
    return {
        ...card,
        securityCode: decrypt(securityCode),
        password: decrypt(password),
        createdAt: formatTimestamp(createdAt),
    };
};

export const getCards = async (userId: number) => {
    const cards = await cardRepository.getCards(userId);

    if (cards.length === 0) throw noDataFound('no data was found');

    return cards.map((card) => {
        const { securityCode, password, createdAt } = card;
        return {
            ...card,
            securityCode: decrypt(securityCode),
            password: decrypt(password),
            createdAt: formatTimestamp(createdAt),
        };
    });
};

export const deleteCard = async (userId: number, cardId: number) => {
    await getCardById(userId, cardId);
    await cardRepository.deleteCard(cardId);
};
