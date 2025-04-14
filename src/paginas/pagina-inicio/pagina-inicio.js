import React from 'react';
import './pagina-inicio.css';
import { useNavigate } from 'react-router-dom';



const PaginaInicial = () => {

  const navigate = useNavigate();

  const iniciar = () => {
    navigate('/quadro');
  };

  return (
    <div className="container">
      <h1 className="titulo">Projeto Kanban IGC</h1>
      <button className="botao" onClick={iniciar}>Iniciar</button>
    </div>
  );
};

export default PaginaInicial;
