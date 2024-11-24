import { router, procedure } from "../../tprc/index"
import { db } from "../../db"

export const userRouter = router({
    getUser: procedure.query(async () => {
        try {
            const response = await db.query.users.findMany({})
            return response
        }
    })
})