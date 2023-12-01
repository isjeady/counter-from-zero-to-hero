import { counterRouter } from "./counter.router";
import { router } from "../trpc";

export const appRouter = router({
  counterRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
