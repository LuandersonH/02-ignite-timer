import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createContext, useState } from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/newCycleForm";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

//Validação dos inputs do formulário:
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, "Informe a terefa"),
  minutesAmount: zod
    .number()
    .min(5, "O minimo precisa ser 5 minutos.")
    .max(60, "O máximo precisa ser 60 minutos."),
});

//criando uma tipagem a partir de uma constante já criada anteriormente:
type newCycleFormatData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  //Estado para armazenas a lista de ciclos
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setamountSecondsPassed] = useState(0);

  const newCycleForm = useForm<newCycleFormatData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  //procura nos ciclos o ciclo que está com o id ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setamountSecondsPassed(seconds);
  }

  //A função para setar o cycle como finalizado foi definido aqui pois:
  //Usa da função setCycles, que só existe dentro do componente Home (para evitar exportar o setState todo)
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function handleCreateNewCycle(data: newCycleFormatData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    //Usando arrow function pois o novo valor do estado precisa do seu valor anterior:
    setCycles((state) => [...state, newCycle]);

    //Definindo o novo ciclo como o ativo:
    setActiveCycleId(id);

    //Quando um novo ciclo é criado, os segundos passados do ciclo anterior são resetados:
    setamountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  console.log(activeCycleId);
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
