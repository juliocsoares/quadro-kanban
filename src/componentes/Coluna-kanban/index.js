import { useState } from "react";
import "./coluna_kanban.css";
import { Card } from "../card";

export const COLUNA_KANBAN = ({ removerColuna }) => {
  const [titulo, setTitulo] = useState("Nova Coluna");  // Título da coluna
  const [tituloCard, setTituloCard] = useState("Tarefa 1");  // Título do card

  // Função para atualizar o título do card
  const atualizarTituloCard = (novoTituloCard) => {
    setTituloCard(novoTituloCard);  // Atualiza o título do card
  };

  return (
    <div className="coluna">
      <header className="header-coluna">
        <input
          className="titulo-coluna"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}  // Atualiza o título da coluna
        />
      </header>

      {/* Passando o título do card e a função para atualizar */}
      <Card 
        tituloCard={tituloCard}  // Passa o título do card
        descricao="Descrição da tarefa 1"
        dataCriacao={Date.now()} 
        coluna={titulo}
        atualizarTituloCard={atualizarTituloCard}  // Passa a função de atualização do título do card
      />
    </div>
  );
};
