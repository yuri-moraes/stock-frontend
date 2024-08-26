import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        setError("Erro ao carregar dados do usuário.");
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/user/${id}`, {
        name: user.name,
        password: user.password,
        role: user.role,
      });
      alert("Informações atualizadas com sucesso.");
    } catch (error) {
      setError("Erro ao atualizar informações do usuário.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/users/login");
  };

  return (
    <div className="user-profile">
      <h1>Perfil do Usuário</h1>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={user.email} disabled />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdate}>Atualizar Informações</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
