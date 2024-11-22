import { router, procedure } from "../../tprc/app";

export const userRouter = router({
    getUser: procedure.query(() => {
        return {id: "1"}
    })
})