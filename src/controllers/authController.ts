import { Request, Response } from 'express';
import * as authService from '../services/userService';

export const signUp = async (req: Request, res: Response) => {
    const user = req.body;
    await authService.createUser(user);
    res.status(201).send({ type: 'created', statusCode: 201, message: 'user created successfully' });
};

export const signIn = async (req: Request, res: Response) => {
    const user = req.body;
    const token = await authService.logIn(user);
    res.send({ token });
};
