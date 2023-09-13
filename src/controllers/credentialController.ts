import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService';
import { validateIntegerParam } from '../utils/validateIntegerParam';

export const createCredential = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const credential = req.body;

    await credentialService.createCredential(user, credential);
    res.status(201).send({ type: 'created', statusCode: 201, message: 'credential created successfully' });
};

export const getCredentialById = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const credentialId = +req.params.id;
    validateIntegerParam(credentialId);

    const credential = await credentialService.getCredentialById(user.id, credentialId);
    res.send(credential);
};

export const getCredentials = async (req: Request, res: Response) => {
    const { user } = res.locals;

    const credentials = await credentialService.getCredentials(user.id);
    res.send(credentials);
};

export const deleteCredential = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const credentialId = +req.params.id;
    validateIntegerParam(credentialId);

    await credentialService.deleteCredential(user.id, credentialId);
    res.sendStatus(204);
};
