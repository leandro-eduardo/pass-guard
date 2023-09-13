import prisma from '../database/db';
import { CreateUserData } from '../types/userTypes';

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (user: CreateUserData) => {
    return prisma.user.create({ data: user });
};

export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
    });
};
