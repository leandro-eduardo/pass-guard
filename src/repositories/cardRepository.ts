import prisma from '../database/db';
import { CreateCardData } from '../types/cardTypes';

export const createCard = async (userId: number, card: CreateCardData) => {
    return prisma.card.create({
        data: { ...card, userId },
    });
};

export const findCardByTitleAndUserId = async (userId: number, title: string) => {
    return prisma.card.findUnique({
        where: { title_userId: { title, userId } },
    });
};

export const getCardById = async (userId: number, cardId: number) => {
    return prisma.card.findFirst({
        where: { id: cardId, userId },
        select: {
            id: true,
            title: true,
            number: true,
            cardHolderName: true,
            securityCode: true,
            expirationDate: true,
            password: true,
            isVirtual: true,
            type: true,
            createdAt: true,
        },
    });
};

export const getCards = async (userId: number) => {
    return prisma.card.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            number: true,
            cardHolderName: true,
            securityCode: true,
            expirationDate: true,
            password: true,
            isVirtual: true,
            type: true,
            createdAt: true,
        },
    });
};

export const deleteCard = async (id: number) => {
    return prisma.card.delete({
        where: { id },
    });
};
