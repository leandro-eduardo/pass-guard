import prisma from '../database/db';
import { CreateCredentialData } from '../types/credentialTypes';

export const createCredential = async (userId: number, credential: CreateCredentialData) => {
    return prisma.credential.create({
        data: { ...credential, userId },
    });
};

export const findCredentialByTitleAndUserId = async (userId: number, title: string) => {
    return prisma.credential.findUnique({
        where: { title_userId: { title, userId } },
    });
};

export const getCredentialById = async (userId: number, credentialId: number) => {
    return prisma.credential.findFirst({
        where: { id: credentialId, userId },
        select: {
            id: true,
            title: true,
            url: true,
            username: true,
            password: true,
            createdAt: true,
        },
    });
};

export const getCredentials = async (userId: number) => {
    return prisma.credential.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            url: true,
            username: true,
            password: true,
            createdAt: true,
        },
    });
};

export const deleteCredential = async (id: number) => {
    return prisma.credential.delete({
        where: { id },
    });
};
