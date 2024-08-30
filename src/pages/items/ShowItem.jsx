import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api";
import DeleteButton from "../../components/DeleteButton";
import { useStock } from "../../context/useStock";

export default function ShowItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useStock(); // Obtenha o usuário do contexto

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

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
        <span>Quantidade em estoque: {item.unity}</span>
        <span>Preço: R$ {item.price.toFixed(2)}</span>
      </div>
      <p>{item.description}</p>
      <div className="row">
        <p>Cadastrado em: {new Date(item.createdAt).toDateString()}</p>
        <p>Atualizado em: {new Date(item.updatedAt).toDateString()}</p>
      </div>
    </div>
  );
}
