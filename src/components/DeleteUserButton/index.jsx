import api from "@/api";
import PropTypes from "prop-types";

DeleteUserButton.propTypes = {
  userId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function DeleteUserButton({ userId, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este usuário?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encontrado. Usuário não está autenticado.");
      }

      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Usuário deletado com sucesso.");
      onDelete(userId); // Chama a função de callback para atualizar a lista de usuários
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao deletar usuário.");
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Deletar
    </button>
  );
}
