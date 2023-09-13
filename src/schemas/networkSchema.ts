import Joi from 'joi';
import { CreateNetworkData } from '../types/networkTypes';

const networkSchema = Joi.object<CreateNetworkData>({
    title: Joi.string().min(1).max(50).required(),
    name: Joi.string().min(1).max(50).required(),
    password: Joi.string().required(),
});

export default networkSchema;
