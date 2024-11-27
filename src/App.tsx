import './App.css';
import { Button } from './components/Button';
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant='primary' />
      <Button variant='secondary' />
      <Button variant='danger' />
      <Button variant='sucess' />
      <Button/> 
      
      
      <GlobalStyle/>
    </ThemeProvider>
  );
}



      /* <Button color='primary'/>
      <Button color='secondary'/>
      <Button color='sucess'/>
      <Button color='danger'/>
      <Button/> */