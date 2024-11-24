import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { validateToken } from './utils/jwt';
import cookie from 'cookie'; // Importa a biblioteca de cookies

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

  const token = cookies.token;

  if (!token) {
    console.log("Token não fornecido via cookie...");
    return { user: null }; 
  }

  const decodedToken = validateToken(token);

  console.log("Token retornado com sucesso!!!");
  return { req, res, user: decodedToken || null };  
}

export type Context = Awaited<ReturnType<typeof createContext>>;
