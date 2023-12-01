import { db } from "@/lib/db";
import { publicProcedure, router } from "../trpc";
import z from "zod";

const COUNTER = "counter";

export const counterRouter = router({
  getCounter: publicProcedure.query(async ({ ctx, input }) => {
    let counter = await db.setting
      .findUnique({
        where: {
          key: COUNTER,
        },
      })
      .catch((error) => {
        console.log(error);
        return error.message;
      });

    if (!counter) {
      counter = await db.setting.create({
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          key: COUNTER,
          value: 0,
        },
      });
    }

    return { counter };
  }),
  postCounter: publicProcedure
    .input(
      z.object({
        decrement: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const decrement = input?.decrement ?? false;

      const counter = await db.setting
        .findUnique({
          where: {
            key: COUNTER,
          },
        })
        .catch((error) => {
          console.log(error);
          return error.message;
        });

      const updatedCounter = await db.setting
        .upsert({
          where: {
            key: COUNTER,
          },
          update: {
            value: decrement ? counter.value - 1 : counter.value + 1,
          },
          create: {
            createdAt: new Date(),
            updatedAt: new Date(),
            key: COUNTER,
            value: 0,
          },
        })
        .catch((error) => {
          console.log(error);
          return error.message;
        });

      return { counter: updatedCounter };
    }),
});
