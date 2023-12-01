"use client";
import React, { useState } from "react";
import Button from "./ui/Button";
import Text from "./ui/Text";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { decrement, increment } from "@/lib/features/counter/counterSlice";

const Counter = () => {
  const counterValue = useAppSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  //const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
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
      <Text label={counterValue} size="large" />
    </div>
  );
};

export default Counter;
