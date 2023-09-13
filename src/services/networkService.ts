import { CreateNetworkData } from '../types/networkTypes';
import { User } from '@prisma/client';
import { noDataFound, notFoundError } from '../utils/errors';
import * as networkRepository from '../repositories/networkRepository';
import { decrypt, encrypt } from '../utils/cryptr';
import { formatTimestamp } from '../utils/formatTimestamp';

export const createNetwork = async (user: User, network: CreateNetworkData) => {
    const networkPassword = network.password;
    const networkData = { ...network, password: encrypt(networkPassword) };

    await networkRepository.createNetwork(user.id, networkData);
};

export const getNetworkById = async (userId: number, networkId: number) => {
    const network = await networkRepository.getNetworkById(userId, networkId);
    if (!network) throw notFoundError('network not found');

    const { password, createdAt } = network;
    return {
        ...network,
        password: decrypt(password),
        createdAt: formatTimestamp(createdAt),
    };
};

export const getNetworks = async (userId: number) => {
    const networks = await networkRepository.getNetworks(userId);

    if (networks.length === 0) throw noDataFound('no data was found');

    return networks.map((network) => {
        const { password, createdAt } = network;
        return {
            ...network,
            password: decrypt(password),
            createdAt: formatTimestamp(createdAt),
        };
    });
};

export const deleteNetwork = async (userId: number, networkId: number) => {
    await getNetworkById(userId, networkId);
    await networkRepository.deleteNetwork(networkId);
};
