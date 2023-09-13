import Joi from 'joi';
import { CreateSafeNoteData } from '../types/safeNoteTypes';

const safeNoteSchema = Joi.object<CreateSafeNoteData>({
    title: Joi.string().min(1).max(50).required(),
    annotation: Joi.string().min(1).max(1000).required(),
});

export default safeNoteSchema;
