import { TRPCError } from "@trpc/server"
import { router, procedure } from "../../tprc"

export const userRouter = router({
    getUser: procedure.use(({ctx, next}) => {
        if (!ctx.user) {
            throw new TRPCError({code: 'UNAUTHORIZED', message:'Usuário não autenticado'})
        }

        return next({ctx: {user: ctx.user}})
    }).query(() => {
        return {id: "1"}
    })
})