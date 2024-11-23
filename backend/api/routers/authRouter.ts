import { procedure, router } from "../../tprc";
import {z} from 'zod'
import { generateToken } from "../../tprc/utils/jwt";

export const authRouter = router({
    login: procedure.input(
        z.object({
            email: z.string().email(),
            password: z.string()
        })
    ).mutation(({input, ctx}) => {
        const { email, password } = input

        // fazer validação com o banco
        const user = {id: '1', name: 'batatudo'}

        const token = generateToken({id: user.id, username: user.name})
        ctx.res.setCookie('token')
    })
})