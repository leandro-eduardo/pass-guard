import { Router } from 'express';
import * as cardController from '../controllers/cardController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { schemaValidator } from '../middlewares/schemaValidator';
import cardSchema from '../schemas/cardSchema';

const cardsRouter = Router();

cardsRouter.use('/', ensureAuthenticated);

cardsRouter.post('/', schemaValidator(cardSchema), cardController.createCard);
cardsRouter.get('/:id', cardController.getCardById);
cardsRouter.get('/', cardController.getCards);
cardsRouter.delete('/:id', cardController.deleteCard);

export default cardsRouter;
