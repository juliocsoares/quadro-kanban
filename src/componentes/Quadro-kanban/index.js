/* eslint-disable react/jsx-pascal-case */
import { useState } from "react"
import { Botao_adicionar } from "../Botao-adicionar"
import { COLUNA_KANBAN } from "../Coluna-kanban"
import "./quadro-kanban.css"

export const Quadro_Kanban = () => {

    const [coluna, setColuna] = useState([<COLUNA_KANBAN />])

    function adicionarColuna() {
        setColuna([...coluna, <COLUNA_KANBAN />])
    }

    return (
        <div className="quadro-kanban">
            {coluna}
            <Botao_adicionar onClick={adicionarColuna}/>
        </div>
    )
}