import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta seção.</p>
      <button onClick={() => navigate("/")}>
        Voltar para a Página Inicial
      </button>
    </div>
  );
};

export default Forbidden;
