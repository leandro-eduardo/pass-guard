import { Request, Response } from 'express';
import * as safeNoteService from '../services/safeNoteService';
import { validateIntegerParam } from '../utils/validateIntegerParam';

export const createSafeNote = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const safeNote = req.body;

    await safeNoteService.createSafeNote(user, safeNote);
    res.status(201).send({ type: 'created', statusCode: 201, message: 'safe note created successfully' });
};

export const getSafeNoteById = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const sateNoteId = +req.params.id;
    validateIntegerParam(sateNoteId);

    const safeNote = await safeNoteService.getSafeNoteById(user.id, sateNoteId);
    res.send(safeNote);
};

export const getSafeNotes = async (req: Request, res: Response) => {
    const { user } = res.locals;

    const sateNotes = await safeNoteService.getSafeNotes(user.id);
    res.send(sateNotes);
};

export const deleteSafeNote = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const safeNoteId = +req.params.id;
    validateIntegerParam(safeNoteId);

    await safeNoteService.deleteSafeNote(user.id, safeNoteId);
    res.sendStatus(204);
};
