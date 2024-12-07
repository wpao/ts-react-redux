import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// memberi type
import { RootState } from "../store/store";

const CounterPage = () => {
  const [countInput, setCountInput] = useState<number>(0);

  const counterSelector = useSelector((state: RootState) => state.counter);

  // menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();
  const incrementCounter = () => {
    dispatch({ type: "COUNTER_INCREMENT_COUNT" });
  };

  const decrementCounter = () => {
    dispatch({ type: "COUNTER_DECREMENT_COUNT" });
  };

  const setCounterWithInput = () => {
    // dispatch({ type: "SET_COUNT", payload: { newCount: countInput } });
    dispatch({ type: "COUNTER_SET_COUNT", payload: countInput });
  };

  //
  return (
    <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 flex flex-col justify-center items-center gap-4">
      <p className="text-5xl font-bold">Count: {counterSelector.count}</p>

      <div className="flex items-center gap-4">
        <Button onClick={decrementCounter} size={"icon"}>
          <Minus className="w-6 h-6" />
        </Button>

        <Button onClick={incrementCounter} size={"icon"}>
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex gap-2 mt-8">
        <Input
          type="number"
          onChange={(e) => {
            setCountInput(Number(e.target.value));
          }}
        />
        <Button onClick={setCounterWithInput}>Submit</Button>
      </div>
    </main>
  );
};

export default CounterPage;
