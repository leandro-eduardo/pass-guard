import { Router } from 'express';
import authRouter from './authRouter';
import cardsRouter from './cardsRouter';
import credentialsRouter from './credentialsRouter';
import networksRouter from './networksRouters';
import safeNotesRouter from './safeNotesRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/credentials', credentialsRouter);
router.use('/safe-notes', safeNotesRouter);
router.use('/cards', cardsRouter);
router.use('/networks', networksRouter);

export default router;
