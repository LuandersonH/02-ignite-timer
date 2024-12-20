import "./App.css";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom"; //deve ficar por fora das rotas, como um container, ContextProviderr, produz um contexto para os componentes dentro deles, para os componentes obterem informações externas, fora do que já possuem dentro deles
import { CyclesContextProvider } from "./contexts/CycleContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  );
}
