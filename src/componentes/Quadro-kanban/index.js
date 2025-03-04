/* eslint-disable react/jsx-pascal-case */
import { useState } from "react"
import { Botao_adicionar } from "../Botao-adicionar"
import { COLUNA_KANBAN } from "../Coluna-kanban"
import "./quadro-kanban.css"

export const Quadro_Kanban = () => {

    const [colunas, setColunas] = useState([{ id: 0 }])

    function adicionarColuna() {
        setColunas([...colunas,{ id: Date.now()}])
    }

    function removerColuna(id) {
        setColunas(colunas.filter(coluna => coluna.id !== id));
    }


    return (
        <div className="quadro-kanban">
            {colunas.map(coluna => (
                <COLUNA_KANBAN key={coluna.id} removerColuna={() => removerColuna(coluna.id)} />
            ))}
            <Botao_adicionar onClick={adicionarColuna} />
        </div>
    );
    
}