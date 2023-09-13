import prisma from '../database/db';
import { CreateNetworkData } from '../types/networkTypes';

export const createNetwork = async (userId: number, network: CreateNetworkData) => {
    return prisma.network.create({
        data: { ...network, userId },
    });
};

export const getNetworkById = async (userId: number, networkId: number) => {
    return prisma.network.findFirst({
        where: { id: networkId, userId },
        select: {
            id: true,
            title: true,
            name: true,
            password: true,
            createdAt: true,
        },
    });
};

export const getNetworks = async (userId: number) => {
    return prisma.network.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            name: true,
            password: true,
            createdAt: true,
        },
    });
};

export const deleteNetwork = async (id: number) => {
    return prisma.network.delete({
        where: { id },
    });
};
