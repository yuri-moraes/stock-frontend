import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Acesso Negado</h1>
      <p className="not-found-message">
        Você não tem <strong>permissão</strong> para acessar esta seção.
      </p>
      <button className="button is-small" onClick={() => navigate("/")}>
        Voltar para a Página Inicial
      </button>
    </div>
  );
};

export default Forbidden;
