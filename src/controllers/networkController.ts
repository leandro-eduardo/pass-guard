import { Request, Response } from 'express';
import * as networkService from '../services/networkService';
import { validateIntegerParam } from '../utils/validateIntegerParam';

export const createNetwork = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const network = req.body;

    await networkService.createNetwork(user, network);
    res.status(201).send({ type: 'created', statusCode: 201, message: 'network created successfully' });
};

export const getNetworkById = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const networkId = +req.params.id;
    validateIntegerParam(networkId);

    const network = await networkService.getNetworkById(user.id, networkId);
    res.send(network);
};

export const getNetworks = async (req: Request, res: Response) => {
    const { user } = res.locals;

    const networks = await networkService.getNetworks(user.id);
    res.send(networks);
};

export const deleteNetwork = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const networkId = +req.params.id;
    validateIntegerParam(networkId);

    await networkService.deleteNetwork(user.id, networkId);
    res.sendStatus(204);
};
