import { useState, useRef, useEffect } from "react";
import "./card.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Card = ({ tituloCard, descricao, dataCriacao, coluna, atualizarTituloCard }) => {
  const [popupAberto, setPopupAberto] = useState(false);
  const [novoTituloCard, setNovoTitulo] = useState(tituloCard);  
  const [novaDescricao, setNovaDescricao] = useState(descricao);
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
    atualizarTituloCard(novoTituloCard);  
    fecharPopup();
  };

  return (
    <>
      <div className="card" onClick={abrirPopup}>
        <h5>{tituloCard}</h5> 
        <p dangerouslySetInnerHTML={{ __html: descricao }}></p>
      </div>

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
            <p>{new Date(dataCriacao).toLocaleString()}</p>

            <label>Coluna: {coluna}</label>
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
