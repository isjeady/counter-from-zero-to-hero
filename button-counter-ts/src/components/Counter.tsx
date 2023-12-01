"use client";
import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import Text from "./ui/Text";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import {
  decrement,
  increment,
  selectCounterValue,
  setCounterValue,
} from "@/lib/features/counter/counterSlice";
import { trpc } from "@/app/_trpc/client";
import { useQueryClient } from "@tanstack/react-query";

const Counter = () => {
  const utils = trpc.useUtils();

  const { data, isLoading, isFetching } =
    trpc.counterRouter.getCounter.useQuery();

  const { mutate: postCounter, isLoading: isLoadingPost } =
    trpc.counterRouter.postCounter.useMutation({
      onSuccess: () => {
        // utils.counterRouter.getCounter.invalidate();
      },
      onMutate({ decrement }) {
        utils.counterRouter.getCounter.setData(undefined, (oldData) => {
          return {
            ...oldData,
            counter: {
              ...oldData?.counter,
              value: decrement
                ? oldData?.counter?.value - 1
                : oldData?.counter?.value + 1,
            },
          };
        });
      },
      onSettled() {
        utils.counterRouter.getCounter.invalidate();
      },
    });

  const counter = data?.counter?.value ?? 0;

  const handleIncrement = () => {
    postCounter({ decrement: false });
  };

  const handleDecrement = () => {
    postCounter({ decrement: true });
  };

  return (
    <div className="w-full mx-auto text-center p-8 max-w-lg">
      <div className="grid grid-cols-1 gap-4 p-4">
        <Button onClick={handleIncrement} label="Increment" />
        <Button
          onClick={handleDecrement}
          label="Decrement"
          variant="secondary"
        />
      </div>

      <Text label="Clicks" />
      <Text label={isLoading || isFetching ? "..." : counter} size="large" />

      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Counter;
