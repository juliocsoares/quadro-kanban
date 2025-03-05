import { useState } from "react";
import "./coluna_kanban.css";
import { Card } from "../card";

export const COLUNA_KANBAN = ({ removerColuna }) => {
  const [titulo, setTitulo] = useState("Nova Coluna");

  return (
    <div className="coluna">
      <header className="header-coluna">
        <input
          className="titulo-coluna"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </header>

      {/* Card passando dados de exemplo */}
      <Card 
        titulo="Tarefa 1" 
        descricao="Descrição da tarefa 1"
        dataCriacao={Date.now()} 
        coluna={titulo} 
      />
    </div>
  );
};
