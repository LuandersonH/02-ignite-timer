import { createContext, ReactNode, useReducer, useState } from "react";

interface createCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

// type ActionType =
//   | { type: "ADD_NEW_CYCLE"; payload: { newCycle: Cycle } }
//   | { type: "SET_ACTIVE_CYCLE"; payload: { activeCycleID: string } }
//   | { type: "RESET_CYCLES" };

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      if (action.type == "ADD_NEW_CYCLE") {
        return {
          ...state,

          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
        // return [...state, action.payload.newCycle];
      }

      if (action.type == "INTERRUPT_CURRENT_CYCLE") {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null,
        };
      }
      return state;
    },
    { cycles: [], activeCycleId: null }
  );

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

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    //Usando arrow function pois o novo valor do estado precisa do seu valor anterior:
    // setCycles((state) => [...state, newCycle]);
    //Quando um novo ciclo é criado, os segundos passados do ciclo anterior são resetados:
    setamountSecondsPassed(0);
  }

  function InterruptCurrentCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "mark_Current_Cycle_As_Finished",
      payload: {
        activeCycleId,
      },
    });

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
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
