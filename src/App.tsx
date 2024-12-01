import './App.css';
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom'; //deve ficar por f ora das rotas, como um container, ContextProviderr, produz um contexto para os componentes dentro deles, para os componentes obterem informações externas, fora do que já possuem dentro deles

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
      
      
      <GlobalStyle/>
    </ThemeProvider>
  );
}



      /* <Button color='primary'/>
      <Button color='secondary'/>
      <Button color='sucess'/>
      <Button color='danger'/>
      <Button/> */