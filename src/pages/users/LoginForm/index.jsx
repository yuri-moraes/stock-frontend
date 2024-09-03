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
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
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
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="button">
        Entrar
      </button>
    </form>
  );
}
