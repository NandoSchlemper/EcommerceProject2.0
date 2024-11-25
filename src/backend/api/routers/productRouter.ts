import { eq } from "drizzle-orm";
import { db } from "../../db";
import { products } from "../../db/schemas/productSchema";
import { procedure, router } from "../../tprc";
import {z} from 'zod'

export const productRouter = router({
    getAllProducts: procedure.query(async () => {
        try {
            const response = await db.query.products.findMany({})
            return response
        } catch (err) {
            console.error('Erro ao pegar dados do DB:\n', err)
        }
    }),

    createProduct: procedure.input(
        z.object({
            user_id: z.string(),
            name: z.string(),
            description: z.string(),
            price: z.string(),
            stock: z.number()
        }
    )).mutation(async ({input}) => {
        try {
            const response = await db.insert(products).values(input)
            return response
        } catch (err) {
            console.error("Erro ao inserir produto", err)
        }
    }),

    deleteProductById: procedure.input(
        z.object({
            id: z.string()
        })
    ).mutation(async ({input}) => {
        try {
            const response = await db.delete(products).where(eq(products.id, input.id))
            return response
        } catch (err) {
            console.error("Erro ao deletar produto", err)
        }
    })
})