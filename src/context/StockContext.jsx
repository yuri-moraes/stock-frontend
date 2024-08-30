import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";

export const StockContext = createContext({});

StockContextProvider.propTypes = {
  children: PropTypes.node,
};

export function StockContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchItems();

    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const loggedInUser = JSON.parse(storedUser);
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error(
          "Erro ao analisar os dados do usuário do localStorage:",
          error
        );
      }
    }
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get("/items");
      setItems(response.data);
    } catch (error) {
      logError("Erro ao buscar itens:", error);
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
      return { Authorization: `Bearer ${token}` };
    } else {
      console.error("Token de autorização não encontrado ou inválido.");
      return {};
    }
  };

  const addItem = async (item) => {
    try {
      await api.post("/items/new", item, {
        headers: getAuthHeaders(),
      });
      await fetchItems(); // Atualiza os itens após adicionar
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

      await api.put(`/items/${itemId}/update`, updatedData, {
        headers: getAuthHeaders(),
      });
      await fetchItems(); // Atualiza os itens após atualizar
    } catch (error) {
      logError("Erro ao atualizar item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`, {
        headers: getAuthHeaders(),
      });
      await fetchItems(); // Atualiza os itens após deletar
    } catch (error) {
      logError("Erro ao deletar item:", error);
    }
  };

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

  const stock = {
    items,
    addItem,
    getItem,
    updateItem,
    deleteItem,
    user,
    loginUser,
    logoutUser,
  };

  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}
