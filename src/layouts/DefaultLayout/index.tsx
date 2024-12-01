import { Outlet } from "react-router-dom"; //Espaço para ser inserido um conteúdo,
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}
