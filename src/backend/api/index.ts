import { router } from "../tprc"
import { authRouter } from "./routers/authRouter";
import { testRouter } from "./routers/testingRouter";
import { userRouter } from "./routers/userRouter"

export const AppRouter = router({
    user: userRouter,
    auth: authRouter,
    test: testRouter
})

export type appRouter = typeof AppRouter;