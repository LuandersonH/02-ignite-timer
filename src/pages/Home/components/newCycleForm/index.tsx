import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function formContainer () {
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