import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CycleContext";



export function History() {

  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Limpar o quarto</td>
              <td>30 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>60 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Limpar o quarto</td>
              <td>30 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>60 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Limpar o quarto</td>
              <td>30 minutos</td>
              <td>Há cerca de 1 mês</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Estudar React</td>
              <td>60 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="red">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
