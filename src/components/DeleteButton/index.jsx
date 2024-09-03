import { useNavigate } from "react-router-dom";
import useStockItems from "@/hooks/useStockItems";
import PropTypes from "prop-types";

DeleteButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  refreshItems: PropTypes.func.isRequired,
};

export default function DeleteButton({
  itemId,
  itemName,
  onDelete,
  refreshItems,
}) {
  const { deleteItem } = useStockItems();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir ${itemName}?`)) {
      try {
        await deleteItem(itemId);
        onDelete(itemId);
        refreshItems();
        navigate("/items");
      } catch (error) {
        console.error("Erro ao deletar item:", error);
      }
    }
  };

  return (
    <button
      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
      onClick={handleDelete}
    >
      Remover
    </button>
  );
}
