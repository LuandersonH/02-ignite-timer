import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}

//DefaultLayout = define o layout padrão
//Router = usa o layout padrão como ContextProvider das rotas que quero aplicar o layout, insiro os elementos nele, como se ele fosse o novo App.
//App = BrowserRouter para o browser mostrar as rotas e importo o arquivo <Router/> dentro
