import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, CyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAsFinishedAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

interface createCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  CreateNewCycle: (data: createCycleData) => void;
  InterruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

// type ActionType =
//   | { type: "ADD_NEW_CYCLE"; payload: { newCycle: Cycle } }
//   | { type: "SET_ACTIVE_CYCLE"; payload: { activeCycleID: string } }
//   | { type: "RESET_CYCLES" };

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setamountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setamountSecondsPassed(seconds);
  }

  function CreateNewCycle(data: createCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle))

    setamountSecondsPassed(0);
  }

  function InterruptCurrentCycle() {
    dispatch(interruptCurrentCycleAsFinishedAction());
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        CreateNewCycle,
        InterruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
