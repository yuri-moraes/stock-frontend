import { useState, useEffect } from "react";
import { useStock } from "@/context/useStock";
import api from "@/api";
import useStockItems from "@/hooks/useStockItems";
import SearchBar from "../StockItems/SearchBar";
import LoadingIndicator from "../StockItems/LoadingIndicator";
import ErrorMessage from "@/components/ErrorMessage";
import ItemTable from "../StockItems/ItemTable";

export default function StockItems() {
  const { fetchItems } = useStockItems();
  const { user } = useStock();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/items");
        setItems(response.data);
      } catch (error) {
        console.error("Erro ao carregar itens:", error);
        setError("Erro ao carregar itens. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [fetchItems]);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/items/search/${searchTerm}`);
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      setError("Erro ao buscar itens. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAll = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar todos os itens:", error);
      setError("Erro ao buscar todos os itens. Tente novamente.");
    } finally {
      setLoading(false);
      setSearchTerm(""); // Limpa o termo de busca
    }
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onShowAll={handleShowAll}
      />
      {loading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      <ItemTable items={items} user={user} loading={loading} />
    </>
  );
}
