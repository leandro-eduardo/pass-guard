import { CreateSafeNoteData } from '../types/safeNoteTypes';
import { User } from '@prisma/client';
import { conflictError, noDataFound, notFoundError } from '../utils/errors';
import * as safeNoteRepository from '../repositories/safeNoteRepository';
import { formatTimestamp } from '../utils/formatTimestamp';

export const createSafeNote = async (user: User, safeNote: CreateSafeNoteData) => {
    const existingSafeNote = await safeNoteRepository.findByTitleAndUserId(user.id, safeNote.title);
    if (existingSafeNote) throw conflictError('this safe note is already registered for this user');

    await safeNoteRepository.createSafeNote(user.id, safeNote);
};

export const getSafeNoteById = async (userId: number, safeNoteId: number) => {
    const safeNote = await safeNoteRepository.getSafeNoteById(userId, safeNoteId);
    if (!safeNote) throw notFoundError('safe note not found');

    const { createdAt } = safeNote;
    return {
        ...safeNote,
        createdAt: formatTimestamp(createdAt),
    };
};

export const getSafeNotes = async (userId: number) => {
    const safeNotes = await safeNoteRepository.getSafeNotes(userId);

    if (safeNotes.length === 0) throw noDataFound('no data was found');

    return safeNotes.map((safeNote) => {
        const { createdAt } = safeNote;
        return {
            ...safeNote,
            createdAt: formatTimestamp(createdAt),
        };
    });
};

export const deleteSafeNote = async (userId: number, safeNoteId: number) => {
    await getSafeNoteById(userId, safeNoteId);
    await safeNoteRepository.deleteSafeNote(safeNoteId);
};
