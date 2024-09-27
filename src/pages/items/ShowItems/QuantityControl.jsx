import PropTypes from "prop-types";

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

function QuantityControl({
  item,
  quantityChange,
  handleIncrement,
  handleDecrement,
  handleSave,
  user,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center space-x-4 mb-6">
      <span className="text-white">
        Quantidade em estoque: {item.unity + quantityChange}
      </span>
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleDecrement}
        >
          -
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleSave}
        >
          Salvar
        </button>
        {user.role === "admin" && (
          <button
            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleIncrement}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default QuantityControl;
