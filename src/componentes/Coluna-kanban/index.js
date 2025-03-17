import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "../card";
import { FiTrash, FiPlus } from "react-icons/fi";
import "./coluna_kanban.css";

export const COLUNA_KANBAN = ({ coluna, removerColuna, setColunas }) => {
  const [popupAberto, setPopupAberto] = useState(false);
  const [novoTituloCard, setNovoTituloCard] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  const abrirPopup = () => setPopupAberto(true);
  const fecharPopup = () => {
    setPopupAberto(false);
    setNovoTituloCard("");
    setNovaDescricao("");
  };

  const adicionarCard = () => {
    if (novoTituloCard.trim() !== "") {
      const novoCard = {
        id: `card-${Date.now()}`,
        titulo: novoTituloCard,
        descricao: novaDescricao,
        dataCriacao: Date.now(),
        coluna: coluna.titulo,
      };

      const novaColuna = {
        ...coluna,
        cards: [...coluna.cards, novoCard],
      };

      setColunas((prevColunas) => ({
        ...prevColunas,
        [coluna.id]: novaColuna,
      }));

      fecharPopup();
    }
  };

  const atualizarCard = (id, novoTitulo, novaDescricao) => {
    const novosCards = coluna.cards.map((card) =>
      card.id === id ? { ...card, titulo: novoTitulo, descricao: novaDescricao } : card
    );

    const novaColuna = {
      ...coluna,
      cards: novosCards,
    };

    setColunas((prevColunas) => ({
      ...prevColunas,
      [coluna.id]: novaColuna,
    }));
  };

  return (
    <div className="coluna">
      <header className="header-coluna">
        <h3>{coluna.titulo}</h3>
        <div className="icones-coluna">
          <FiPlus onClick={abrirPopup} />
          <FiTrash onClick={removerColuna} />
        </div>
      </header>

      <Droppable droppableId={coluna.id}>
        {(provided) => (
          <div
            className="lista-cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {coluna.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                atualizarCard={atualizarCard} // Passando a função atualizarCard
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {popupAberto && (
        <div className="overlay">
          <div className="popup">
            <h2>Novo Card</h2>
            <label>Título:</label>
            <input
              type="text"
              value={novoTituloCard}
              onChange={(e) => setNovoTituloCard(e.target.value)}
            />
            <label>Descrição:</label>
            <textarea
              value={novaDescricao}
              onChange={(e) => setNovaDescricao(e.target.value)}
            ></textarea>
            <div className="botoes">
              <button className="salvar" onClick={adicionarCard}>Criar</button>
              <button className="fechar" onClick={fecharPopup}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};