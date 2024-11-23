import { TRPCError } from "@trpc/server"
import { procedure, router } from "../../tprc"

export const testRouter = router({
    protectedProcedure: procedure.use(({ctx, next}) => {
        if (!ctx.user) {
            throw new TRPCError({code: 'UNAUTHORIZED', message: 'Usuário não autenticado'})
        }

        return next({ctx: {user: ctx.user}})
    }).query(({ctx}) => {
        return `Olá! ${ctx.user}`
    })
})