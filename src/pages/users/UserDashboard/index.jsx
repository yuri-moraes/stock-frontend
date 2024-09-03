import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useStock } from "@/context/useStock";
import DeleteUserButton from "@/components/DeleteUserButton";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
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

  return (
    <div className="bg-gray-800 p-8 rounded-lg text-white max-w-2xl mx-auto mt-10 shadow-lg">
      <h1 className="mb-5 text-3xl font-light text-center">
        Dashboard de Usuários
      </h1>
      <ul className="list-none p-0 m-0">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center bg-gray-700 mb-2 p-4 rounded-lg hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col">
              <span className="font-bold text-white">{user.name}</span>
              <span className="text-sm text-gray-300">{user.email}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:bg-green-400 hover:scale-105"
                onClick={() => handleUserClick(user.id)}
              >
                Editar
              </button>
              <DeleteUserButton userId={user.id} onDelete={handleDelete} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
