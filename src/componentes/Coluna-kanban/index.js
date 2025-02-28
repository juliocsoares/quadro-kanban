import { useState } from "react";
import "./coluna_kanban.css";
import { Card } from "../card";

export const COLUNA_KANBAN = () => {
  const [titulo, setTitulo] = useState("");

  return (
    <div className="coluna">
      <header className="header-coluna">
        <input
          className="titulo-coluna"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título da coluna"
        />
        <h3>...</h3>
      </header>
    <Card />

    </div>
  );
};
