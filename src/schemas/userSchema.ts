import Joi from 'joi';
import { CreateUserData } from '../types/userTypes';

const userSchema = Joi.object<CreateUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});

export default userSchema;
