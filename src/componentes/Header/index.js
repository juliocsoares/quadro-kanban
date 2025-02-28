import "./header.css"

export const Header = () => {
    return (
        <header className="header">
        <h1 className="logo">Projeto Kanban IGC</h1>
        <nav>
          <ul className="nav-list">
            <li><a href="#">Início</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </nav>
      </header>
    )
}