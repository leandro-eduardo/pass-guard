import { CreateCredentialData } from '../types/credentialTypes';
import { User } from '@prisma/client';
import { conflictError, noDataFound, notFoundError } from '../utils/errors';
import * as credentialRepository from '../repositories/credentialRepository';
import { decrypt, encrypt } from '../utils/cryptr';
import { formatTimestamp } from '../utils/formatTimestamp';

export const createCredential = async (user: User, credential: CreateCredentialData) => {
    const existingCredential = await credentialRepository.findCredentialByTitleAndUserId(
        user.id,
        credential.title
    );
    if (existingCredential) throw conflictError('this credential is already registered for this user');

    const credentialPassword = credential.password;
    const credentialData = { ...credential, password: encrypt(credentialPassword) };

    await credentialRepository.createCredential(user.id, credentialData);
};

export const getCredentialById = async (userId: number, credentialId: number) => {
    const credential = await credentialRepository.getCredentialById(userId, credentialId);
    if (!credential) throw notFoundError('credential not found');

    const { password, createdAt } = credential;
    return {
        ...credential,
        password: decrypt(password),
        createdAt: formatTimestamp(createdAt),
    };
};

export const getCredentials = async (userId: number) => {
    const credentials = await credentialRepository.getCredentials(userId);

    if (credentials.length === 0) throw noDataFound('no data was found');

    return credentials.map((credential) => {
        const { password, createdAt } = credential;
        return {
            ...credential,
            password: decrypt(password),
            createdAt: formatTimestamp(createdAt),
        };
    });
};

export const deleteCredential = async (userId: number, credentialId: number) => {
    await getCredentialById(userId, credentialId);
    await credentialRepository.deleteCredential(credentialId);
};
