import PropTypes from "prop-types";
import ItemRow from "../StockItems/ItemRow";

function ItemTable({ items, setItems, user, loading, refreshItems }) {
  // Função de callback para atualizar a lista de itens após a exclusão
  const handleDeleteItem = (deletedItemId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== Number(deletedItemId))
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[300px] md:min-w-full border-collapse mb-4 text-sm md:text-base">
        <thead className="bg-gray-800">
          <tr>
            <th className="text-left text-gray-400 p-2 md:p-4 font-medium tracking-wider">
              ID
            </th>
            <th className="text-left text-gray-400 p-2 md:p-4 font-medium tracking-wider">
              Nome
            </th>
            <th className="text-left text-gray-400 p-2 md:p-4 font-medium tracking-wider">
              Em Estoque
            </th>
            <th className="text-left text-gray-400 p-2 md:p-4 font-medium tracking-wider">
              Categoria
            </th>
            <th className="text-left text-gray-400 p-2 md:p-4 font-medium tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        {items.length > 0
          ? items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                user={user}
                onDelete={handleDeleteItem}
                refreshItems={refreshItems}
              />
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
  setItems: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  refreshItems: PropTypes.func.isRequired,
};

export default ItemTable;
