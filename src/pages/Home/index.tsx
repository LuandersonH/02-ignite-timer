import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/newCycleForm";
import { CyclesContext } from "../../contexts/CycleContext";

//Validação dos inputs do formulário:

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(2, "Informe a terefa"),
  minutesAmount: zod
    .number()
    .min(5, "O minimo precisa ser 5 minutos.")
    .max(60, "O máximo precisa ser 60 minutos."),
});

type newCycleFormatData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, CreateNewCycle, InterruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<newCycleFormatData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: newCycleFormatData) {
    CreateNewCycle(data);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
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
