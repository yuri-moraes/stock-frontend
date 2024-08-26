import api from "../api";

// Função para editar o perfil do usuário (incluindo nome, email e role)
export const editUserProfile = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token não encontrado. Usuário não está autenticado.");
    }

    // Cria um objeto payload contendo somente os campos que não são vazios ou undefined
    const payload = {};
    if (updatedData.name) payload.name = updatedData.name;
    if (updatedData.role) payload.role = updatedData.role;

    // Incluindo o token no cabeçalho de autorização
    const response = await api.put(`/users/${userId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Retorna os dados atualizados
  } catch (error) {
    console.error("Erro ao atualizar o perfil do usuário:", error);
    throw error;
  }
};

// Função para alterar a senha do usuário
export const changeUserPassword = async (userId, newPassword) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token não encontrado. Usuário não está autenticado.");
    }

    const response = await api.put(
      `/users/${userId}`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Retorna confirmação de alteração de senha
  } catch (error) {
    console.error("Erro ao alterar a senha do usuário:", error);
    throw error;
  }
};

// Função para logout do usuário
export const performLogout = (logoutFunction) => {
  logoutFunction();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
