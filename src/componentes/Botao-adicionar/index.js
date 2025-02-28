import "./botao-adicionar.css"

export const Botao_adicionar = ({onClick}) => {

    return (
        <button onClick={onClick} className="botao-adicionar"> + </button>
    )
}