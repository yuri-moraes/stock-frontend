import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useStock } from "@/context/useStock";
import InputField from "@/components/InputField";
import ErrorMessage from "@/components/ErrorMessage";
import LoginButton from "../LoginForm/LoginButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { loginUser } = useStock();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

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
      <InputField
        label="Email:"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Senha:"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <ErrorMessage message={error} />}
      <LoginButton />
    </form>
  );
}
