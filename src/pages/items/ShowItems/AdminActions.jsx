import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DeleteButton from "@/components/DeleteButton";

function AdminActions({ item }) {
  return (
    <div className="flex space-x-2 mb-4">
      <Link
        to={`/items/${item.id}/update`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Atualizar
      </Link>
      <DeleteButton itemId={item.id} itemName={item.title} />
    </div>
  );
}

AdminActions.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminActions;
