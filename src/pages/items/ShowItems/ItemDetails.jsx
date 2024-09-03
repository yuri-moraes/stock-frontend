import PropTypes from "prop-types";

function ItemDetails({ item }) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <span>Categoria: {item.category}</span>
      <span>Preço: R$ {item.price.toFixed(2)}</span>
      <p className="mb-4">{`Descrição: ${item.description}`}</p>
      <div className="flex flex-col gap-2">
        <p>Cadastrado em: {new Date(item.createdAt).toLocaleDateString()}</p>
        <p>Atualizado em: {new Date(item.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemDetails;
