import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { COLUNA_KANBAN } from "../Coluna-kanban";
import { Botao_adicionar } from "../Botao-adicionar";
import "./quadro-kanban.css";

export const Quadro_Kanban = () => {
  const [colunas, setColunas] = useState({
    "coluna-0": {
      id: "coluna-0",
      titulo: "Nova Coluna",
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

    // Se não houver destino, não faz nada
    if (!destination) return;

    // Se o card for solto na mesma coluna e na mesma posição, não faz nada
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Encontra a coluna de origem e a coluna de destino
    const colunaOrigem = colunas[source.droppableId];
    const colunaDestino = colunas[destination.droppableId];

    // Remove o card da coluna de origem
    const novosCardsOrigem = Array.from(colunaOrigem.cards);
    const [cardMovido] = novosCardsOrigem.splice(source.index, 1);

    // Se a coluna de origem e destino forem a mesma
    if (colunaOrigem === colunaDestino) {
      const novaColuna = {
        ...colunaOrigem,
        cards: novosCardsOrigem,
      };

      // Insere o card na nova posição
      novosCardsOrigem.splice(destination.index, 0, cardMovido);

      // Atualiza o estado
      setColunas({
        ...colunas,
        [colunaOrigem.id]: novaColuna,
      });
    } else {
      // Se for uma coluna diferente
      const novosCardsDestino = Array.from(colunaDestino.cards);
      novosCardsDestino.splice(destination.index, 0, cardMovido);

      // Atualiza o estado
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