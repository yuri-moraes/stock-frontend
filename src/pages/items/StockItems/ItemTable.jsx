import PropTypes from "prop-types";
import ItemRow from "../StockItems/ItemRow";

function ItemTable({ items, user, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[300px] md:min-w-full border-collapse mb-4 text-sm md:text-base">
        <thead className="bg-gray-800">
          <tr>
            <th className="text-left text-white p-2 md:p-4">ID</th>
            <th className="text-left text-white p-2 md:p-4">Nome</th>
            <th className="text-left text-white p-2 md:p-4">Em Estoque</th>
            <th className="text-left text-white p-2 md:p-4">Categoria</th>
            <th className="text-left text-white p-2 md:p-4">Ações</th>
          </tr>
        </thead>
        {items.length > 0
          ? items.map((item) => (
              <ItemRow key={item.id} item={item} user={user} />
            ))
          : !loading && (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center text-white p-2 md:p-4">
                    Não há nada aqui!
                  </td>
                </tr>
              </tbody>
            )}
      </table>
    </div>
  );
}

ItemTable.propTypes = {
  items: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ItemTable;
