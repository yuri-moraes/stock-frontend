import { useNavigate } from "react-router-dom";
import useStockItems from "../hooks/useStockItems";
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
    <>
      <button className="button delete" onClick={handleDelete}>
        Remover
      </button>
    </>
  );
}
