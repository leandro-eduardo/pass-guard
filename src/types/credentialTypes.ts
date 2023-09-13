import { Credential } from '@prisma/client';

export type CreateCredentialData = Omit<Credential, 'id' | 'createdAt'>;
