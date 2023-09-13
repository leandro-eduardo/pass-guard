import { SafeNote } from '@prisma/client';

export type CreateSafeNoteData = Omit<SafeNote, 'id' | 'createdAt'>;
