import prisma from '../database/db';
import { CreateSafeNoteData } from '../types/safeNoteTypes';

export const createSafeNote = async (userId: number, safeNote: CreateSafeNoteData) => {
    return prisma.safeNote.create({
        data: { ...safeNote, userId },
    });
};

export const findByTitleAndUserId = async (userId: number, title: string) => {
    return prisma.safeNote.findUnique({
        where: { title_userId: { title, userId } },
    });
};

export const getSafeNoteById = async (userId: number, safeNoteId: number) => {
    return prisma.safeNote.findFirst({
        where: { id: safeNoteId, userId },
        select: {
            id: true,
            title: true,
            annotation: true,
            createdAt: true,
        },
    });
};

export const getSafeNotes = async (userId: number) => {
    return prisma.safeNote.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            annotation: true,
            createdAt: true,
        },
    });
};

export const deleteSafeNote = async (id: number) => {
    return prisma.safeNote.delete({
        where: { id },
    });
};
