import { Router } from 'express';
import * as networkController from '../controllers/networkController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { schemaValidator } from '../middlewares/schemaValidator';
import networkSchema from '../schemas/networkSchema';

const networksRouter = Router();

networksRouter.use('/', ensureAuthenticated);

networksRouter.post('/', schemaValidator(networkSchema), networkController.createNetwork);
networksRouter.get('/:id', networkController.getNetworkById);
networksRouter.get('/', networkController.getNetworks);
networksRouter.delete('/:id', networkController.deleteNetwork);

export default networksRouter;
