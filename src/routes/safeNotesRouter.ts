import { Router } from 'express';
import * as safeNoteController from '../controllers/safeNoteController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { schemaValidator } from '../middlewares/schemaValidator';
import safeNoteSchema from '../schemas/safeNoteSchema';

const safeNotesRouter = Router();

safeNotesRouter.use('/', ensureAuthenticated);

safeNotesRouter.post('/', schemaValidator(safeNoteSchema), safeNoteController.createSafeNote);
safeNotesRouter.get('/:id', safeNoteController.getSafeNoteById);
safeNotesRouter.get('/', safeNoteController.getSafeNotes);
safeNotesRouter.delete('/:id', safeNoteController.deleteSafeNote);

export default safeNotesRouter;
