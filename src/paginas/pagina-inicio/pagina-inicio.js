import './pagina-inicio.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PaginaInicial = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  const iniciar = () => {
    navigate('/quadro');
  };

  if (isLoading) {
    return <div className="pagina-inicial"><p>Carregando...</p></div>;
  }

  return (
    <div className="pagina-inicial">
      {isAuthenticated ? (
        <>
          <h1 className='titulo'>Bem-vindo, {user?.name?.split(" ")[0]}!</h1>
          <button className="botao" onClick={iniciar}>
            Ir para o quadro
          </button>
          <button className="botao" onClick={() => logout({ returnTo: window.location.origin })}>
            Sair
          </button>

        </>
      ) : (
        <>
          <h1 className="titulo">
            Projeto Kanban IGC
          </h1>
          <button className="botao" onClick={() => loginWithRedirect()}>
            Entrar
          </button>
        </>
      )}
    </div>
  );
};

export default PaginaInicial;
