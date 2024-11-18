import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/form-lanche">Cadastro de Lanches</Link></li>
          <li><Link to="/list-lanche">Consulta do Cardápio</Link></li>
          <li><Link to="/contact">Contato</Link></li>
          {isAuthenticated ? (
            <>
              <li><span>Bem-vindo, Usuário!</span></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Cadastro</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Header;