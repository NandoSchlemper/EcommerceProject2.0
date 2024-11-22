import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { appRouter } from '../backend/api';

const client = createTRPCProxyClient<appRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc', // URL do servidor Fastify
    }),
  ],
});


async function main() {
  const response = await client.user.getUser.query()
  console.log(response); 
}

main();