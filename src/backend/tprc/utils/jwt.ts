import type { JwtPayload } from 'jsonwebtoken';
import jwt  from 'jsonwebtoken';
import { env } from '../../utils/env';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, env.JWT_SECRET, {expiresIn: '1h'});
}

export const validateToken = (token: string | null): string | JwtPayload | null => {
    try {

        if (!token) {
            console.error("Token não está presente")
            return null
        }

        const validation =  jwt.verify(token, env.JWT_SECRET)
        return validation

    } catch (err) {
        console.error("Deu erro:", err)
        return null
    }
}