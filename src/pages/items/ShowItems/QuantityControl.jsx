import PropTypes from "prop-types";

function QuantityControl({
  item,
  quantityChange,
  handleIncrement,
  handleDecrement,
  handleSave,
  user,
}) {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <span>Quantidade em estoque: {item.unity + quantityChange}</span>
      <button
        className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded"
        onClick={handleDecrement}
      >
        -
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        onClick={handleSave}
      >
        Salvar
      </button>
      {user.role === "admin" && (
        <button
          className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-1 px-3 rounded"
          onClick={handleIncrement}
        >
          +
        </button>
      )}
    </div>
  );
}

QuantityControl.propTypes = {
  item: PropTypes.shape({
    unity: PropTypes.number.isRequired,
  }).isRequired,
  quantityChange: PropTypes.number.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuantityControl;
