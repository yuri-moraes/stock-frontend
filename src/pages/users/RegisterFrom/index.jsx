import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import InputField from "@/components/InputField";
import ErrorMessage from "@/components/ErrorMessage";
import SubmitButton from "@/components/SubmitButton";
import { validateEmail, validatePassword } from "@/hooks/ValidationHelpers";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

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
      <InputField
        label="Nome:"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Email:"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <ErrorMessage message={emailError} />}
      <InputField
        label="Senha:"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <ErrorMessage message={passwordError} />}
      {error && <ErrorMessage message={error} />}
      <SubmitButton text="Cadastrar" />
    </form>
  );
}
