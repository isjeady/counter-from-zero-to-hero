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

const Counter = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const counterValue = useAppSelector(selectCounterValue);
  const dispatch = useDispatch();
  //const [counter, setCounter] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("/api/counter")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCounterValue(data.counter.value));
        setLoading(false);
      });
  }, [dispatch]);

  const handleIncrement = () => {
    dispatch(increment());
    fetch("/api/counter", { method: "POST", body: JSON.stringify({}) });
    /*   .then((res) => res.json())
      .then((data) => {
       dispatch(setCounterValue(data.counter.value));
      }); */
  };

  const handleDecrement = () => {
    dispatch(decrement());
    fetch("/api/counter", {
      method: "POST",
      body: JSON.stringify({ decrement: true }),
    });
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
      <Text label={loading ? "..." : counterValue} size="large" />
    </div>
  );
};

export default Counter;
