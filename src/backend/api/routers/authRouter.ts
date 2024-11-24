import { procedure, router } from "../../tprc";
import {z} from 'zod'
import { generateToken, validateToken } from "../../tprc/utils/jwt";
import { env } from "../../utils/env";
import nodemailer from 'nodemailer'
import { db } from "../../db";
import { users } from "../../db/schemas/userSchema";
import { TRPCError } from "@trpc/server";

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: env.EMAIL,
        pass: env.PASSWORD
    }
})
 
export const authRouter = router({
    register: procedure.input(
        z.object({
            name: z.string(),
            email: z.string().email()
        })
    ).mutation(async ({input}) => {
        try {
            const {name, email} = input
            const response = await db.insert(users).values({name: name, email: email})
            return response
        } catch (err) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: `Deu merda na insercao de dados ${err}`
            })
        }
    }),


    login: procedure.input(
        z.object({
            email: z.string().email()
        })
    ).mutation(async ({input, ctx}) => {
        const user = input

        const token = generateToken(user)

        const magicLink = `http://localhost:4000/auth?token=${token}`

        try {
            await transporter.sendMail({
                from: env.EMAIL,
                to: user.email,
                subject: 'Magic Link para acesso',
                text: 'Clique no link para acessar o login'
            })
        } catch (err) {
            console.error("Deu merda no envio do email")
        }

        console.log(magicLink)

        ctx.reply?.setCookie('token', token, {
            httpOnly: true,
            path: '/'
        })
        return {message: 'cookie enviado'}
    }),


    verify: procedure.input(
        z.object({
            token: z.string()
        })
    ).query(({input, ctx}) => {
        const {token} = input

        try {
            const decoded = validateToken(token)

            ctx.reply?.setCookie('token', token, {httpOnly: true})
            return {message: 'Token valido', email: decoded}
        } catch (err) {
            console.error("Deu merda na validacao do token...", err)
            throw new Error('Token invalido ou expirado')
        }

    })
})