import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../utils/env';
import { users } from './schemas/userSchema';
import { products } from './schemas/productSchema';

export const client = postgres(env.DB_URL, { prepare: false })
export const db = drizzle(client, {schema: {users, products}});