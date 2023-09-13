import { Router } from 'express';
import * as credentialController from '../controllers/credentialController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { schemaValidator } from '../middlewares/schemaValidator';
import credentialSchema from '../schemas/credentialSchema';

const credentialsRouter = Router();

credentialsRouter.use('/', ensureAuthenticated);

credentialsRouter.post('/', schemaValidator(credentialSchema), credentialController.createCredential);
credentialsRouter.get('/:id', credentialController.getCredentialById);
credentialsRouter.get('/', credentialController.getCredentials);
credentialsRouter.delete('/:id', credentialController.deleteCredential);

export default credentialsRouter;
