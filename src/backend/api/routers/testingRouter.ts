import { TRPCError } from "@trpc/server"
import { procedure, router } from "../../tprc"

export const testRouter = router({
    protectedProcedure: procedure.use(({ctx, next}) => {
        if (!ctx.email) {
            throw new TRPCError({code: 'UNAUTHORIZED', message: 'Usuário não autenticado'})
        }

        return next({ctx: {user: ctx.email}})
    }).query(({ctx}) => {
        return `Olá! seu email e: ${ctx.email}`
    })
})