import { useState } from "react";
import "./coluna_kanban.css";
import { Card } from "../card";
import { FiTrash, FiPlus } from "react-icons/fi";

export const COLUNA_KANBAN = ({ removerColuna }) => {
  const [titulo, setTitulo] = useState("Nova Coluna");
  const [cards, setCards] = useState([]);
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
        id: Date.now(),
        titulo: novoTituloCard,
        descricao: novaDescricao,
      };
      setCards([...cards, novoCard]);
      fecharPopup();
    }
  };

  const atualizarCard = (id, novoTitulo, novaDescricao) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, titulo: novoTitulo, descricao: novaDescricao } : card
      )
    );
  };

  return (
    <div className="coluna">
      <header className="header-coluna">
        <input
          className="titulo-coluna"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <div className="icones-coluna">
          <FiPlus onClick={abrirPopup} />
          <FiTrash onClick={removerColuna} />
        </div>
      </header>

      <div className="lista-cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            tituloCard={card.titulo}
            descricao={card.descricao}
            dataCriacao={Date.now()}
            coluna={titulo}
            atualizarCard={atualizarCard} // Passando a função correta
          />
        ))}
      </div>

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