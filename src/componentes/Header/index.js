import { useNavigate } from "react-router-dom"
import "./header.css"

export const Header = () => {

    const navigate = useNavigate()

    const inicio = () => {
      navigate('/')
    }

    return (
        <header className="header">
        <h1 className="logo" onClick={inicio}>Projeto Kanban IGC</h1>
        <nav>
          <ul className="nav-list">
            <li onClick={inicio}><a href="#">Início</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </nav>
      </header>
    )
}