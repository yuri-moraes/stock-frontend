import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setError(null);

    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
      );
      return;
    }

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });
      console.log("Usuário cadastrado com sucesso:", response.data);

      setName("");
      setEmail("");
      setPassword("");

      navigate("/users/login");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Erro ao cadastrar usuário";

      setError(errorMessage);
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <form
      className="flex flex-col items-center max-w-md mx-auto mt-10 p-8 bg-gray-800 shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-6 text-white">
        Cadastro de Usuário
      </h1>
      <div className="mb-4 w-full">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Nome:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
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
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-white text-gray-800 font-bold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Cadastrar
      </button>
    </form>
  );
}
