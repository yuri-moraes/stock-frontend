import { Link } from "react-router-dom";
import "./index.css";
import useStockItems from "@/hooks/useStockItems";
import DeleteButton from "@/components/DeleteButton";
import { useState, useEffect } from "react";
import { useStock } from "@/context/useStock";
import api from "@/api";

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
      const response = await api.get("/items"); // Faz novamente a chamada para buscar todos os itens
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
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por ID ou Nome"
          className="input-field"
        />
        <button onClick={handleSearch} className="button">
          Buscar
        </button>
        <button onClick={handleShowAll} className="button">
          Mostrar Todos
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Em Estoque</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          {items.length > 0
            ? items.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.unity} unid.</td>
                    <td>{item.category}</td>
                    <td>
                      <Link to={`/items/${item.id}`} className="button view">
                        Ver
                      </Link>
                      {user.role === "admin" && (
                        <>
                          <Link
                            to={`/items/${item.id}/update`}
                            className="button update"
                          >
                            Atualizar
                          </Link>
                          <DeleteButton
                            itemId={item.id}
                            itemName={item.title}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))
            : !loading && (
                <tbody>
                  <tr>
                    <td colSpan="5">Não há nada aqui!</td>
                  </tr>
                </tbody>
              )}
        </table>
      </div>
    </>
  );
}
