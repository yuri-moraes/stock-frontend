import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import api from "@/api";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate(); // Inicializa o hook useNavigate

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

    // Resetando erros
    setEmailError("");
    setPasswordError("");
    setError(null);

    // Validação de email
    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    // Validação de senha
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

      // Limpa os campos do formulário após o cadastro
      setName("");
      setEmail("");
      setPassword("");

      // Redireciona o usuário para a tela de login após o cadastro bem-sucedido
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
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Cadastro de Usuário</h1>
      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        {emailError && <p className="error-message">{emailError}</p>}
      </div>
      <div className="form-group">
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="button">
        Cadastrar
      </button>
    </form>
  );
}
