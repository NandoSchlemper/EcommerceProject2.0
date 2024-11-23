import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { createContext } from './tprc/context';
import { AppRouter } from './api';
import { env } from './utils/env';

const server = Fastify();

server.register(cors);

server.register(cookie, {
  secret: env.JWT_SECRET
})

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: AppRouter, createContext },
});

server.listen({ port: 4000 }, () => {
  console.log('🚀 Servidor rodando em http://localhost:4000');
});