import { router } from "../tprc/app"
import { userRouter } from "./routers/userRouter"

export const AppRouter = router({
    user: userRouter
})

export type appRouter = typeof AppRouter;