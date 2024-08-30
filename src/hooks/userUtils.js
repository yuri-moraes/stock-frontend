import api from "../api";

// Função para atualizar os dados do usuário após uma operação CRUD
const refreshUserData = async (userId, setUser) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token não encontrado. Usuário não está autenticado.");
    }

    // Requisição para obter os dados atualizados do usuário
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Atualiza o estado do usuário com os dados mais recentes
    setUser(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados atualizados do usuário:", error);
    throw error;
  }
};

// Função para editar o perfil do usuário (incluindo nome e role)
export const editUserProfile = async (userId, updatedData, setUser) => {
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
    await api.put(`/users/edit/${userId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Atualiza os dados do usuário após a edição
    await refreshUserData(userId, setUser);
  } catch (error) {
    console.error("Erro ao atualizar o perfil do usuário:", error);
    throw error;
  }
};

// Função para alterar a senha do usuário
export const changeUserPassword = async (userId, newPassword, setUser) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token não encontrado. Usuário não está autenticado.");
    }

    await api.put(
      `/users/edit/${userId}`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Atualiza os dados do usuário após alterar a senha
    await refreshUserData(userId, setUser);
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
