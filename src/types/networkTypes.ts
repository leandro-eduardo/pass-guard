import { Network } from '@prisma/client';

export type CreateNetworkData = Omit<Network, 'id' | 'createdAt'>;
