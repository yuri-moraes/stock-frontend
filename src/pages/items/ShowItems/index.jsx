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
    return <div>Carregando...</div>;
  }

  if (!item) {
    return <div>Item não encontrado</div>;
  }

  return (
    <div className="item">
      <h2>{item.title}</h2>
      {user.role === "admin" && (
        <>
          <Link to={`/items/${item.id}/update`} className="button">
            Atualizar
          </Link>
          <DeleteButton itemId={item.id} itemName={item.title} />
        </>
      )}

      <div className="row">
        <span>Categoria: {item.category}</span>
        <div className="quantity-control">
          <span>Quantidade em estoque: {item.unity + quantityChange}</span>
          <button className="button is-small " onClick={handleDecrement}>
            -
          </button>
          <button className="button is-small" onClick={handleSave}>
            Salvar
          </button>
          {user.role === "admin" && (
            <button className="button is-small " onClick={handleIncrement}>
              +
            </button>
          )}
        </div>

        <span>Preço: R$ {item.price.toFixed(2)}</span>
      </div>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <p>{item.description}</p>
      <div className="row">
        <p>Cadastrado em: {new Date(item.createdAt).toDateString()}</p>
        <p>Atualizado em: {new Date(item.updatedAt).toDateString()}</p>
      </div>
    </div>
  );
}
