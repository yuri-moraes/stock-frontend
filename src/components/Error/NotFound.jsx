import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white text-center p-12 rounded-lg my-8 mx-auto max-w-lg shadow-md">
      <h1 className="text-3xl mb-2 font-bold">Página Não Encontrada</h1>
      <p className="text-xl mb-6">
        A página que você está tentando acessar não existe.
      </p>
      <button
        className="bg-[#19a2cc] text-white py-2 px-6 text-lg rounded-lg border-none cursor-pointer transition-all duration-300 transform hover:bg-[#00b0e6] hover:scale-105"
        onClick={() => navigate("/")}
      >
        Voltar para a Página Inicial
      </button>
    </div>
  );
};

export default NotFound;
