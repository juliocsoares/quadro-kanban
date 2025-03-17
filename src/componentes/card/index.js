import { Draggable } from "react-beautiful-dnd";
import { useState, useRef, useEffect } from "react"; // Adicionei useState, useRef e useEffect
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./card.css";

export const Card = ({ card, index, atualizarCard }) => { // Adicionei a prop atualizarCard
  const [popupAberto, setPopupAberto] = useState(false);
  const [novoTituloCard, setNovoTitulo] = useState(card.titulo);
  const [novaDescricao, setNovaDescricao] = useState(card.descricao);
  const popupRef = useRef(null);

  const abrirPopup = () => setPopupAberto(true);
  const fecharPopup = () => setPopupAberto(false);

  useEffect(() => {
    const handleClickFora = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        fecharPopup();
      }
    };

    if (popupAberto) {
      document.addEventListener("mousedown", handleClickFora);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [popupAberto]);

  const salvarEdicao = () => {
    console.log("Título salvo:", novoTituloCard);
    console.log("Descrição salva:", novaDescricao);
    atualizarCard(card.id, novoTituloCard, novaDescricao); // Atualiza o card
    fecharPopup();
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={abrirPopup} // Abre o popup ao clicar no card
          >
            <h5>{card.titulo}</h5>
            <p dangerouslySetInnerHTML={{ __html: card.descricao }}></p>
          </div>
        )}
      </Draggable>

      {popupAberto && (
        <div className="overlay">
          <div className="popup" ref={popupRef}>
            <h2>Editar Card</h2>
            <label>Título:</label>
            <input
              type="text"
              value={novoTituloCard}
              onChange={(e) => setNovoTitulo(e.target.value)}
            />

            <label>Descrição:</label>
            <ReactQuill value={novaDescricao} onChange={setNovaDescricao} />

            <label>Data de Criação:</label>
            <p>{new Date(card.dataCriacao).toLocaleString()}</p>

            <label>Coluna: {card.coluna}</label>
            <br />
            <br />
            <div className="botoes">
              <button className="salvar" onClick={salvarEdicao}>Salvar</button>
              <button className="fechar" onClick={fecharPopup}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};