import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";
import { useStock } from "@/context/useStock";
import AdminActions from "../ShowItems/AdminActions";
import ItemDetails from "../ShowItems/ItemDetails";
import QuantityControl from "../ShowItems/QuantityControl";
import Message from "../ShowItems/Message";

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
      {user.role === "admin" && <AdminActions item={item} />}
      <ItemDetails item={item} />
      <QuantityControl
        item={item}
        quantityChange={quantityChange}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleSave={handleSave}
        user={user}
      />
      {error && <Message type="error" message={error} />}
      {message && <Message type="success" message={message} />}
    </div>
  );
}
