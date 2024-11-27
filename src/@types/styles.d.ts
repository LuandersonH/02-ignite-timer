import { defaultTheme } from "../styles/themes/default";
import 'styled-components';


// As propriedades que defaultTheme possuí por padrão pode ser transferido para a variável de type, significando que vou poder acessar essas propriedades de modo mais fácil, pois estou tipando elas, elas se tornam vísiveis, por exemplo, ao clicar em 'ctrl space'
//Guardo os valores em uma variável para poder usar.
type ThemeType = typeof defaultTheme;


//Criando uma tipagem para o módulo styled-components, para que toda vez que eu importar ele em algum arquivo, a definição de tipos que ele vai puxar, é a escrita aqui:
//Para sobreescrever, precisamos importar styled-components, caso contrário, estamos criando algo nele, que não é o intuito

//O styled-components nos diz que é DefaultThemes que usamos para definir uma propriedade dentro dele, através de uma interface 

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
   
