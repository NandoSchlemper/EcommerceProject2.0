import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { appRouter } from '../../../src/backend/api';

export const client = createTRPCProxyClient<appRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc', // URL do servidor Fastify
    }),
  ],
});
