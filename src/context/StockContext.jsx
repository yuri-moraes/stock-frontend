import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import api from "@/api";

// Criação do contexto
export const StockContext = createContext({});

// Validação das props do provider
StockContextProvider.propTypes = {
  children: PropTypes.node,
};

export function StockContextProvider({ children }) {
  // Estado dos itens e do usuário
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Funções utilitárias de autenticação e headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
      return { Authorization: `Bearer ${token}` };
    } else {
      console.error("Token de autorização não encontrado ou inválido.");
      return {};
    }
  };

  const logError = (message, error) => {
    console.error(message);
    if (error.response) {
      console.error("Resposta do servidor:", error.response);
      console.error("Dados do erro:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Sem resposta do servidor. Request:", error.request);
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
    }
    console.error("Configuração do Axios:", error.config);
  };

  // Funções de gerenciamento de itens
  const fetchItems = useCallback(async () => {
    try {
      const response = await api.get("/items");
      setItems(response.data);
    } catch (error) {
      logError("Erro ao buscar itens:", error);
    }
  }, []);

  const addItem = async (item) => {
    try {
      const response = await api.post("/items/new", item, {
        headers: getAuthHeaders(),
      });
      setItems((prevItems) => [...prevItems, response.data]); // Adiciona o novo item ao estado local
    } catch (error) {
      logError("Erro ao adicionar item:", error);
    }
  };

  const getItem = (itemId) => {
    return items.find((i) => i.id === +itemId);
  };

  const updateItem = async (itemId, newAttributes) => {
    try {
      const { title, description, unity, price, category } = newAttributes;
      const updatedData = { title, description, unity, price, category };

      const response = await api.put(`/items/${itemId}/update`, updatedData, {
        headers: getAuthHeaders(),
      });

      setItems((prevItems) =>
        prevItems.map(
          (item) => (item.id === itemId ? response.data : item) // Atualiza o item no estado local
        )
      );
    } catch (error) {
      logError("Erro ao atualizar item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`, {
        headers: getAuthHeaders(),
      });
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId)); // Remove o item do estado local
    } catch (error) {
      logError("Erro ao deletar item:", error);
    }
  };

  // Efeito para buscar itens ao montar o componente
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Funções de gerenciamento de autenticação
  const loginUser = (userData) => {
    if (!userData) {
      console.error("Usuário inválido não pode ser salvo no estado.");
      return;
    }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.token) {
      localStorage.setItem("token", userData.token);
    } else {
      console.error("Token JWT não fornecido durante o login.");
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Objeto de valor do contexto
  const stock = {
    items,
    addItem,
    getItem,
    updateItem,
    deleteItem,
    fetchItems,
    user,
    loginUser,
    logoutUser,
  };

  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}
