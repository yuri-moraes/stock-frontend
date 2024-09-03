import { useNavigate } from "react-router-dom";
import useStockItems from "@/hooks/useStockItems";
import PropTypes from "prop-types";

DeleteButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
};

export default function DeleteButton({ itemId, itemName }) {
  const { deleteItem } = useStockItems();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir ${itemName}?`)) {
      deleteItem(itemId);
      navigate("/items");
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
