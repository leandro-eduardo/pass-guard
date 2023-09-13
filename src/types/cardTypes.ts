import { Card } from '@prisma/client';

export type CreateCardData = Omit<Card, 'id' | 'createdAt'>;
