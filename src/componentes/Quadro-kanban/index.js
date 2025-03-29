import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { COLUNA_KANBAN } from "../Coluna-kanban";
import { Botao_adicionar } from "../Botao-adicionar";
import "./quadro-kanban.css";

export const Quadro_Kanban = () => {
  const [colunas, setColunas] = useState({
    "coluna-0": {
      id: "coluna-0",
      titulo: "To Do",
      cards: [
        { id: "card-1", titulo: "Tarefa 1", descricao: "Descrição 1", dataCriacao: Date.now(), coluna: "To Do" },
      ],
    },
  });

  const adicionarColuna = () => {
    const novaColunaId = `coluna-${Date.now()}`;
    setColunas({
      ...colunas,
      [novaColunaId]: {
        id: novaColunaId,
        titulo: "Nova Coluna",
        cards: [],
      },
    });
  };

  const removerColuna = (id) => {
    const novasColunas = { ...colunas };
    delete novasColunas[id];
    setColunas(novasColunas);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log("Resultado do drag:", result);

    if (!destination) {
      console.log("Nenhum destino válido");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("O card foi solto no mesmo lugar");
      return;
    }

    const colunaOrigem = colunas[source.droppableId];
    const colunaDestino = colunas[destination.droppableId];

    const novosCardsOrigem = Array.from(colunaOrigem.cards);
    const [cardMovido] = novosCardsOrigem.splice(source.index, 1);

    if (colunaOrigem === colunaDestino) {
      novosCardsOrigem.splice(destination.index, 0, cardMovido);

      const novaColuna = {
        ...colunaOrigem,
        cards: novosCardsOrigem,
      };

      setColunas({
        ...colunas,
        [colunaOrigem.id]: novaColuna,
      });
    } else {
      const novosCardsDestino = Array.from(colunaDestino.cards);
      novosCardsDestino.splice(destination.index, 0, cardMovido);

      setColunas({
        ...colunas,
        [colunaOrigem.id]: {
          ...colunaOrigem,
          cards: novosCardsOrigem,
        },
        [colunaDestino.id]: {
          ...colunaDestino,
          cards: novosCardsDestino,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="quadro-kanban">
        {Object.values(colunas).map((coluna) => (
          <COLUNA_KANBAN
            key={coluna.id}
            coluna={coluna}
            removerColuna={() => removerColuna(coluna.id)}
            setColunas={setColunas}
          />
        ))}
        <Botao_adicionar onClick={adicionarColuna} />
      </div>
    </DragDropContext>
  );
};