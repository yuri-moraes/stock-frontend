import { Link } from "react-router-dom";
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
      <div className="flex flex-col md:flex-row justify-center items-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por ID ou Nome"
          className="bg-gray-900 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Buscar
        </button>
        <button
          onClick={handleShowAll}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Mostrar Todos
        </button>
      </div>

      {loading && <p className="text-center text-white">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-[300px] md:min-w-full border-collapse mb-4 text-sm md:text-base">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left text-white p-2 md:p-4">ID</th>
              <th className="text-left text-white p-2 md:p-4">Nome</th>
              <th className="text-left text-white p-2 md:p-4">Em Estoque</th>
              <th className="text-left text-white p-2 md:p-4">Categoria</th>
              <th className="text-left text-white p-2 md:p-4">Ações</th>
            </tr>
          </thead>
          {items.length > 0
            ? items.map((item) => (
                <tbody key={item.id}>
                  <tr className="border-t border-gray-600 hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300">
                    <td className="p-2 md:p-4 text-white">{item.id}</td>
                    <td className="p-2 md:p-4 text-white">{item.title}</td>
                    <td className="p-2 md:p-4 text-white">
                      {item.unity} unid.
                    </td>
                    <td className="p-2 md:p-4 text-white">{item.category}</td>
                    <td className="p-2 md:p-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <Link
                        to={`/items/${item.id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        Ver
                      </Link>
                      {user.role === "admin" && (
                        <>
                          <Link
                            to={`/items/${item.id}/update`}
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
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
                    <td
                      colSpan="5"
                      className="text-center text-white p-2 md:p-4"
                    >
                      Não há nada aqui!
                    </td>
                  </tr>
                </tbody>
              )}
        </table>
      </div>
    </>
  );
}
