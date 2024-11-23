import { z } from 'zod';
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
    DB_URL: z.string().url(),
    JWT_SECRET: z.string()
})

export const env = envSchema.parse({
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET
})