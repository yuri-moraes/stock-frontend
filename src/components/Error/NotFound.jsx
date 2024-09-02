import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Página Não Encontrada</h1>
      <p className="not-found-message">
        A página que você está tentando acessar não existe.
      </p>
      <button className="button is-small" onClick={() => navigate("/")}>
        Voltar para a Página Inicial
      </button>
    </div>
  );
};

export default NotFound;
