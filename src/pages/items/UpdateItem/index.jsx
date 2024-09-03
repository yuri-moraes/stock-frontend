import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemForm from "../../../components/ItemForm";
import api from "../../../api";
import { useStock } from "../../../context/useStock";

export default function UpdateItem() {
  const { id } = useParams();
  const { user } = useStock();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (user.role !== "admin") {
    return <div>Você não tem permissão para atualizar este item.</div>;
  }

  return (
    <>
      <h1>Atualizar Item</h1>
      <ItemForm itemToUpdate={item} />
    </>
  );
}
