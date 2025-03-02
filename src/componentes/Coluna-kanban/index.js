import { useState } from "react";
import "./coluna_kanban.css";
import { Card } from "../card";

export const COLUNA_KANBAN = () => {
  const [titulo, setTitulo] = useState("");

  const [popupAberto, SetPopupAberto] = useState(false);

  const togglePopup = () => {
    SetPopupAberto(!popupAberto);
  }

  return (

    <div className="coluna">
      <header className="header-coluna">
        <input
          className="titulo-coluna"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título da coluna"
        />
        <div className="icones-coluna">
          <svg onClick={togglePopup} xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-three-dots icone" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>

          {popupAberto && (
            <div className="pop-up-icone">
              <button>          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-trash3" viewBox="0 -2 16 16"> button
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg> Excluir Coluna</button>
            </div>
          )}

        </div>
      </header>
      <Card />

    </div>
  );
};
