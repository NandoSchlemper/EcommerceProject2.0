import jwt from 'jsonwebtoken';
import { env } from '../../utils/env';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, env.JWT_SECRET, {expiresIn: '30m'});
}

export const validateToken = (token: string): object | null => {
    try {
        return jwt.verify(token, env.JWT_SECRET)
    } catch (err) {
        return null
    }
}