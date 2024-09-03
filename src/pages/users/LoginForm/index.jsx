import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useStock } from "@/context/useStock";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { loginUser } = useStock();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log("Resposta da API de login:", response.data);

      const { user, token } = response.data;

      if (user && token) {
        loginUser({ ...user, token });
        navigate("/");
      } else {
        setError("Dados do usuário não foram recebidos.");
        console.error(
          "Dados do usuário ou token não foram encontrados na resposta da API."
        );
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Erro ao fazer login";
      setError(errorMessage);
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <form
      className="flex flex-col items-center max-w-md mx-auto mt-10 p-8 bg-gray-800 shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-6 text-white">Login</h1>
      <div className="mb-4 w-full">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6 w-full">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Senha:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-white text-gray-800 font-bold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Entrar
      </button>
    </form>
  );
}
