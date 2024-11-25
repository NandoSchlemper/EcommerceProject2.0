import { router, procedure } from "../../tprc/index"
import { db } from "../../db"
import {z} from 'zod'
import { eq, StringChunk } from "drizzle-orm"
import { users } from "../../db/schemas/userSchema"
import { TRPCError } from "@trpc/server"

export const userRouter = router({
    getUser: procedure.query(async () => {
        try {
            const response = await db.query.users.findMany({})
            return response
        } catch (err) {
            console.error("Erro ao requisitar todos os usuários", err)
        }
    }),

    getUserId: procedure
        .input(z.object({email: z.string()}))
        .output(z.object({id: z.string()}))
        .query(async ({input}) => {
            try {
                const response = await db
                    .select({id: users.id})
                    .from(users)
                    .where(eq(users.email, input.email))
                
                if (!response[0].id) {
                    throw new TRPCError({code: 'BAD_REQUEST',message: "Erro ao pegar o usuário"})
                }

                return {id: response[0].id}
            } catch (err) {
                console.error(err)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Erro interno ao buscar usuário",
                });
            }
        })
        
})