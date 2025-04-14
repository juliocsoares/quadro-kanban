import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./componentes/Header";
import Pagina_quadro from "./paginas/pagina-quadro";
import Pagina_Inicial from "./paginas/pagina-inicio/pagina-inicio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/inicio" element={<Pagina_Inicial />} />
        <Route path="/quadro" element={<Pagina_quadro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
