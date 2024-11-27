import styled, {css} from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "sucess" | "danger";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  sucess: "green",
  danger: "red",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0px;
  margin: 8px;

  background-color: ${props => props.theme["green-500"]};
  color: ${props => props.theme.secondary}

  //O styled components irá executar o código dentro de $ {} como uma função.
  //Ele vai enviar para a função as props de ButtonContainer
  //Se Buttoncontainer recebe variant, ela vai para dentro de "props" abaixo
  //Definimos o que fazemos com essa props, a props variant faz o botão mudar de background? fonte? width? só setar.
  //Nessa caso, escolhemos a cor como: const ButtonVariant tem os tipos 'primary' / props.variant tem o tipo escolhido, recebido do componente. eu adiciono o tipo escolhido à buttonVariants, se tiver em ButtonVariants, será feito.
  /* ${(props) => {
    return css`
    background-color: ${buttonVariants[props.variant]}`
  }} */
`
