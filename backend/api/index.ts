import { router } from "../tprc"
import { userRouter } from "./routers/userRouter"

export const AppRouter = router({
    user: userRouter
})

export type appRouter = typeof AppRouter;