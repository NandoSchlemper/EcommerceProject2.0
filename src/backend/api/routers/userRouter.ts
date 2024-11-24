import { TRPCError } from "@trpc/server"
import { router, procedure } from "../../tprc/index"

export const userRouter = router({
    getUser: procedure.use(({ctx, next}) => {
        if (!ctx.email) {
            throw new TRPCError({code: 'UNAUTHORIZED', message:'Usuário não autenticado'})
        }

        return next({ctx: {email: ctx.email}})
    }).query(() => {
        return {id: "1"}
    })
})