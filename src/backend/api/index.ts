import { router } from "../tprc"
import { authRouter } from "./routers/authRouter";
import { productRouter } from "./routers/productRouter";
import { testRouter } from "./routers/testingRouter";
import { userRouter } from "./routers/userRouter"

export const AppRouter = router({
    user: userRouter,
    auth: authRouter,
    test: testRouter,
    product: productRouter,
})

export type appRouter = typeof AppRouter;