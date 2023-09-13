import { Router } from 'express';
import * as authController from '../controllers/authController';
import { schemaValidator } from '../middlewares/schemaValidator';
import userSchema from '../schemas/userSchema';

const authRouter = Router();

authRouter.post('/sign-up', schemaValidator(userSchema), authController.signUp);
authRouter.post('/sign-in', schemaValidator(userSchema), authController.signIn);

export default authRouter;
