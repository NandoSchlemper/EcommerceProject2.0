import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { validateToken } from './utils/jwt';
import cookie from 'cookie'; // Importa a biblioteca de cookies

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, reply: res, email: null };  
}

export type Context = Awaited<ReturnType<typeof createContext>>;
