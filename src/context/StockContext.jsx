import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";

export const StockContext = createContext({});

StockContextProvider.propTypes = {
  children: PropTypes.node,
};

export function StockContextProvider({ children }) {
  const [items, setItems] = useState([]);

  // Carrega os itens do estoque da API quando o componente é montado
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items");
        setItems(response.data);
      } catch (error) {
        logError("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, []);

  const addItem = async (item) => {
    try {
      const response = await api.post("/items/new", item);
      setItems((current) => [response.data, ...current]);
    } catch (error) {
      logError("Erro ao adicionar item:", error);
    }
  };

  const getItem = (itemId) => {
    return items.find((i) => i.id === +itemId);
  };

  const updateItem = async (itemId, newAttributes) => {
    try {
      const response = await api.put(`/items/${itemId}/update`, newAttributes);
      setItems((current) => {
        const itemIndex = current.findIndex((i) => i.id === +itemId);
        const updatedItems = [...current];
        updatedItems[itemIndex] = response.data;
        return updatedItems;
      });
    } catch (error) {
      logError("Erro ao atualizar item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`);
      setItems((current) => current.filter((item) => item.id !== itemId));
    } catch (error) {
      logError("Erro ao deletar item:", error);
    }
  };

  const logError = (message, error) => {
    console.error(message);
    if (error.response) {
      // O servidor respondeu com um status fora do range 2xx
      console.error("Resposta do servidor:", error.response);
      console.error("Dados do erro:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error("Sem resposta do servidor. Request:", error.request);
    } else {
      // Alguma outra coisa aconteceu ao configurar a requisição
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
  };

  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}
