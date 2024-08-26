import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento após login
import api from "../../api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null); // Resetando erro ao submeter

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log("Login bem-sucedido:", response.data);

      // Redirecionar o usuário para a página principal ou outra rota protegida
      navigate("/");
    } catch (error) {
      setError(error.response ? error.response.data : "Erro ao fazer login");
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
