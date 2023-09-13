import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository';
import { CreateUserData } from '../types/userTypes';
import { conflictError, notFoundError, unauthorizedError } from '../utils/errors';

const TOKEN_EXPIRATION = '24h';

export const createUser = async (user: CreateUserData) => {
    const existingUser = await authRepository.findUserByEmail(user.email);
    if (existingUser) throw conflictError('this user is already registered');

    const SALT = 10;
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    await authRepository.createUser({ ...user, password: hashedPassword });
};

export const logIn = async (user: CreateUserData) => {
    const existingUser = await authRepository.findUserByEmail(user.email);
    if (!existingUser) throw unauthorizedError('invalid credentials');

    const isPasswordValid = bcrypt.compareSync(user.password, existingUser.password);
    if (!isPasswordValid) throw unauthorizedError('invalid credentials');

    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
    });

    return token;
};

export const findUserById = async (id: number) => {
    const user = await authRepository.findUserById(id);
    if (!user) throw notFoundError('user not found');

    return user;
};
