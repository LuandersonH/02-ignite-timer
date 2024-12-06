import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

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

const { register, handleSubmit, watch, reset} = useFormAction<newCycleFormatData>({
  resolver: zodResolver(newCycleFormValidationSchema),
  defaultValues: {
    task: "",
    minutesAmount: 0,
  },
});


export function NewCycleForm() {
    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            disabled={!!activeCycle}
            {...register("task")}
          />
          
          <datalist id="task-suggestions">
            <option value="Proj 1" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
    )
}