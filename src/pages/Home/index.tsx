import { HandPalm, Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//quando a biblioteca que estou importando não possuí um export default, uso essa sintaxe:
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

//Validação dos inputs do formulário:
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a terefa"),
  minutesAmount: zod
    .number()
    .min(1, "O minimo precisa ser 1 minuto.")
    .max(60, "O máximo precisa ser 60 minutos."),
});

//criando uma tipagem a partir de uma constante já criada anteriormente:
type newCycleFormatData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  //Estado para armazenas a lista de ciclos
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setamountSecondsPassed] = useState(0);

  //procurar nos ciclos o ciclo que está com o id ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference > totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );

          setamountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setamountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
      return ()=> {
        clearInterval(interval);
      }
  }, [activeCycle, totalSeconds, activeCycleId]);

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormatData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

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

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  // padStart = quantas casas decimais terá, o que vai completar a casa decimal da esquerda
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  console.log(activeCycleId);
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        
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
