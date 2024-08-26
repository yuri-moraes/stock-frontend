import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useStock } from "../../context/useStock";

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

      // Extrair o token da resposta da API, assumindo que ele está dentro de uma string
      const tokenMatch = response.data.message.match(/token: (\S+)/);
      const token = tokenMatch ? tokenMatch[1] : null;

      if (token) {
        const userData = { email, token }; // Incluindo email e token no userData para armazenar
        loginUser(userData);
        navigate("/");
      } else {
        setError("Token JWT não foi recebido.");
        console.error("Token JWT não foi encontrado na resposta da API.");
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
