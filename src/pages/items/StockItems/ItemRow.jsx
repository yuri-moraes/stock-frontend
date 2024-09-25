import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DeleteButton from "@/components/DeleteButton";

function ItemRow({ item, user, onDelete, refreshItems }) {
  return (
    <tbody>
      <tr className="border-t border-gray-600 hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300">
        <td className="p-2 md:p-4 text-sm text-gray-200">{item.id}</td>
        <td className="p-2 md:p-4 text-sm text-gray-200">{item.title}</td>
        <td className="p-2 md:p-4 text-sm text-gray-200">{item.unity} unid.</td>
        <td className="p-2 md:p-4 text-sm text-gray-200">{item.category}</td>
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
                onDelete={onDelete}
                refreshItems={refreshItems}
              />
            </>
          )}
        </td>
      </tr>
    </tbody>
  );
}

ItemRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    unity: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  refreshItems: PropTypes.func.isRequired,
};

export default ItemRow;
