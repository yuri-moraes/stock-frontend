import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useStock } from "@/context/useStock";
import UserList from "../UserDashboard/UserList";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useStock();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Token não encontrado. Usuário não está autenticado."
          );
        }

        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const handleUserClick = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-4 sm:p-8 rounded-lg text-white max-w-full sm:max-w-2xl mx-auto mt-5 sm:mt-10 shadow-lg">
      <h1 className="mb-4 sm:mb-5 text-2xl sm:text-3xl font-bold text-center">
        Dashboard de Usuários
      </h1>
      {/* Campo de pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar usuário por email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
          className="w-full p-2 bg-gray-700 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lista de usuários filtrados */}
      <UserList
        users={filteredUsers}
        onUserClick={handleUserClick}
        onDelete={handleDelete}
      />
    </div>
  );
}
