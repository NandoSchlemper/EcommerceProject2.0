import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, reply: res, email: null };  
}

export type Context = Awaited<ReturnType<typeof createContext>>;
