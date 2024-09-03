import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import api from "../../../api";
import DeleteButton from "../../../components/DeleteButton";
import { useStock } from "../../../context/useStock";

export default function ShowItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityChange, setQuantityChange] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useStock();
  const token = localStorage.getItem("token");

  const fetchItem = useCallback(async () => {
    try {
      const response = await api.get(`/items/${id}`);
      setItem(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar o item:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleIncrement = () => {
    setQuantityChange(quantityChange + 1);
  };

  const handleDecrement = () => {
    if (item.unity + quantityChange > 0) {
      setQuantityChange(quantityChange - 1);
    } else {
      setError("Não é possível reduzir abaixo de zero.");
    }
  };

  const handleSave = async () => {
    try {
      if (quantityChange !== 0) {
        const endpoint =
          quantityChange > 0 ? `/items/${id}/add` : `/items/${id}/subt`;

        await api.patch(
          endpoint,
          { unity: Math.abs(quantityChange) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Quantidade atualizada com sucesso!");
        setError("");
        setQuantityChange(0);
        await fetchItem();
      } else {
        setError("Nenhuma alteração de quantidade foi feita.");
      }
    } catch (error) {
      setError("Erro ao atualizar a quantidade. Tente novamente.");
      setMessage("");
    }
  };

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  if (!item) {
    return <div className="text-white">Item não encontrado</div>;
  }

  return (
    <div className="bg-gray-700 p-6 rounded-md shadow-md text-white ml-5 mr-5">
      <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
      {user.role === "admin" && (
        <div className="flex space-x-2 mb-4">
          <Link
            to={`/items/${item.id}/update`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Atualizar
          </Link>
          <DeleteButton itemId={item.id} itemName={item.title} />
        </div>
      )}

      <div className="flex flex-col gap-4 mb-4">
        <span>Categoria: {item.category}</span>
        <div className="flex items-center space-x-4">
          <span>Quantidade em estoque: {item.unity + quantityChange}</span>
          <button
            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded"
            onClick={handleDecrement}
          >
            -
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            onClick={handleSave}
          >
            Salvar
          </button>
          {user.role === "admin" && (
            <button
              className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded"
              onClick={handleIncrement}
            >
              +
            </button>
          )}
        </div>

        <span>Preço: R$ {item.price.toFixed(2)}</span>
      </div>

      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>
      )}
      {message && (
        <p className="text-green-500 bg-green-100 p-2 rounded mb-4">
          {message}
        </p>
      )}

      <p className="mb-4">{item.description}</p>
      <div className="flex flex-col gap-2">
        <p>Cadastrado em: {new Date(item.createdAt).toLocaleDateString()}</p>
        <p>Atualizado em: {new Date(item.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
