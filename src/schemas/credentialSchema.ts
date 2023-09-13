import Joi from 'joi';
import { CreateCredentialData } from '../types/credentialTypes';

const credentialSchema = Joi.object<CreateCredentialData>({
    title: Joi.string().min(1).max(50).required(),
    url: Joi.string().uri().required(),
    username: Joi.string().min(1).max(25).required(),
    password: Joi.string().required(),
});

export default credentialSchema;
